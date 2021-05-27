import AbstractView from '../abstract-view';

import {
  getRelativeTime
} from 'utils/date-util';

const getLoading = () => (
  '<p class="film-details__text">Loading...</p>'
);

const getError = () => (
  '<p class="film-details__text film-details__text--error">Loading Error</p>'
);

const eventType = {
  loading: getLoading,
  error: getError,
};

const createComment = ({id, date, author, text, emotion}) => (
  `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">
          ${getRelativeTime(date)}
        </span>
        <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
      </p>
    </div>
  </li>`
);

const createComments = (ids, comments) => (
  `<ul class="film-details__comments-list">
    ${ids.map(getComment(comments)).join('')}
  </ul>`
);

const getComment = (comments) => (id) => {
  const comment = comments.filter((comment) => comment.id === id);

  return createComment(...comment);
};

const createCommentsListTemplate = (type, ids, comments) => {
  return eventType[type] ? eventType[type]() : createComments(ids, comments);
};

class CommentsListView extends AbstractView {
  constructor(eventType, ids, comments) {
    super();
    this._eventType = eventType;
    this._ids = ids;
    this._comments = comments;

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createCommentsListTemplate(this._eventType, this._ids, this._comments);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    const target = evt.target;

    if (!target.classList.contains('film-details__comment-delete')) return;

    this._callback.click(target, target.dataset.commentId);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}

export default CommentsListView;
