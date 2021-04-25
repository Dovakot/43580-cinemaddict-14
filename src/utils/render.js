import Abstract from 'view/abstract';

import {
  RenderPosition
} from 'const';

const render = (container, element, place = RenderPosition.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
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
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

export {
  render,
  createElement,
  remove
};
