import AbstractView from './abstract-view';

const createFilmsEmptyTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
  </section>`
);

class FilmsEmptyView extends AbstractView {
  getTemplate() {
    return createFilmsEmptyTemplate();
  }
}

export default FilmsEmptyView;
