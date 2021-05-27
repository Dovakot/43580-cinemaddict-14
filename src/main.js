import {
  AppConfig
} from 'const';

import Api from 'api/api';

import FilmsModel from 'model/films-model';
import BoardPresenter from 'presenter/board-presenter';

const containerHeader = document.querySelector('.header');
const containerMain = document.querySelector('.main');
const containerFooter = document.querySelector('.footer');

const api = new Api(AppConfig.END_POINT, AppConfig.AUTHORIZATION);
const filmsModel = new FilmsModel();
const boardPresenter = new BoardPresenter(containerHeader, containerMain, containerFooter, filmsModel, api);

const updateBoard = (films) => {
  filmsModel.init(Array.isArray(films) ? films : []);
  boardPresenter.update();
};

boardPresenter.init();
api.getFilms().then(updateBoard).catch(updateBoard);
