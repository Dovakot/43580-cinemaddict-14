import AbstractView from './abstract-view';

const createLoadingTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>
  </section>`
);

class LoadingView extends AbstractView {
  getTemplate() {
    return createLoadingTemplate();
  }
}

export default LoadingView;
