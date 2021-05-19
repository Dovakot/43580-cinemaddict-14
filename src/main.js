/*eslint no-undef: "error"*/
/*eslint-env node*/

import {
  AppConfig
} from 'const';

import {
  getRandomObjects
} from 'utils/common-util';

import FilmsModel from 'model/films-model';
import CommentsModel from 'model/comments-model';

import generateFilm from 'mock/film-card-mock';
import generateComment from 'mock/comment-mock';

import BoardPresenter from 'presenter/board-presenter';

const containerHeader = document.querySelector('.header');
const containerMain = document.querySelector('.main');
const containerFooter = document.querySelector('.footer');

const films = getRandomObjects(generateFilm, AppConfig.MAX_FILMS);
const comments = getRandomObjects(() => generateComment(), AppConfig.MAX_COMMENTS);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

filmsModel.init(films);
commentsModel.init(comments);

const boardPresenter = new BoardPresenter(
  containerHeader, containerMain, containerFooter, filmsModel, commentsModel,
);
boardPresenter.init();
