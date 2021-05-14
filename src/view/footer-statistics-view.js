import AbstractView from './abstract-view';

const createFooterStatisticsTemplate = (count) => (
  `<section class="footer__statistics">
    <p>${count} ${count === 1 ? 'movie' : 'movies'} inside</p>
  </section>`
);

class FooterStatisticsView extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._count);
  }
}

export default FooterStatisticsView;
