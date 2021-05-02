const CONTROL_BUTTONS = {
  watchlist: 'isWatchlist',
  watched: 'isWatched',
  favorite: 'isFavorite',
};

class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._changeData = null;
  }

  _changeFilmStatus(button) {
    const key = CONTROL_BUTTONS[button.name];
    const changedData = {...this._card.userDetails};

    changedData[key] = !this._card.userDetails[key];

    this._changeData({...this._card, userDetails: changedData});
  }
}

export default Abstract;
