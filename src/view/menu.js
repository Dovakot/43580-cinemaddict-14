import AbstractView from './abstract';

const createMenuTemplate = (filter) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filter}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);

class Menu extends AbstractView {
  constructor(filter) {
    super();
    this._filter = filter;
  }

  getTemplate() {
    return createMenuTemplate(this._filter);
  }
}

export default Menu;
