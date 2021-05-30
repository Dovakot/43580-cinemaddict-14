import FilmsModel from 'model/films-model';
import CommentsModel from 'model/comments-model';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

const ApiConfig = {
  URLS: {
    films: 'movies',
    comments: 'comments/',
    sync: 'movies/sync',
  },
  HEADERS: {'Content-Type': 'application/json'},
  AUTHORIZATION: 'Authorization',
};

class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: ApiConfig.URLS.films})
      .then(Api.toJSON)
      .then((films) => films.map(FilmsModel.adaptToClient));
  }

  getComments(id) {
    return this._load({url: `${ApiConfig.URLS.comments}${id}`})
      .then(Api.toJSON)
      .then((comments) => comments.map(CommentsModel.adaptToClient));
  }

  updateFilm(film) {
    return this._load({
      url: `${ApiConfig.URLS.films}/${film.filmInfo.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServer(film)),
      headers: new Headers(ApiConfig.HEADERS),
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  addComment(data) {
    return this._load({
      url: `${ApiConfig.URLS.comments}${data.movie}`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers(ApiConfig.HEADERS),
    })
      .then(Api.toJSON)
      .then((result) => ({
        comments: result.comments.map(CommentsModel.adaptToClient),
        film: FilmsModel.adaptToClient(result.movie),
      }));
  }

  deleteComment(id) {
    return this._load({url: `${ApiConfig.URLS.comments}${id}`, method: Method.DELETE});
  }

  sync(data) {
    return this._load({
      url: ApiConfig.URLS.sync,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers(ApiConfig.HEADERS),
    })
      .then(Api.toJSON);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(ApiConfig.AUTHORIZATION, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}

export default Api;
