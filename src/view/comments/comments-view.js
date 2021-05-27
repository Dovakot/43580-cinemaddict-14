import AbstractView from '../abstract-view';

const createCommentsTemplate = () => (
  '<section class="film-details__comments-wrap"></section>'
);

class CommentsView extends AbstractView {
  getTemplate() {
    return createCommentsTemplate();
  }
}

export default CommentsView;
