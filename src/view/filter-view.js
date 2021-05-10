import AbstractView from './abstract-view';

const getFilterLink = ({key, title, count}) => (
  `<a href="#${key}" class="main-navigation__item">
    ${title} <span class="main-navigation__item-count">${count}</span>
  </a>`
);

const createFilterTemplate = (filters) => filters.map(getFilterLink).join('');

class FilterView extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}

export default FilterView;
