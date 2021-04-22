import AbstractView from 'abstract';

const createFooterStatisticsTemplate = (count) => (
  `<section class="footer__statistics">
    <p>${count} ${count === 1 ? 'movie' : 'movies'} inside</p>
  </section>`
);

class FooterStatistics extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._count);
  }
}

export default FooterStatistics;
