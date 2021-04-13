const getSortByRating = (cards) => cards.sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);

const getSortByComments = (cards) => cards.sort((a, b) => b.comments.size - a.comments.size);

export {
  getSortByRating,
  getSortByComments
};
