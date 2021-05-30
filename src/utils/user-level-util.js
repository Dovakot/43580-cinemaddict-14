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
  if (count <= UserRankList.NOVICE.count) {
    return UserRankList.NOVICE.name;
  } else if (count > UserRankList.NOVICE.count && count <= UserRankList.FAN.count) {
    return UserRankList.FAN.name;
  }

  return UserRankList.DEFAULT;
};

export default getUserRankValue;
