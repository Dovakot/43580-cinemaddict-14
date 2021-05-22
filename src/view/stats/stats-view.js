import getUserRank from 'utils/user-level-util';

import AbstractView from '../abstract-view';

const createStatsViewTemplate = (count) => (
  `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      ${count > 0 ? getUserRank(count, true) : ''}
    </p>
    <div class="statistic__container"></div>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`
);

class StatsView extends AbstractView {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createStatsViewTemplate(this._filmsCount);
  }
}

export default StatsView;
