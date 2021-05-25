import {
  RenderPosition,
  UpdateType
} from 'const';

import {
  render,
  remove
} from 'utils/render-util';

import MenuView from 'view/menu-view';

class MenuPresenter {
  constructor(container, filmsModel, menuModel, updateUserLevel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._menuModel = menuModel;
    this._updateUserLevel = updateUserLevel;
    this._filmsWatchedCount = null;
    this._menuComponent = null;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._modelEventHandler = this._modelEventHandler.bind(this);

    this._menuModel.addObserver(this._modelEventHandler);
    this._filmsModel.addObserver(this._modelEventHandler);
  }

  init(isLoading) {
    remove(this._menuComponent);

    this._menuComponent = new MenuView(this._getFiltersCount(), this._menuModel.menu);
    render(this._container, this._menuComponent, RenderPosition.AFTERBEGIN);

    if (!isLoading) {
      this._menuComponent.setFilterTypeChangeHandler(this._filterTypeChangeHandler);
    }
  }

  _getFiltersCount() {
    const filters = ['filterByWatchlist', 'filterByWatched', 'filterByFavorites'];
    const filtersCount = this._menuModel.getFilteredFilmCount(
      this._filmsModel.films,
      filters.map((filter) => this._filmsModel[filter]),
    );

    const oldFilmsWatchedCount = this._filmsWatchedCount;
    [, this._filmsWatchedCount] = filtersCount;

    this._updateUserLevel(oldFilmsWatchedCount, this._filmsWatchedCount);

    return filtersCount;
  }

  _filterTypeChangeHandler(filterType) {
    if (this._menuModel.filter === filterType) return;

    this._menuModel.setMenu(UpdateType.MAJOR, filterType);
  }

  _modelEventHandler() {
    this.init();
  }
}

export default MenuPresenter;
