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

class CommentsPresenter {
  constructor(isLoading, commentsContainer, commentsModel, commentsId) {
    this._isLoading = isLoading;
    this._commentsModel = commentsModel;
    this._commentsComponent = new CommentsView(isLoading);
    this._commentEmojiLabelComponent = null;
    this._commentEmojiListComponent = null;
    this._commentsTitleComponent = null;
    this._commentsListComponent = null;
    this._currentEmotion = null;
    this._commentsId = commentsId;

    this._commentsContainer = commentsContainer;
    this._newCommentContainer = this._commentsComponent.getElement()
      .querySelector('.film-details__new-comment');
    this._commentField = this._newCommentContainer
      .querySelector('.film-details__comment-input');

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
    if (!target.classList.contains('film-details__emoji-item')) return;

    this._currentEmotion = target.value;
    this._renderCommentEmotion(this._currentEmotion);
  }

  getComment() {
    const comment = encode(this._commentField.value.trim());

    if (comment && this._currentEmotion) return {comment, emotion: this._currentEmotion};
  }

  rerenderComments(commentsId, isDeleted) {
    this._commentsId = commentsId;

    return isDeleted ? this._renderCommentList() : this._renderComments();
  }

  _renderCommentList() {
    remove(this._commentsTitleComponent);
    remove(this._commentsListComponent);

    this._commentsTitleComponent = new CommentsTitleView(this._commentsId.length);

    this._commentsListComponent = new CommentsListView(
      this._isLoading, this._commentsId, this._commentsModel.comments,
    );

    render(this._commentsComponent, this._commentsTitleComponent, RenderPosition.AFTERBEGIN);
    render(this._commentsTitleComponent, this._commentsListComponent, RenderPosition.AFTEREND);

    this._commentsListComponent.setClickHandler(this._deleteClickHandler);
  }

  _renderCommentEmotion(emotion) {
    remove(this._commentEmojiLabelComponent);

    this._commentEmojiLabelComponent = new CommentEmojiLabelView(emotion);
    render(this._newCommentContainer, this._commentEmojiLabelComponent, RenderPosition.AFTERBEGIN);
  }

  _renderCommentEmotionList() {
    remove(this._commentEmojiListComponent);

    this._commentEmojiListComponent = new CommentEmojiListView(this._isLoading);
    render(this._newCommentContainer, this._commentEmojiListComponent);
  }

  _renderComments() {
    this._commentField.value = '';

    this._renderCommentList();
    this._renderCommentEmotion();
    this._renderCommentEmotionList();
  }

  _deleteClickHandler(id) {
    this._commentsModel.deleteComment(UpdateType.MINOR, id, true);
  }
}

export default CommentsPresenter;
