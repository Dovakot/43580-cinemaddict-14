/*eslint no-undef: "error"*/
/*eslint-env node*/

import {
  AppConfig,
  RenderPosition
} from 'const';

import {
  getRandomObjects
} from 'utils/common-util';

import {
  render
} from 'utils/render-util';

import FilmsModel from 'model/films-model';
import CommentsModel from 'model/comments-model';

import FilmsPresenter from 'presenter/films-presenter';

import UserLevelView from 'view/user-level-view';
import MenuView from 'view/menu-view';
import FilterView from 'view/filter-view';
import FooterStatisticsView from 'view/footer-statistics-view';

import generateFilm from 'mock/film-card-mock';
import generateComment from 'mock/comment-mock';
import {
  generateFilter
} from 'mock/filter-mock';

const containerHeader = document.querySelector('.header');
const containerMain = document.querySelector('.main');
const containerFooter = document.querySelector('.footer');

const films = getRandomObjects(generateFilm, AppConfig.MAX_FILMS);
const comments = getRandomObjects(generateComment, AppConfig.MAX_COMMENTS);
const filters = generateFilter(films);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const filterComponent = new FilterView(filters).getTemplate();

const filmsPresenter = new FilmsPresenter(containerMain, filmsModel, commentsModel);
filmsModel.films = films;
commentsModel.comments = comments;
filmsPresenter.init();

render(containerMain, new MenuView(filterComponent), RenderPosition.AFTERBEGIN);
render(containerFooter, new FooterStatisticsView(filmsModel.length));

if (filmsModel.length) {
  const [, userHistory] = filters;

  render(containerHeader, new UserLevelView(userHistory));
}
