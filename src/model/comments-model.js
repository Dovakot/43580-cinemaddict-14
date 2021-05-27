import AbstractModel from './abstract-model';

class CommentsModel extends AbstractModel {
  constructor() {
    super();
    this._comments = [];
  }

  get comments() {
    return this._comments;
  }

  init(comments) {
    this._comments = comments.slice();
  }

  addComment(updateType, data) {
    this._comments = data.comments;

    this._notify(updateType, data.film);
  }

  deleteComment(updateType, id, isDeleted) {
    this._comments = this._comments.filter((comment) => comment.id !== id);

    this._notify(updateType, id, isDeleted);
  }

  static adaptToClient({id, date, author, emotion, comment}) {
    return {id, date: new Date(date), author, emotion, text: comment};
  }

  static adaptToServer({id, date, author, emotion, text}) {
    return {id, date: date.toISOString(), author, emotion, comment: text};
  }
}

export default CommentsModel;
