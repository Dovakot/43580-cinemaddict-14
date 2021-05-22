import getUserRank from 'utils/user-level-util';

import AbstractView from './abstract-view';

const createUserLevelTemplate = (count) => (
  `<section class="header__profile profile">
    ${count > 0 ? getUserRank(count) : ''}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

class UserLevelView extends AbstractView {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createUserLevelTemplate(this._filmsCount);
  }
}

export default UserLevelView;
