import AbstractView from './abstract-view';

import {
  AppConfig
} from 'const';

import {
  truncateText,
  getTimeFromMinutes
} from 'utils/film-card-util';

const setClass = (flag) => flag ? 'film-card__controls-item--active' : '';

const createFilmCardTemplate = (film) => {
  const {
    title,
    poster,
    description,
    rating,
    runtime,
    genres,
    release: {date},
  } = film.filmInfo;

  const {
    isWatchlist,
    isWatched,
    isFavorite,
  } = film.userDetails;

  const commentCount = film.comments.length;

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
        ${genres[0]}
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
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${setClass(isWatchlist)}" name="watchlist" type="button">
        Add to watchlist
      </button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${setClass(isWatched)}" name="watched" type="button">
        Mark as watched
      </button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${setClass(isFavorite)}" name="favorite" type="button">
        Mark as favorite
      </button>
    </div>
  </article>`;
};

class FilmCardView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(evt);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}

export default FilmCardView;
