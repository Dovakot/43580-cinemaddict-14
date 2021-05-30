import {
  isOnline
} from 'utils/common-util';

import FilmsModel from 'model/films-model';

const ErrorType = {
  GETTING_COMMENT: 'Comments list is\'t available offline',
  ADDING_COMMENT: 'You can\'t add a comment in the mode offline',
  DELETING_COMMENT: 'You can\'t delete a comment in mode offline',
  DATA_SYNC: 'Sync data failed',
};

const getSyncedFilms = (items) => items.filter(({success}) => success)
  .map(({payload}) => payload.film);

const createStoreStructure = (items) => items
  .reduce((acc, current) => Object.assign({}, acc, {[current.id]: current}), {});

class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => this._addFilmsToStore(films));
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(storeFilms.map(FilmsModel.adaptToClient));
  }

  updateFilm(film) {
    if (isOnline()) {
      return this._api.updateFilm(film)
        .then((updatedFilm) => this._updateFilmToStore(updatedFilm));
    }

    this._store.setItem(film.filmInfo.id, FilmsModel.adaptToServer(Object.assign({}, film)));

    return Promise.resolve(film);
  }

  getComments(id) {
    return isOnline() ? this._api.getComments(id)
      : Promise.resolve(new Error(ErrorType.GETTING_COMMENT));
  }

  addComment(data) {
    return isOnline() ? this._api.addComment(data)
      : Promise.reject(new Error(ErrorType.ADDING_COMMENT));
  }

  deleteComment(id) {
    return isOnline() ? this._api.deleteComment(id)
      : Promise.reject(new Error(ErrorType.DELETING_COMMENT));
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => this._updateStore(response));
    }

    return Promise.reject(new Error(ErrorType.DATA_SYNC));
  }

  _addFilmsToStore(films) {
    const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
    this._store.setItems(items);

    return films;
  }

  _updateFilmToStore(updatedFilm) {
    this._store.setItem(updatedFilm.filmInfo.id, FilmsModel.adaptToServer(updatedFilm));

    return updatedFilm;
  }

  _updateStore(response) {
    const updatedFilms = getSyncedFilms(response.updated);
    const items = createStoreStructure([...updatedFilms]);

    this._store.setItems(items);
  }
}

export default Provider;
