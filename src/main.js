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

import getFilms from 'mock/films-mock';
import generateComment from 'mock/comment-mock';

import BoardPresenter from 'presenter/board-presenter';

const containerHeader = document.querySelector('.header');
const containerMain = document.querySelector('.main');
const containerFooter = document.querySelector('.footer');

const comments = getRandomObjects(() => generateComment(), AppConfig.MAX_COMMENTS);
const films = getFilms(comments);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

filmsModel.init(films);
commentsModel.init(comments);

const boardPresenter = new BoardPresenter(
  containerHeader, containerMain, containerFooter, filmsModel, commentsModel,
);
boardPresenter.init();
