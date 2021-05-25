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

const getUserRankValue = (count) => {
  let userRank = UserRankList.DEFAULT;

  if (count <= UserRankList.NOVICE.count) {
    userRank = UserRankList.NOVICE.name;
  } else if (count > UserRankList.NOVICE.count && count <= UserRankList.FAN.count) {
    userRank = UserRankList.FAN.name;
  }

  return userRank;
};

export default getUserRankValue;
