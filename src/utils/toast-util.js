import {
  SHOW_TIME
} from 'const';

import {
  createElement,
  render
} from 'utils/render-util';

const toastContainer = createElement('<div class="toast"></div>');
render(document.body, toastContainer);

const toast = (message) => {
  const toastItem = createElement(`<div class="toast__item">${message}</div>`);
  render(toastContainer, toastItem);

  setTimeout(() => toastItem.remove(), SHOW_TIME);
};

export default toast;
