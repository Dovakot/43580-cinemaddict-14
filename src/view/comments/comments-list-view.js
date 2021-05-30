import {
  reportError,
  isOnline
} from 'utils/common-util';

import AbstractView from '../abstract-view';

import {
  getRelativeTime
} from 'utils/date-util';

const ButtonText = {
  DELETING: 'Deleting...',
  DELETE: 'Delete',
};

const createLoadingTemplate = () => (
  '<p class="film-details__text">Loading...</p>'
);

const createErrorTemplate = () => (
  '<p class="film-details__text film-details__text--error">Loading Error</p>'
);

const eventType = {
  loading: createLoadingTemplate,
  error: createErrorTemplate,
};

const createCommentTemplate = ({id, date, author, text, emotion}) => (
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

const createCommentsTemplate = (ids, comments) => (
  `<ul class="film-details__comments-list">
    ${ids.map(getCommentTemplate(comments)).join('')}
  </ul>`
);

const getCommentTemplate = (comments) => (id) => {
  const comment = comments.filter((comment) => comment.id === id);

  return createCommentTemplate(...comment);
};

const createCommentsListTemplate = (type, ids, comments) => {
  return eventType[type] ? eventType[type]() : createCommentsTemplate(ids, comments);
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

  shake(id) {
    const deleteButton = this.getElement().querySelector(`[data-comment-id="${id}"]`);
    const container = deleteButton.closest('li');

    deleteButton.disabled = false;
    deleteButton.textContent = ButtonText.DELETE;
    reportError(container);
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener('click', this._clickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    const target = evt.target;

    if (!target.classList.contains('film-details__comment-delete')) {
      return;
    }

    if (isOnline()) {
      target.disabled = true;
      target.textContent = ButtonText.DELETING;
    }

    this._callback.click(target.dataset.commentId);
  }
}

export default CommentsListView;
