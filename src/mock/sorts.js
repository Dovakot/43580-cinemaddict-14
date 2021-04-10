const getSortByRating = (cards) => {
  return cards.sort((a, b) => b.filmInfo.rating - a.filmInfo.rating);
};

const getSortByComments = (cards) => {
  return cards.sort((a, b) => b.comments.size - a.comments.size);
};

export {
  getSortByRating,
  getSortByComments
};
