import AbstractModel from './abstract-model';

class CommentsModel extends AbstractModel {
  constructor() {
    super();
    this._comments = [];
  }

  init(comments) {
    this._comments = comments.slice();
  }

  addComment(updateType, {comment, emotion}, isDeleted) {
    const id = this._comments[this._comments.length - 1].id + 1;
    const newComment = this._createComment(id, comment, emotion);
    this._comments = this._comments.concat(newComment);

    this._notify(updateType, id, isDeleted);
  }

  deleteComment(updateType, id, isDeleted) {
    this._comments = this._comments.filter((comment) => comment.id !== id);

    this._notify(updateType, id, isDeleted);
  }

  _createComment(id, text, emotion) {
    return {id, date: Date.now(), author: 'Dovahkiin', text, emotion};
  }

  get comments() {
    return this._comments;
  }

  static adaptToClient({id, date, author, emotion, comment}) {
    return {id, date: new Date(date), author, emotion, text: comment};
  }

  static adaptToServer({id, date, author, emotion, text}) {
    return {id, date: date.toISOString(), author, emotion, comment: text};
  }
}

export default CommentsModel;
