import AbstractView from '../abstract-view';

const getEmoji = (emotion) => (
  `<img src="images/emoji/${emotion}.png" alt="emoji-smile" width="55" height="55">`
);

const createCommentEmojiLabelTemplate = (emotion) => (
  `<div class="film-details__add-emoji-label">
    ${emotion ? getEmoji(emotion) : ''}
  </div>`
);

class CommentEmojiLabelView extends AbstractView {
  constructor(emotion) {
    super();
    this._emotion = emotion;
  }

  getTemplate() {
    return createCommentEmojiLabelTemplate(this._emotion);
  }
}

export default CommentEmojiLabelView;
