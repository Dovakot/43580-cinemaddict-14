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
    const newComment = generateComment(comment, emotion);
    this._comments = this._comments.concat(newComment);

    this._notify(updateType, this._comments.length - 1, isDeleted);
  }

  deleteComment(updateType, deletedId, isDeleted) {
    // массив не изменяется пока не подъедут реальные данные, иначе съедут индексы

    // const newComments = [];
    // this._comments.forEach((comment, id) => id !== +deletedId ? newComments.push(comment) : false);
    //
    // this._comments = newComments;
    // console.log(this._comments);

    this._notify(updateType, deletedId, isDeleted);
  }

  get comments() {
    return this._comments;
  }
}

export default CommentsModel;
