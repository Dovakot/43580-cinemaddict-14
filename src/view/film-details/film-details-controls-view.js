import {
  reportError
} from 'utils/common-util';

import AbstractView from '../abstract-view';

const changeStatus = (flag) => flag ? 'checked' : '';

const createFilmDetailsControlsTemplate = ({isWatchlist, isWatched, isFavorite}) => (
  `<section class="film-details__controls">
    <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${changeStatus(isWatchlist)}>
    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${changeStatus(isWatched)}>
    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${changeStatus(isFavorite)}>
    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
  </section>`
);

class FilmDetailsControlsView extends AbstractView {
  constructor(userDetails) {
    super();
    this._userDetails = userDetails;
  }

  getTemplate() {
    return createFilmDetailsControlsTemplate(this._userDetails);
  }

  shake(name) {
    const controlLabel = this.getElement().querySelector(`.film-details__control-label--${name}`);
    const controlButton = this.getElement().querySelector(`#${name}`);

    controlButton.disabled = false;
    reportError(controlLabel);
  }
}

export default FilmDetailsControlsView;
