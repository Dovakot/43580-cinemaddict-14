import AbstractView from 'abstract';

import {
  AppConfig
} from 'const';

import {
  truncateText,
  getTimeFromMinutes
} from 'utils';

const TARGET_CLASS_LIST = [
  'film-card__poster',
  'film-card__title',
  'film-card__comments',
];

const isActive = (flag) => flag ? 'film-card__controls-item--active' : '';

const createFilmCardTemplate = (card) => {
  const {
    title,
    poster,
    description,
    rating,
    runtime,
    genres,
    release: {date},
  } = card.filmInfo;

  const {
    isWatchlist,
    isWatched,
    isFavorite,
  } = card.userDetails;

  const commentCount = card.comments.size;

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">
        ${new Date(date).getFullYear()}
      </span>
      <span class="film-card__duration">
        ${getTimeFromMinutes(runtime)}
      </span>
      <span class="film-card__genre">
        ${genres.values().next().value}
      </span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">
      ${truncateText(description.trim(), AppConfig.MAX_NUMBER_CHAR)}
    </p>
    <a class="film-card__comments">
      ${commentCount} ${commentCount === 1 ? 'comment' : 'comments'}
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isActive(isWatchlist)}" type="button">
        Add to watchlist
      </button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isActive(isWatched)}" type="button">
        Mark as watched
      </button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isActive(isFavorite)}" type="button">
        Mark as favorite
      </button>
    </div>
  </article>`;
};

class FilmCard extends AbstractView {
  constructor(card) {
    super();
    this._card = card;

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    const checkClassName = (item) => !evt.target.classList.contains(item);

    if (TARGET_CLASS_LIST.every(checkClassName)) return;

    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener('click', this._clickHandler);
  }
}

export default FilmCard;
