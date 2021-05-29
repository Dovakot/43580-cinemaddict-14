import {
  isOnline
} from 'utils/common-util';

import FilmsModel from 'model/films-model';

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
        .then((films) => {
          const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
          this._store.setItems(items);

          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(storeFilms.map(FilmsModel.adaptToClient));
  }

  updateFilm(film) {
    if (isOnline()) {
      return this._api.updateFilm(film)
        .then((updatedFilm) => {
          this._store.setItem(updatedFilm.filmInfo.id, FilmsModel.adaptToServer(updatedFilm));

          return updatedFilm;
        });
    }

    this._store.setItem(film.filmInfo.id, FilmsModel.adaptToServer(Object.assign({}, film)));

    return Promise.resolve(film);
  }

  getComments(id) {
    if (isOnline()) {
      return this._api.getComments(id);
    }

    return Promise.resolve(new Error('Comments list is\'t available offline'));
  }

  addComment(data) {
    if (isOnline()) {
      return this._api.addComment(data);
    }

    return Promise.reject(new Error('You can\'t add a comment in the mode offline'));
  }

  deleteComment(id) {
    if (isOnline()) {
      return this._api.deleteComment(id);
    }

    return Promise.reject(new Error('You can\'t delete a comment in mode offline'));
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          const updatedFilms = getSyncedFilms(response.updated);
          const items = createStoreStructure([...updatedFilms]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}

export default Provider;
