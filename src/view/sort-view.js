import AbstractView from './abstract-view';

import {
  SortType
} from 'const';

const setClass = (flag) => flag ? 'sort__button--active' : '';

const createSortTemplate = (currentSort) => (
  `<ul class="sort">
    <li>
      <a href="#" class="sort__button ${setClass(currentSort === SortType.DEFAULT)}" data-sort-type="${SortType.DEFAULT}">Sort by default</a>
    </li>
    <li>
      <a href="#" class="sort__button ${setClass(currentSort === SortType.DATE)}" data-sort-type="${SortType.DATE}">Sort by date</a>
      </li>
    <li>
      <a href="#" class="sort__button ${setClass(currentSort === SortType.RATING)}" data-sort-type="${SortType.RATING}">Sort by rating</a>
    </li>
  </ul>`
);

class SortView extends AbstractView {
  constructor(currentSort) {
    super();
    this._currentSort = currentSort;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSort);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;

    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }

  _sortTypeChangeHandler(evt) {
    evt.preventDefault();
    const target = evt.target;

    if (!target.classList.contains('sort__button')) {
      return;
    }

    this._callback.sortTypeChange(target.dataset.sortType);
  }
}

export default SortView;
