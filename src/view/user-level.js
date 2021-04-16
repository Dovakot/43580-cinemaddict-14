import {
  createElement
} from 'utils';

const UserRankList = {
  DEFAULT: 'movie buff',
  NOVICE: {
    name: 'novice',
    count: 10,
  },
  FAN: {
    name: 'fan',
    count: 20,
  },
};

const getUserRank = (count) => {
  let userRank = 'movie buff';

  if (count <= UserRankList.NOVICE.count) {
    userRank = UserRankList.NOVICE.name;
  } else if (count > UserRankList.NOVICE.count && count <= UserRankList.FAN.count) {
    userRank = UserRankList.FAN.name;
  }

  return `<p class="profile__rating">${userRank}</p>`;
};

const createUserLevelTemplate = ({count}) => (`
  <section class="header__profile profile">
    ${count > 0 ? getUserRank(count) : ''}

    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
`);

class UserLevel {
  constructor(count) {
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return createUserLevelTemplate(this._count);
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

export default UserLevel;
