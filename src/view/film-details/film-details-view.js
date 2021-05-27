import AbstractView from '../abstract-view';

import {
  DateFormat
} from 'const';

import {
  getFormattedDate,
  getTime
} from 'utils/date-util';

const getGenre = (genre) => `<span class="film-details__genre">${genre}</span>`;

const createFilmDetailsTemplate = ({
  title, alternativeTitle, poster, description, rating, ageRating, runtime, director,
  writers, actors, genres, release: {date, country},
}) => (
  `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${alternativeTitle}</p>
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
                  Writer${writers.length === 1 ? '' : 's'}
                </td>
                <td class="film-details__cell">
                  ${writers.join(', ')}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Actor${actors.length === 1 ? '' : 's'}
                </td>
                <td class="film-details__cell">
                  ${actors.join(', ')}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">
                  ${getFormattedDate(date, DateFormat.DATE)}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">
                  ${getTime(runtime, DateFormat.TIME)}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Genre${genres.length === 1 ? '' : 's'}
                </td>
                <td class="film-details__cell">
                  ${genres.map(getGenre).join(' ')}
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
  constructor(film, handlers) {
    super();
    this._film = film;
    this._handlers = handlers;

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._changeHandler = this._changeHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();

    this._callback.closeClick(evt);
  }

  _changeHandler(evt) {
    evt.preventDefault();

    this._callback.formChange(evt);
  }

  _submitHandler(evt) {
    this._callback.formSubmit(evt);
  }

  setHandlers() {
    const form = this.getElement().querySelector('.film-details__inner');
    const button = form.querySelector('.film-details__close-btn');

    Object.keys(this._handlers)
      .forEach((key) => this._callback[key] = this._handlers[key]);

    button.addEventListener('click', this._closeClickHandler);
    form.addEventListener('change', this._changeHandler);
    form.addEventListener('submit', this._submitHandler);
  }
}

export default FilmDetailsView;
