import getUserRankValue from 'utils/user-level-util';

import AbstractView from './abstract-view';

const createUserRankTemplate = (count) => (
  `<p class="profile__rating">${getUserRankValue(count).toLowerCase()}</p>`
);

const createProfileTemplate = (count) => (
  `<section class="header__profile profile">
    ${count > 0 ? createUserRankTemplate(count) : ''}
    <img class="profile__avatar" src="./images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

class ProfileView extends AbstractView {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createProfileTemplate(this._filmsCount);
  }
}

export default ProfileView;
