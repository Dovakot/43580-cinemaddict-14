const FILTER_TITLES = [
  'Watchlist',
  'History',
  'Favorites',
];

const getFilterWatchlist = (cards) => cards.filter((card) => card.userDetails.isWatchlist);

const getFilterHistory = (cards) => cards.filter((card) => card.userDetails.isWatched);

const getFilterFavorites = (cards) => cards.filter((card) => card.userDetails.isFavorite);

const getFilterByRating = (cards) => cards.filter((card) => card.filmInfo.rating !== 0);

const getFilterByComments = (cards) => cards.filter((card) => card.comments.size !== 0);

const filterCount = {
  watchlist: getFilterWatchlist,
  history: getFilterHistory,
  favorites: getFilterFavorites,
};

const generateFilter = (cards) => {
  const filterKeys = Object.keys(filterCount);

  const getFilteredCardCount = (title, index) => {
    const filterKey = filterKeys[index];

    return {
      key: filterKey,
      count: filterCount[filterKey](cards).length,
      title,
    };
  };

  return FILTER_TITLES.map(getFilteredCardCount);
};

export {
  generateFilter,
  getFilterByRating,
  getFilterByComments
};
