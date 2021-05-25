import AbstractModel from './abstract-model';

const filmsType = {
  top: {
    methods: ['_filterByRating', 'sortByRating'],
  },
  commented: {
    methods: ['_filterByComments', 'sortByComments'],
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
    const films = this[countMethod]();
    const filmsCount = films.length;

    return filmsCount ? this[sortMethod](films) : filmsCount;
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

  _filterByRating() {
    return this._films.filter((film) => film.filmInfo.rating !== 0);
  }

  _filterByComments() {
    return this._films.filter((film) => film.comments.length !== 0);
  }

  static adaptToClient(film) {
    const watchingDate = film.user_details.watching_date;

    return {
      comments: film.comments,
      filmInfo: {
        id: film.id,
        title: film.film_info.title,
        alternativeTitle: film.film_info.alternative_title,
        poster: film.film_info.poster,
        description: film.film_info.description,
        rating: film.film_info.total_rating,
        ageRating: film.film_info.age_rating,
        runtime: film.film_info.runtime,
        director: film.film_info.director,
        writers: film.film_info.writers,
        actors: film.film_info.actors,
        genres: film.film_info.genre,
        release: {
          date: new Date(film.film_info.release.date),
          country: film.film_info.release.release_country,
        },
      },
      userDetails: {
        date: watchingDate ? new Date(watchingDate) : watchingDate,
        isWatchlist: film.user_details.watchlist,
        isFavorite: film.user_details.favorite,
        isWatched: film.user_details.already_watched,
      },
    };
  }

  static adaptToServer({filmInfo, userDetails, comments}) {
    return {
      'id': filmInfo.id,
      'film_info': {
        'title': filmInfo.title,
        'alternative_title': filmInfo.alternativeTitle,
        'total_rating': filmInfo.rating,
        'poster': filmInfo.poster,
        'age_rating': filmInfo.ageRating,
        'director': filmInfo.director,
        'writers': filmInfo.writers,
        'actors': filmInfo.actors,
        'release': {
          'date': filmInfo.release.date.toISOString(),
          'release_country': filmInfo.release.country,
        },
        'runtime': filmInfo.runtime,
        'genre': filmInfo.genres,
        'description': filmInfo.description,
      },
      'user_details': {
        'watchlist': userDetails.isWatchlist,
        'already_watched': userDetails.isWatched,
        'watching_date': userDetails.date,
        'favorite': userDetails.isFavorite,
      },
      'comments': comments,
    };
  }
}

export default FilmsModel;
