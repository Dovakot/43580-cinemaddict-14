const FILTERS_TITLES = [
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

const generateFilters = (cards) => {
  const filtersKeys = Object.keys(filterCount);

  const getFilteredCardCount = (title, index) => {
    const filterKey = filtersKeys[index];

    return {
      key: filterKey,
      count: filterCount[filterKey](cards).length,
      title,
    };
  };

  return FILTERS_TITLES.map(getFilteredCardCount);
};

export {
  generateFilters,
  getFilterByRating,
  getFilterByComments
};
