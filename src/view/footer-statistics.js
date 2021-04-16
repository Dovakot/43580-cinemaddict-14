import {
  createElement
} from 'utils';

const createFooterStatisticsTemplate = (count) => (`
  <section class="footer__statistics">
    <p>${count} ${count === 1 ? 'movie' : 'movies'} inside</p>
  </section>
`);

class FooterStatistics {
  constructor(count) {
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._count);
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

export default FooterStatistics;
