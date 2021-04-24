import AbstractView from './abstract';

const createShowButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

class ShowButton extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowButtonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener('click', this._clickHandler);
  }
}

export default ShowButton;
