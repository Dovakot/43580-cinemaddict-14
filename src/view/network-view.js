import {
  SHOW_TIME
} from 'const';

import {
  render,
  remove
} from 'utils/render-util';

import AbstractView from './abstract-view';

const createNetworkTemplate = () => '<div class="network">You are offline</div>';

class NetworkView extends AbstractView {
  constructor() {
    super();
    this._timeout = null;
  }

  getTemplate() {
    return createNetworkTemplate();
  }

  show() {
    clearTimeout(this._timeout);

    remove(this);
    render(document.body, this);
  }

  hide() {
    const network = this.getElement();

    network.textContent = 'You are online';
    network.classList.add('network--online');

    this._timeout = setTimeout(() => remove(this), SHOW_TIME);
  }
}

export default NetworkView;
