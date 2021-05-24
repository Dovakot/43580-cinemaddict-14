/*eslint no-undef: "error"*/
/*eslint-env node*/

import {
  AppConfig
} from 'const';

import Api from 'api/api';

import FilmsModel from 'model/films-model';
import BoardPresenter from 'presenter/board-presenter';

const containerHeader = document.querySelector('.header');
const containerMain = document.querySelector('.main');
const containerFooter = document.querySelector('.footer');

const filmsModel = new FilmsModel();
const boardPresenter = new BoardPresenter(containerHeader, containerMain, containerFooter, filmsModel);
boardPresenter.init();

const api = new Api(AppConfig.END_POINT, AppConfig.AUTHORIZATION);
const updateBoard = (films) => {
  filmsModel.init(Array.isArray(films) ? films : []);
  boardPresenter.update();
};

api.getFilms().then(updateBoard).catch(updateBoard);
