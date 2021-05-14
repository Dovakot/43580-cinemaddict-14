import AbstractView from 'view/abstract-view';

import {
  RenderPosition
} from 'const';

const render = (container, element, place = RenderPosition.BEFOREEND) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  container[place](element);
};

const createElement = (string) => {
  const range = document.createRange();
  const documentFragment = range.createContextualFragment(string);

  return documentFragment.firstElementChild;
};

const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  if (!oldChild || !newChild) {
    throw new Error('Can\'t replace unexisting elements');
  }

  oldChild.replaceWith(newChild);
};

export {
  render,
  createElement,
  remove,
  replace
};
