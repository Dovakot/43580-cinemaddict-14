import {
  DatePeriod
} from 'const';

import AbstractView from '../abstract-view';

const createStatsFormTemplate = () => (
  `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="${DatePeriod.ALL}" checked>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="${DatePeriod.DAY}">
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="${DatePeriod.WEEK}">
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="${DatePeriod.MONTH}">
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="${DatePeriod.YEAR}">
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>`
);

class StatsFormView extends AbstractView {
  constructor() {
    super();

    this._changeHandler = this._changeHandler.bind(this);
  }

  getTemplate() {
    return createStatsFormTemplate();
  }

  _changeHandler(evt) {
    evt.preventDefault();
    const target = evt.target;

    if (!target.classList.contains('statistic__filters-input')) return;

    this._callback.formChange(target.value);
  }

  setChangeHandler(callback) {
    this._callback.formChange = callback;
    this.getElement().addEventListener('change', this._changeHandler);
  }
}

export default StatsFormView;
