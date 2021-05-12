import AbstractView from '../abstract-view';

import {
  isSubmit
} from 'utils/common-util';

import {
  getTimeFromMinutes,
  getFormattedDate
} from 'utils/film-card-util';

const createFilmDetailsTemplate = ({
  title,
  poster,
  description,
  rating,
  ageRating,
  runtime,
  director,
  writers,
  actors,
  genres,
  release: {
    date,
    country,
  },
}) => (
  `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  ${writers.size === 1 ? 'Writer' : 'Writers'}
                </td>
                <td class="film-details__cell">
                  ${[...writers].join(', ')}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  ${actors.size === 1 ? 'Actor' : 'Actors'}
                </td>
                <td class="film-details__cell">
                  ${[...actors].join(', ')}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">
                  ${getFormattedDate(date)}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">
                  ${getTimeFromMinutes(runtime)}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  ${genres.size === 1 ? 'Genre' : 'Genres'}
                </td>
                <td class="film-details__cell">
                  ${[...genres].map((genre) => `<span class="film-details__genre">${genre}</span>`).join(' ')}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">${description}</p>
          </div>
        </div>
      </div>

      <div class="film-details__bottom-container"></div>
    </form>
  </section>`
);

class FilmDetailsView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._formChangeHandler = this._formChangeHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._commentsFieldKeydownHandler = this._commentsFieldKeydownHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();

    this._callback.closeClick(evt);
  }

  _formChangeHandler(evt) {
    evt.preventDefault();

    this._callback.formChange(evt);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();

    this._callback.formSubmit(evt);
  }

  _commentsFieldKeydownHandler(evt) {
    return isSubmit(evt) ? this._callback.commentsFieldKeydown(evt) : false;
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;

    this.getElement().querySelector('.film-details__close-btn')
      .addEventListener('click', this._closeClickHandler);
  }

  setFormChangeHandler(callback) {
    this._callback.formChange = callback;

    this.getElement().querySelector('.film-details__inner')
      .addEventListener('change', this._formChangeHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;

    this.getElement().querySelector('.film-details__inner')
      .addEventListener('submit', this._formSubmitHandler);
  }

  setCommentsFieldKeydownHandler(callback) {
    this._callback.commentsFieldKeydown = callback;

    this.getElement().querySelector('.film-details__comment-input')
      .addEventListener('keydown', this._commentsFieldKeydownHandler);
  }
}

export default FilmDetailsView;
