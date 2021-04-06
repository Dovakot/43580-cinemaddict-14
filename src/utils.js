const Position = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const getElement = (string) => {
  const range = document.createRange();
  const documentFragment = range.createContextualFragment(string);

  return documentFragment.firstElementChild;
};

const replaceElement = (element, newElement) => {
  element.replaceWith(newElement);

  return newElement;
};

const render = (container, element, place = Position.BEFOREEND) => {
  if (typeof element === 'string') {
    container.insertAdjacentHTML(place, element);
  } else {
    container.insertAdjacentElement(place, element);
  }
};

export {
  Position,
  getElement,
  render,
  replaceElement
};
