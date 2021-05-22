import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import {
  AppConfig,
  DatePeriod
} from 'const';

import {
  sortObject
} from 'utils/common-util';

import {
  render,
  remove
} from 'utils/render-util';

import getStatsChart from 'utils/stats-util';

import StatsView from 'view/stats/stats-view';
import StatsTextListView from 'view/stats/stats-text-list-view';
import StatsFormView from 'view/stats/stats-form-view';

const DaysCount = {
  TODAY: 0,
  WEEK: 7,
  MONTH: 1,
  YEAR: 1,
};

class StatsPresenter {
  constructor(containerMain) {
    this._containerMain = containerMain;
    this._statsComponent = null;
    this._statsFormComponent = null;
    this._statsTextListComponent = null;
    this._containerStats = null;
    this._statisticCtx = null;

    this._currentPeriod = null,
    this._totalWatched = 0;
    this._totalDuration = 0;
    this._topGenre = 0;

    this._changeHandler = this._changeHandler.bind(this);
  }

  init(films) {
    this._films = films;
    this._filmsCount = films.length;

    this._renderStatsSection();
    this._renderStatsForm();
    this._renderStats();
  }

  destroy() {
    remove(this._statsComponent);
  }

  _isDateInRange(currentDate, dateFrom) {
    dayjs.extend(isSameOrBefore);

    return dayjs(dateFrom).isSameOrBefore(currentDate);
  }

  _getDateFrom(count, name) {
    return count ? dayjs().subtract(count, name).toDate() : dayjs().toDate();
  }

  _getFilmsForPeriod() {
    const currentPeriod = DatePeriod[this._currentPeriod];

    if (!currentPeriod) return this._films;

    const filmsForPeriod = [];
    const dateFrom = this._getDateFrom(DaysCount[currentPeriod], currentPeriod.toLowerCase());

    this._films.forEach((film) => this._isDateInRange(film.userDetails.date, dateFrom)
      && filmsForPeriod.push(film));

    return filmsForPeriod;
  }

  _getGenres(films) {
    const genres = [];
    this._totalDuration = 0;

    films.forEach(({filmInfo}) => {
      this._totalDuration += filmInfo.runtime;
      genres.push(...filmInfo.genres);
    });

    return genres
      .reduce((stack, genre) => (stack[genre] ? stack[genre]++ : stack[genre] = 1, stack), {});
  }

  _getSortedGenres(films) {
    const genres = this._getGenres(films);

    return sortObject(genres);
  }

  _renderStatsSection() {
    this._statsComponent = new StatsView(this._filmsCount);
    this._containerStats = this._statsComponent.getElement()
      .querySelector('.statistic__container');
    this._statisticCtx = this._statsComponent.getElement()
      .querySelector('.statistic__chart');

    render(this._containerMain, this._statsComponent);
  }

  _renderStatsForm() {
    if (!this._filmsCount) return;

    remove(this._statsFormComponent);

    this._statsFormComponent = new StatsFormView();
    render(this._containerStats, this._statsFormComponent);

    this._statsFormComponent.setChangeHandler(this._changeHandler);
  }

  _renderStatsTextList() {
    remove(this._statsTextListComponent);

    this._statsTextListComponent = new StatsTextListView(
      this._totalWatched, this._totalDuration, this._topGenre,
    );
    render(this._containerStats, this._statsTextListComponent);
  }

  _renderStatsChart() {
    if (!this._filmsCount) return;

    const filmsForPeriod = this._getFilmsForPeriod();
    const sortedGenres = this._getSortedGenres(filmsForPeriod);
    const genres = Object.keys(sortedGenres);
    const genresCount = Object.values(sortedGenres);

    [this._topGenre] = genres;
    this._totalWatched = filmsForPeriod.length;
    this._statisticCtx.height = AppConfig.BAR_HEIGHT * genres.length;

    getStatsChart(this._statisticCtx, genres, genresCount);
  }

  _renderStats() {
    this._renderStatsChart();
    this._renderStatsTextList();
  }

  _changeHandler(period) {
    this._currentPeriod = DatePeriod[period];

    this._renderStats();
  }
}

export default StatsPresenter;
