import {
  FilterType
} from 'const';

import AbstractModel from './abstract-model';

class MenuModel extends AbstractModel {
  constructor() {
    super();
    this._menu = {
      currentFilter: FilterType.ALL,
      isStatsActive: false,
    };
  }

  setMenu(updateType, currentType) {
    this._menu.currentFilter = currentType;

    if (FilterType[currentType.toUpperCase()]) {
      this._menu.isStatsActive = false;
    } else {
      this._menu.isStatsActive = true;
    }

    this._notify(updateType, this._menu, this._menu.isStatsActive);
  }

  get menu() {
    return this._menu;
  }

  get isStatsActive() {
    return this._menu.isStatsActive;
  }

  get filter() {
    return this._menu.currentFilter;
  }

  getFilteredFilmCount(films, filters) {
    const filteredFilmCount = filters.map((filter) => filter(films).length);

    return filteredFilmCount;
  }
}

export default MenuModel;
