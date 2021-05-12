const FILTER_TITLES = [
  'Watchlist',
  'History',
  'Favorites',
];

const getFilterWatchlist = (films) => films.filter((film) => film.userDetails.isWatchlist);

const getFilterHistory = (films) => films.filter((film) => film.userDetails.isWatched);

const getFilterFavorites = (films) => films.filter((film) => film.userDetails.isFavorite);

const filterCount = {
  watchlist: getFilterWatchlist,
  history: getFilterHistory,
  favorites: getFilterFavorites,
};

const getFilteredFilmCount = (films) => (key, index) => ({
  key,
  count: filterCount[key](films).length,
  title: FILTER_TITLES[index],
});

const generateFilter = (films) => Object.keys(filterCount)
  .map(getFilteredFilmCount(films));

export {
  generateFilter
};
