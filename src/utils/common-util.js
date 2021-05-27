const truncateText = (text, amount) => text.length > amount
  ? `${text.substring(0, amount - 1)}...` : text;

const sortObject = (object) => Object.fromEntries(
  Object.entries(object).sort((a, b) => b[1] - a[1]),
);

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const isSubmit = (evt) => evt.key === 'Enter' && (evt.metaKey || evt.ctrlKey);

export {
  truncateText,
  sortObject,
  isEscEvent,
  isSubmit
};
