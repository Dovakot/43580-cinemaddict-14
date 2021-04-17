import {
  createElement
} from 'utils';

const getFilterLink = ({key, title, count}) => (
  `<a href="#${key}" class="main-navigation__item">
    ${title} <span class="main-navigation__item-count">${count}</span>
  </a>`
);

const createFilterTemplate = (filters) => filters.map(getFilterLink).join('');

class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Filter;
