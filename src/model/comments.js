class Comments {
  constructor() {
    this._comments = [];
  }

  set comments(comments) {
    this._comments = comments;
  }

  get comments() {
    return this._comments;
  }
}

export default Comments;
