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

const getFilteredCardCount = (cards) => (key, index) => ({
  key,
  count: filterCount[key](cards).length,
  title: FILTER_TITLES[index],
});

const generateFilter = (cards) => Object.keys(filterCount)
  .map(getFilteredCardCount(cards));

export {
  generateFilter,
  getFilterByRating,
  getFilterByComments
};
