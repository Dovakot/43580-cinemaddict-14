import AbstractView from '../abstract-view';

const disableField = (flag) => flag ? 'disabled' : '';

const createCommentsTemplate = (isLoading) => (
  `<section class="film-details__comments-wrap">
    <div class="film-details__new-comment">
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${disableField(isLoading)}></textarea>
      </label>
    </div>
  </section>`
);

class CommentsView extends AbstractView {
  constructor(isLoading) {
    super();
    this._isLoading = isLoading;
  }

  getTemplate() {
    return createCommentsTemplate(this._isLoading);
  }
}

export default CommentsView;
