import AbstractView from './abstract-view';

const createFooterStatisticsTemplate = (count) => (
  `<section class="footer__statistics">
    <p>${count} movie${count === 1 ? '' : 's'} inside</p>
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
