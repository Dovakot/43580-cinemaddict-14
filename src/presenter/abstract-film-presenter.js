const CONTROL_BUTTONS = {
  watchlist: 'isWatchlist',
  watched: 'isWatched',
  favorite: 'isFavorite',
};

class AbstractFilmPresenter {
  constructor() {
    if (new.target === AbstractFilmPresenter) {
      throw new Error('Can\'t instantiate AbstractFilmPresenter, only concrete one.');
    }

    this._changeData = null;
  }

  _changeFilmStatus(button) {
    const key = CONTROL_BUTTONS[button.name];
    const changedData = Object.assign({}, this._film.userDetails);
    changedData[key] = !this._film.userDetails[key];

    this._changeData(Object.assign(
      {},
      this._film,
      {userDetails: changedData},
    ));
  }
}

export default AbstractFilmPresenter;
