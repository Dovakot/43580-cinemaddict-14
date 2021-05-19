import AbstractView from '../abstract-view';

import {
  getFormattedDateTime
} from 'utils/film-card-util';

const getComments = (comments) => (id) => {
  const {
    date,
    author,
    text,
    emotion,
  } = comments[id];

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">
          ${getFormattedDateTime(date)}
        </span>
        <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
      </p>
    </div>
  </li>`;
};

const createCommentsListTemplate = (ids, comments) => (
  `<ul class="film-details__comments-list">
    ${[...ids].map(getComments(comments)).join('')}
  </ul>`
);

class CommentsListView extends AbstractView {
  constructor(ids, comments) {
    super();
    this._ids = ids;
    this._comments = comments;

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createCommentsListTemplate(this._ids, this._comments);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    const target = evt.target;

    if (!target.classList.contains('film-details__comment-delete')) return;

    this._callback.click(target.dataset.commentId);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}

export default CommentsListView;
