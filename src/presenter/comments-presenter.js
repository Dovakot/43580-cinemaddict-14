import {
  encode
} from 'he';

import {
  UpdateType,
  RenderPosition
} from 'const';

import {
  render,
  remove
} from 'utils/render-util';

import CommentsView from 'view/comments/comments-view';
import CommentsTitleView from 'view/comments/comments-title-view';
import CommentsListView from 'view/comments/comments-list-view';
import CommentEmojiLabelView from 'view/comments/comment-emoji-label-view';
import CommentEmojiListView from 'view/comments/comment-emoji-list-view';
import CommentFormView from 'view/comments/comment-form-view';

class CommentsPresenter {
  constructor(eventType, commentsContainer, commentsModel, film, api) {
    this._commentsContainer = commentsContainer;
    this._eventType = eventType;
    this._commentsModel = commentsModel;
    this._commentsComponent = new CommentsView();
    this._commentFormComponent = null;
    this._commentEmojiLabelComponent = null;
    this._commentEmojiListComponent = null;
    this._commentsTitleComponent = null;
    this._commentsListComponent = null;
    this._currentEmotion = null;
    this._film = film;
    this._api = api;

    this._keyHandler = this._keyHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  init() {
    this._renderComments();
    render(this._commentsContainer, this._commentsComponent);
  }

  destroy() {
    remove(this._commentsComponent);
  }

  changeComments(target) {
    if (!target.classList.contains('film-details__emoji-item')) {
      return;
    }

    this._currentEmotion = target.value;
    this._renderCommentEmotion(this._currentEmotion);
  }

  _renderCommentList() {
    remove(this._commentsTitleComponent);
    remove(this._commentsListComponent);

    this._commentsTitleComponent = new CommentsTitleView(this._film.comments.length);
    this._commentsListComponent = new CommentsListView(
      this._eventType, this._film.comments, this._commentsModel.comments,
    );

    render(this._commentsComponent, this._commentsTitleComponent, RenderPosition.AFTERBEGIN);
    render(this._commentsTitleComponent, this._commentsListComponent, RenderPosition.AFTEREND);

    this._commentsListComponent.setClickHandler(this._deleteClickHandler);
  }

  _renderCommentEmotion(emotion) {
    remove(this._commentEmojiLabelComponent);

    this._commentEmojiLabelComponent = new CommentEmojiLabelView(emotion);
    render(this._commentFormComponent, this._commentEmojiLabelComponent, RenderPosition.AFTERBEGIN);
  }

  _renderCommentEmotionList() {
    remove(this._commentEmojiListComponent);

    this._commentEmojiListComponent = new CommentEmojiListView();
    render(this._commentFormComponent, this._commentEmojiListComponent);
  }

  _renderCommentForm() {
    remove(this._commentFormComponent);

    this._commentFormComponent = new CommentFormView();
    render(this._commentsComponent, this._commentFormComponent);

    this._commentFormComponent.setKeyHandler(this._keyHandler);
  }

  _renderComments() {
    this._renderCommentForm();
    this._renderCommentList();
    this._renderCommentEmotion();
    this._renderCommentEmotionList();

    if (this._eventType) {
      this._commentFormComponent.disableForm();
    }
  }

  _keyHandler({target}) {
    const comment = encode(target.value.trim());

    if (!comment || !this._currentEmotion) {
      return;
    }

    this._commentFormComponent.disableForm();

    this._api.addComment({comment, emotion: this._currentEmotion, movie: this._film.filmInfo.id})
      .then((response) => this._commentsModel.addComment(UpdateType.MINOR, response))
      .catch(() => this._commentFormComponent.shake());
  }

  _deleteClickHandler(id) {
    this._api.deleteComment(id)
      .then(() => this._commentsModel.deleteComment(UpdateType.MINOR, id, true))
      .catch(() => this._commentsListComponent.shake(id));
  }
}

export default CommentsPresenter;
