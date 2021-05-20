import AbstractModel from './abstract-model';

const filmsType = {
  top: {
    methods: ['_countFilmsFilteredByRating', 'sortByRating'],
  },
  commented: {
    methods: ['_countFilmsFilteredByComments', 'sortByComments'],
  },
};

const sortType = {
  rating: 'sortByRating',
  date: 'sortByDate',
};

const filterType = {
  watchlist: 'filterByWatchlist',
  watched: 'filterByWatched',
  favorites: 'filterByFavorites',
};

class FilmsModel extends AbstractModel {
  constructor() {
    super();
    this._films = [];
    this._length = 0;
  }

  init(films) {
    this._films = films.slice();
    this._length = films.length;
  }

  get films() {
    return this._films;
  }

  get length() {
    return this._length;
  }

  getExtraFilms(type) {
    const [countMethod, sortMethod] = filmsType[type].methods;
    const filmsCount = this[countMethod]();

    return filmsCount ? this[sortMethod]() : filmsCount;
  }

  updateFilm(updateType, update) {
    this._films = this._films.map((film) => film.filmInfo.id === update.filmInfo.id
      ? update : film);
    this._notify(updateType, update);
  }

  sortBy(films, type) {
    const sortMethod = sortType[type];

    return sortMethod ? this[sortMethod](films) : films;
  }

  sortByRating(films = this._copy) {
    return films.sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);
  }

  sortByComments(films = this._copy) {
    return films.sort((a, b) => b.comments.length - a.comments.length);
  }

  sortByDate(films = this._copy) {
    return films.sort((a, b) => new Date(b.filmInfo.release.date)
      - new Date(a.filmInfo.release.date));
  }

  filterBy(type) {
    const filterMethod = filterType[type];

    return filterMethod ? this[filterMethod]() : this._copy;
  }

  filterByWatchlist(films = this._films) {
    return films.filter((film) => film.userDetails.isWatchlist);
  }

  filterByWatched(films = this._films) {
    return films.filter((film) => film.userDetails.isWatched);
  }

  filterByFavorites(films = this._films) {
    return films.filter((film) => film.userDetails.isFavorite);
  }

  get _copy() {
    return this._films.slice();
  }

  _countFilmsFilteredByRating() {
    return this._films.filter((film) => film.filmInfo.rating !== 0).length;
  }

  _countFilmsFilteredByComments() {
    return this._films.filter((film) => film.comments.length !== 0).length;
  }
}

export default FilmsModel;
