import {
  AppConfig
} from 'const';

import Api from 'api/api';
import Store from 'api/store';
import Provider from 'api/provider';

import FilmsModel from 'model/films-model';
import BoardPresenter from 'presenter/board-presenter';

import NetworkView from 'view/network-view';

const STORE_NAME = `${AppConfig.STORE_PREFIX}-${AppConfig.STORE_VER}`;

const containerHeader = document.querySelector('.header');
const containerMain = document.querySelector('.main');
const containerFooter = document.querySelector('.footer');

const networkComponent = new NetworkView();

const baseApi = new Api(AppConfig.END_POINT, AppConfig.AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const api = new Provider(baseApi, store);

const filmsModel = new FilmsModel();
const boardPresenter = new BoardPresenter(containerHeader, containerMain, containerFooter, filmsModel, api);

const updateBoard = (films) => {
  filmsModel.init(Array.isArray(films) ? films : []);
  boardPresenter.update();
};

boardPresenter.init();
api.getFilms().then(updateBoard).catch(updateBoard);

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  networkComponent.hide();
  api.sync();
  boardPresenter.sync();
});

window.addEventListener('offline', () => {
  networkComponent.show();
});
