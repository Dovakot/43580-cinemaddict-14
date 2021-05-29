import {
  isSubmit,
  reportError
} from 'utils/common-util';

import AbstractView from '../abstract-view';

const createCommentFormTemplate = () => (
  `<fieldset class="film-details__new-comment">
    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>
  </fieldset>`
);

class CommentFormView extends AbstractView {
  constructor() {
    super();
    this._keyHandler = this._keyHandler.bind(this);
  }

  getTemplate() {
    return createCommentFormTemplate();
  }

  disableForm() {
    this.getElement().disabled = true;
  }

  enableForm() {
    this.getElement().disabled = false;
  }

  shake() {
    const form = this.getElement();

    form.disabled = false;
    reportError(form);
  }

  setKeyHandler(callback) {
    this._callback.fieldKeyDown = callback;

    this.getElement().querySelector('.film-details__comment-input')
      .addEventListener('keydown', this._keyHandler);
  }

  _keyHandler(evt) {
    return isSubmit(evt) ? this._callback.fieldKeyDown(evt) : false;
  }
}

export default CommentFormView;
