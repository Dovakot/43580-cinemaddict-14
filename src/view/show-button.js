import AbstractView from 'abstract';

const createShowButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

class ShowButton extends AbstractView {
  getTemplate() {
    return createShowButtonTemplate();
  }
}

export default ShowButton;
