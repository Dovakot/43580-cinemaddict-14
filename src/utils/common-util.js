const SHAKE_ANIMATION_TIMEOUT = 600;

const truncateText = (text, amount) => text.length > amount
  ? `${text.substring(0, amount - 1)}...` : text;

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const isSubmit = (evt) => evt.key === 'Enter' && (evt.metaKey || evt.ctrlKey);

const reportError = (element) => {
  element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

  setTimeout(() => {
    element.style.animation = '';
  }, SHAKE_ANIMATION_TIMEOUT);
};

export {
  truncateText,
  isEscEvent,
  isSubmit,
  reportError
};
