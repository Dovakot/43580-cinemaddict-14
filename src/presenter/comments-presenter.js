import he from 'he';

import {
  RenderPosition
} from 'const';

import {
  render,
  replace
} from 'utils/render-util';

import CommentsView from 'view/comments/comments-view';
import CommentsTitleView from 'view/comments/comments-title-view';
import CommentsListView from 'view/comments/comments-list-view';
import CommentEmojiLabelView from 'view/comments/comment-emoji-label';

class CommentsPresenter {
  constructor(commentsContainer) {
    this._commentsContainer = commentsContainer;
    this._commentsComponent = new CommentsView();
    this._commentEmojiLabelComponent = new CommentEmojiLabelView();

    this._currentEmotion = null;
  }

  init(commentsId, comments) {
    this._commentsId = commentsId;
    this._comments = comments;

    this._commentsTitleComponent = new CommentsTitleView(commentsId.size);
    this._commentsListComponent = new CommentsListView(commentsId, comments);
    this._commentEmojiLabelComponent = new CommentEmojiLabelView();

    const newCommentContainer = this._commentsComponent.getElement()
      .querySelector('.film-details__new-comment');

    render(this._commentsComponent, this._commentsTitleComponent, RenderPosition.AFTERBEGIN);
    render(this._commentsTitleComponent, this._commentsListComponent, RenderPosition.AFTEREND);
    render(newCommentContainer, this._commentEmojiLabelComponent, RenderPosition.AFTERBEGIN);
    render(this._commentsContainer, this._commentsComponent);
  }

  changeComments(target) {
    if (!target.classList.contains('film-details__emoji-item')) return;

    this._currentEmotion = target.value;
    this._changeCommentEmotion(this._currentEmotion);
  }

  getComment() {
    const commentInput = this._commentsComponent.getElement()
      .querySelector('.film-details__comment-input');
    const value = he.encode(commentInput.value.trim());

    if (!value || !this._currentEmotion) return;

    return {text: value, emotion: this._currentEmotion};
  }

  _changeCommentEmotion(emotion) {
    const prevcommentEmojiLabelComponent = this._commentEmojiLabelComponent;

    this._commentEmojiLabelComponent = new CommentEmojiLabelView(emotion);
    replace(this._commentEmojiLabelComponent, prevcommentEmojiLabelComponent);
  }
}

export default CommentsPresenter;
