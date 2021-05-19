import AbstractView from '../abstract-view';

const createCommentsTemplate = () => (
  `<section class="film-details__comments-wrap">
    <div class="film-details__new-comment">
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>
    </div>
  </section>`
);

class CommentsView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createCommentsTemplate();
  }
}

export default CommentsView;
