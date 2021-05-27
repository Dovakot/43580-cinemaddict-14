import {
  FilterType
} from 'const';

import AbstractView from './abstract-view';

const setClass = (flag) => flag ? 'main-navigation__item--active' : '';

const createMenuTemplate = (
  [watchlist, watched, favorite],
  {currentFilter, isStatsActive},
) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${setClass(currentFilter === FilterType.ALL)}" data-type="${FilterType.ALL}">
        All movies
      </a>
      <a href="#watchlist" class="main-navigation__item ${setClass(currentFilter === FilterType.WATCHLIST)}" data-type="${FilterType.WATCHLIST}">
        Watchlist <span class="main-navigation__item-count">${watchlist}</span>
      </a>
      <a href="#history" class="main-navigation__item ${setClass(currentFilter === FilterType.WATCHED)}" data-type="${FilterType.WATCHED}">
        History <span class="main-navigation__item-count">${watched}</span>
      </a>
      <a href="#favorites" class="main-navigation__item ${setClass(currentFilter === FilterType.FAVORITES)}" data-type="${FilterType.FAVORITES}">
        Favorites <span class="main-navigation__item-count">${favorite}</span>
      </a>
    </div>
    <a href="#stats" class="main-navigation__additional ${setClass(isStatsActive)}" data-type="stats">Stats</a>
  </nav>`
);

class MenuView extends AbstractView {
  constructor(filters, menu) {
    super();
    this._filters = filters;
    this._menu = menu;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._menu);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    const target = evt.target.closest('a');

    if (!target) {
      return;
    }

    this._callback.filterTypeChange(target.dataset.type);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}

export default MenuView;
