const UserRankList = {
  DEFAULT: 'Movie buff',
  NOVICE: {
    name: 'Novice',
    count: 10,
  },
  FAN: {
    name: 'Fan',
    count: 20,
  },
};

const getUserRank = (count, isStatsActive) => {
  let userRank = UserRankList.DEFAULT;

  if (count <= UserRankList.NOVICE.count) {
    userRank = UserRankList.NOVICE.name;
  } else if (count > UserRankList.NOVICE.count && count <= UserRankList.FAN.count) {
    userRank = UserRankList.FAN.name;
  }

  return isStatsActive ? `<span class="statistic__rank-label">${userRank}</span>`
    : `<p class="profile__rating">${userRank.toLowerCase()}</p>`;
};

export default getUserRank;
