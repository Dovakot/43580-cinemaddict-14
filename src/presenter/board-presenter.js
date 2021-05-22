import {
  render,
  remove
} from 'utils/render-util';

import MenuModel from 'model/menu-model';

import UserLevelView from 'view/user-level-view';
import FooterStatisticsView from 'view/footer-statistics-view';

import FilmsPresenter from 'presenter/films-presenter';
import MenuPresenter from 'presenter/menu-presenter';
import StatsPresenter from 'presenter/stats-presenter';

class BoardPresenter {
  constructor(containerHeader, containerMain, containerFooter, filmsModel, commentsModel) {
    this._containerHeader = containerHeader;
    this._containerMain = containerMain;
    this._containerFooter = containerFooter;

    this._menuModel = new MenuModel();
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._userLevelComponent = null;
    this._menuPresenter = null;
    this._filmsPresenter = null;
    this._statsPresenter = new StatsPresenter(containerMain);

    this._updateUserLevel = this._updateUserLevel.bind(this);
  }

  init() {
    this._initPresenters();
    this._renderFooterStatistics();

    if (this._filmsModel.length) {
      this._updateUserLevel();
    }
  }

  _initPresenters() {
    this._filmsPresenter = new FilmsPresenter(
      this._containerMain, this._filmsModel, this._commentsModel, this._menuModel, this._statsPresenter,
    );
    this._menuPresenter = new MenuPresenter(
      this._containerMain, this._filmsModel, this._menuModel, this._updateUserLevel,
    );

    this._filmsPresenter.init();
    this._menuPresenter.init();
  }

  _renderUserLevel(filmCount) {
    remove(this._userLevelComponent);

    this._userLevelComponent = new UserLevelView(filmCount);
    render(this._containerHeader, this._userLevelComponent);
  }

  _renderFooterStatistics() {
    render(this._containerFooter, new FooterStatisticsView(this._filmsModel.length));
  }

  _updateUserLevel(oldCount, newCount) {
    if (oldCount !== newCount) this._renderUserLevel(newCount);
  }
}

export default BoardPresenter;
