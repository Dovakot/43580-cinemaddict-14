import AbstractView from '../abstract-view';

const disableField = (flag) => flag ? 'disabled' : '';

const createCommentEmojiListTemplate = (isLoading) => (
  `<div class="film-details__emoji-list">
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${disableField(isLoading)}>
    <label class="film-details__emoji-label" for="emoji-smile">
      <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${disableField(isLoading)}>
    <label class="film-details__emoji-label" for="emoji-sleeping">
      <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${disableField(isLoading)}>
    <label class="film-details__emoji-label" for="emoji-puke">
      <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${disableField(isLoading)}>
    <label class="film-details__emoji-label" for="emoji-angry">
      <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
    </label>
  </div>`
);

class CommentEmojiListView extends AbstractView {
  constructor(isLoading) {
    super();
    this._isLoading = isLoading;
  }

  getTemplate() {
    return createCommentEmojiListTemplate(this._isLoading);
  }
}

export default CommentEmojiListView;
