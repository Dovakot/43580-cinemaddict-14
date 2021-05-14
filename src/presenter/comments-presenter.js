import {
  encode
} from 'he';

import {
  RenderPosition
} from 'const';

import {
  render,
  remove
} from 'utils/render-util';

import CommentsView from 'view/comments/comments-view';
import CommentsTitleView from 'view/comments/comments-title-view';
import CommentsListView from 'view/comments/comments-list-view';
import CommentEmojiLabelView from 'view/comments/comment-emoji-label';

class CommentsPresenter {
  constructor(commentsContainer) {
    this._commentsComponent = new CommentsView();
    this._commentEmojiLabelComponent = null;

    this._commentsContainer = commentsContainer;
    this._newCommentContainer = this._commentsComponent.getElement()
      .querySelector('.film-details__new-comment');
    this._commentField = this._newCommentContainer
      .querySelector('.film-details__comment-input');

    this._currentEmotion = null;
  }

  init(commentsId, comments) {
    this._commentsId = commentsId;
    this._comments = comments;

    this._commentsTitleComponent = new CommentsTitleView(commentsId.size);
    this._commentsListComponent = new CommentsListView(commentsId, comments);

    this._renderComments();
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

  _renderComments() {
    this._renderCommentEmotion();
    render(this._commentsComponent, this._commentsTitleComponent, RenderPosition.AFTERBEGIN);
    render(this._commentsTitleComponent, this._commentsListComponent, RenderPosition.AFTEREND);
    render(this._commentsContainer, this._commentsComponent);
  }

  _renderCommentEmotion(emotion) {
    if (this._commentEmojiLabelComponent) remove(this._commentEmojiLabelComponent);

    this._commentEmojiLabelComponent = new CommentEmojiLabelView(emotion);
    render(this._newCommentContainer, this._commentEmojiLabelComponent, RenderPosition.AFTERBEGIN);
  }
}

export default CommentsPresenter;
