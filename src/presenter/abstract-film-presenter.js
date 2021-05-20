import {
  UpdateType
} from 'const';

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

  changeFilmStatus(button) {
    const key = CONTROL_BUTTONS[button.name];
    const changedData = Object.assign({}, this._film.userDetails);
    changedData[key] = !this._film.userDetails[key];

    this._changeFilmData(UpdateType.PATCH, {userDetails: changedData});
  }

  changeFilmComment(updateType, id, isDeleted) {
    const actionType = isDeleted ? 'delete' : 'add';
    const changedData = new Set(this._film.comments);
    changedData[actionType](id);

    this._changeFilmData(updateType, {comments: changedData});
  }

  _changeFilmData(updateType, updatedData) {
    this._changeData(updateType, Object.assign({}, this._film, updatedData));
  }
}

export default AbstractFilmPresenter;
