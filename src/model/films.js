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

class Films {
  constructor() {
    this._films = [];
    this._length = 0;
  }

  set films(films) {
    this._films = films.slice();
  }

  get films() {
    return this._films;
  }

  get length() {
    return this._films.length;
  }

  getExtraFilms(type) {
    const [countMethod, sortMethod] = filmsType[type].methods;
    const filmsCount = this[countMethod]();

    return filmsCount ? this[sortMethod]() : filmsCount;
  }

  updateFilm(update) {
    this._films = this._films.map((film) => film.filmInfo.id === update.filmInfo.id
      ? update : film);
  }

  sortBy(type) {
    const sortMethod = sortType[type];

    return sortMethod ? this[sortMethod]() : this._films;
  }

  sortByRating() {
    return this._copy.sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);
  }

  sortByComments() {
    return this._copy.sort((a, b) => b.comments.size - a.comments.size);
  }

  sortByDate() {
    return this._copy.sort((a, b) => new Date(b.filmInfo.release.date)
      - new Date(a.filmInfo.release.date));
  }

  get _copy() {
    return this._films.slice();
  }

  _countFilmsFilteredByRating() {
    return this._films.filter((film) => film.filmInfo.rating !== 0).length;
  }

  _countFilmsFilteredByComments() {
    return this._films.filter((film) => film.comments.size !== 0).length;
  }
}

export default Films;
