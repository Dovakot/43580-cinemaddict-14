const FILTERS_TITLES = [
  'Watchlist',
  'History',
  'Favorites',
];

const getFilterWatchlist = (cards) => {
  return cards.filter((card) => card.userDetails.isWatchlist);
};

const getFilterHistory = (cards) => {
  return cards.filter((card) => card.userDetails.isWatched);
};

const getFilterFavorites = (cards) => {
  return cards.filter((card) => card.userDetails.isFavorite);
};

const getFilterByRating = (cards) => {
  return cards.filter((card) => card.filmInfo.rating !== 0);
};

const getFilterByComments = (cards) => {
  return cards.filter((card) => card.comments.size !== 0);
};

const filterCount = {
  watchlist: getFilterWatchlist,
  history: getFilterHistory,
  favorites: getFilterFavorites,
};

const generateFilters = (cards) => {
  const filtersKeys = Object.keys(filterCount);

  return FILTERS_TITLES.map((title, index) => {
    const filterKey = filtersKeys[index];

    return {
      key: filterKey,
      count: filterCount[filterKey](cards).length,
      title,
    };
  });
};

export {
  generateFilters,
  getFilterByRating,
  getFilterByComments
};
