import {
  render,
  remove
} from 'utils/render-util';

import MenuModel from 'model/menu-model';

import UserLevelView from 'view/user-level-view';
import FooterStatisticsView from 'view/footer-statistics-view';
import LoadingView from 'view/loading-view';

import FilmsPresenter from 'presenter/films-presenter';
import MenuPresenter from 'presenter/menu-presenter';
import StatsPresenter from 'presenter/stats-presenter';

class BoardPresenter {
  constructor(containerHeader, containerMain, containerFooter, filmsModel, api) {
    this._containerHeader = containerHeader;
    this._containerMain = containerMain;
    this._containerFooter = containerFooter;

    this._menuModel = new MenuModel();
    this._filmsModel = filmsModel;
    this._userLevelComponent = null;
    this._loadingComponent = null;
    this._footerStatisticsComponent = null;
    this._menuPresenter = null;
    this._filmsPresenter = null;
    this._statsPresenter = new StatsPresenter(containerMain);
    this._api = api;

    this._updateUserLevel = this._updateUserLevel.bind(this);
  }

  init() {
    this._renderMenu(true);

    this._renderLoading();
    this._renderFooterStatistics();
  }

  update() {
    this._clearBord();

    this._menuPresenter.init();
    this._renderFilms();
    this._renderFooterStatistics();

    if (this._filmsModel.length) {
      this._updateUserLevel();
    }
  }

  _clearBord() {
    remove(this._loadingComponent);
    this._loadingComponent = null;
  }

  _renderMenu(updateType) {
    this._menuPresenter = new MenuPresenter(
      this._containerMain, this._filmsModel, this._menuModel, this._updateUserLevel,
    );

    this._menuPresenter.init(updateType);
  }

  _renderFilms() {
    this._filmsPresenter = new FilmsPresenter(
      this._containerMain, this._filmsModel, this._menuModel, this._statsPresenter, this._api,
    );

    this._filmsPresenter.init();
  }

  _renderUserLevel(filmCount) {
    remove(this._userLevelComponent);

    this._userLevelComponent = new UserLevelView(filmCount);
    render(this._containerHeader, this._userLevelComponent);
  }

  _renderFooterStatistics() {
    remove(this._footerStatisticsComponent);

    this._footerStatisticsComponent = new FooterStatisticsView(this._filmsModel.length);
    render(this._containerFooter, this._footerStatisticsComponent);
  }

  _renderLoading() {
    this._loadingComponent = new LoadingView();
    render(this._containerMain, this._loadingComponent);
  }

  _updateUserLevel(oldCount, newCount) {
    if (oldCount !== newCount) this._renderUserLevel(newCount);
  }
}

export default BoardPresenter;
