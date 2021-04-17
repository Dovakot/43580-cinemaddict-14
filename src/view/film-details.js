import {
  getTimeFromMinutes,
  getFormattedDate,
  getFormattedDateTime,
  createElement
} from 'utils';

const getCommentsItem = ({date, author, text, emotion}) => (
  `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">
          ${getFormattedDateTime(date)}
        </span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
);

const getComments = (commentIds, comments) => (
  `<ul class="film-details__comments-list">
    ${commentIds.map((id) => getCommentsItem(comments[id])).join('')}
  </ul>`
);

const isActive = (flag) => flag ? 'checked' : '';

const createFilmDetailsTemplate = (card, comments) => {
  const {
    title,
    poster,
    description,
    rating,
    ageRating,
    runtime,
    director,
    writers,
    actors,
    genres,
    release: {
      date,
      country,
    },
  } = card.filmInfo;

  const {
    isWatchlist,
    isWatched,
    isFavorite,
  } = card.userDetails;

  const commentIds = [...card.comments];
  const commentCount = commentIds.length;

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  ${writers.size === 1 ? 'Writer' : 'Writers'}
                </td>
                <td class="film-details__cell">
                  ${[...writers].join(', ')}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  ${actors.size === 1 ? 'Actor' : 'Actors'}
                </td>
                <td class="film-details__cell">
                  ${[...actors].join(', ')}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">
                  ${getFormattedDate(date)}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">
                  ${getTimeFromMinutes(runtime)}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  ${genres.size === 1 ? 'Genre' : 'Genres'}
                </td>
                <td class="film-details__cell">
                  ${[...genres].map((genre) => `<span class="film-details__genre">${genre}</span>`).join(' ')}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">${description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isActive(isWatchlist)}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isActive(isWatched)}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isActive(isFavorite)}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">
            ${commentCount === 1 ? 'Comment' : 'Comments'}
            <span class="film-details__comments-count">${commentCount}</span>
          </h3>

          ${commentCount > 0 ? getComments(commentIds, comments) : ''}

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

class FilmDetails {
  constructor(card, comments) {
    this._card = card;
    this._comments = comments;
    this._element = null;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._card, this._comments);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default FilmDetails;
