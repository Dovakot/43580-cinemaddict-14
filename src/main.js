/*eslint no-undef: "error"*/
/*eslint-env node*/

import {
  AppConfig,
  RenderPosition
} from 'const';

import {
  getRandomObjects
} from 'utils/common';

import {
  render
} from 'utils/render';

import FilmsModel from 'model/films';
import CommentsModel from 'model/comments';

import FilmsPresenter from 'presenter/films';

import UserLevelView from 'view/user-level';
import MenuView from 'view/menu';
import FilterView from 'view/filter';
import FooterStatisticsView from 'view/footer-statistics';

import generateCard from 'mock/film-card';
import generateComment from 'mock/comment';
import {
  generateFilter
} from 'mock/filter';

const containerHeader = document.querySelector('.header');
const containerMain = document.querySelector('.main');
const containerFooter = document.querySelector('.footer');

const cardData = getRandomObjects(generateCard, AppConfig.MAX_CARDS);
const commentData = getRandomObjects(generateComment, AppConfig.MAX_COMMENTS);
const filterData = generateFilter(cardData);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const filter = new FilterView(filterData).getTemplate();

const filmsPresenter = new FilmsPresenter(containerMain, filmsModel, commentsModel);
filmsModel.films = cardData;
commentsModel.comments = commentData;
filmsPresenter.init();

render(containerMain, new MenuView(filter), RenderPosition.AFTERBEGIN);
render(containerFooter, new FooterStatisticsView(filmsModel.length));

if (filmsModel.length) {
  const [, userHistory] = filterData;

  render(containerHeader, new UserLevelView(userHistory));
}
