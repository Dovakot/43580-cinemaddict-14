import {
  UpdateType
} from 'const';

const filmStatus = {
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
    const key = filmStatus[button.name];
    const changedData = Object.assign({}, this._film.userDetails);
    changedData[key] = !this._film.userDetails[key];

    if (key === filmStatus.watched) {
      changedData.date = changedData.date ? null : new Date().toISOString();
    }

    button.checked = !button.checked;
    button.disabled = true;

    this._changeFilmData(UpdateType.PATCH, {userDetails: changedData}, {isApi: true, button});
  }

  changeFilmComment(updateType, data, isDeleted) {
    return isDeleted ? this._deleteFilmComment(updateType, data)
      : this._changeData(updateType, data);
  }

  _deleteFilmComment(updateType, commentId) {
    const comments = this._film.comments.filter((id) => id !== commentId);

    this._changeFilmData(updateType, {comments});
  }

  _changeFilmData(updateType, updatedData, payload) {
    this._changeData(updateType, Object.assign({}, this._film, updatedData), payload);
  }
}

export default AbstractFilmPresenter;
