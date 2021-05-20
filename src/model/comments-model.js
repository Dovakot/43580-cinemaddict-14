import AbstractModel from './abstract-model';
import generateComment from 'mock/comment-mock';

class CommentsModel extends AbstractModel {
  constructor() {
    super();
    this._comments = [];
  }

  init(comments) {
    this._comments = comments;
  }

  createComment(updateType, {comment, emotion}, isDeleted) {
    const id = this._comments[this._comments.length - 1].id + 1;
    const newComment = generateComment(id, comment, emotion);
    this._comments = this._comments.concat(newComment);

    this._notify(updateType, id, isDeleted);
  }

  deleteComment(updateType, id, isDeleted) {
    this._comments = this._comments.filter((comment) => comment.id !== id);

    this._notify(updateType, id, isDeleted);
  }

  get comments() {
    return this._comments;
  }
}

export default CommentsModel;
