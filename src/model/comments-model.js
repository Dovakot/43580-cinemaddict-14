class CommentsModel {
  constructor() {
    this._comments = [];
  }

  init(comments) {
    this._comments = comments;
  }

  get comments() {
    return this._comments;
  }
}

export default CommentsModel;
