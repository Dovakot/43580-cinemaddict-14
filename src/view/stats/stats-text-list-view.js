import AbstractView from '../abstract-view';

const createTotalDurationTemplate = (duration) => {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;

  return `${hours} <span class="statistic__item-description">h</span>
    ${minutes} <span class="statistic__item-description">m</span>`;
};

const createStatsTextListTemplate = (totalWatched, totalDuration, topGenre) => (
  `<ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">
        ${totalWatched}
        <span class="statistic__item-description">
          movie${totalWatched === 1 ? '' : 's'}
        </span>
      </p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${createTotalDurationTemplate(totalDuration)}</p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${topGenre || ''}</p>
    </li>
  </ul>`
);

class StatsTextListView extends AbstractView {
  constructor(totalWatched, totalDuration, topGenre) {
    super();
    this._totalWatched = totalWatched;
    this._totalDuration = totalDuration;
    this._topGenre = topGenre;
  }

  getTemplate() {
    return createStatsTextListTemplate(this._totalWatched, this._totalDuration, this._topGenre);
  }
}

export default StatsTextListView;
