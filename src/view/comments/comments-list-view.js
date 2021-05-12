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
        <button class="film-details__comment-delete">Delete</button>
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
  }

  getTemplate() {
    return createCommentsListTemplate(this._ids, this._comments);
  }
}

export default CommentsListView;
