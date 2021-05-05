import {
  SortType
} from 'const';

class Films {
  constructor() {
    this._cards = [];
    this._comments = [];
  }

  setFilms(cards, comments) {
    this._cards = cards.slice();
    this._comments = comments;
  }

  getFilms() {
    return this._cards;
  }

  getComments() {
    return this._comments;
  }

  updateFilm(update) {
    const index = this._cards.findIndex((card) => card.filmInfo.id === update.filmInfo.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting card');
    }

    this._cards = [
      ...this._cards.slice(0, index),
      update,
      ...this._cards.slice(index + 1),
    ];
  }

  sortBy(type) {
    switch (type) {
      case SortType.RATING:
        return this.sortByRating();
      case SortType.DATE:
        return this.sortByDate();
    }
  }

  sortByRating() {
    return this._copy().sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);
  }

  sortByComments() {
    return this._copy().sort((a, b) => b.comments.size - a.comments.size);
  }

  sortByDate() {
    return this._copy().sort((a, b) => new Date(b.filmInfo.release.date)
      - new Date(a.filmInfo.release.date));
  }

  _copy() {
    return Object.assign([], this._cards);
  }
}

export default Films;
