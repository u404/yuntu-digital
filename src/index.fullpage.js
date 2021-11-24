import './styles/index.fullpage.scss';

import 'fullpage.js/vendors/scrolloverflow';

import Fullpage from 'fullpage.js';

const fullpage = new Fullpage('#app', {
  // options here
  licenseKey: '123',
  autoScrolling: true,
  scrollHorizontally: true,
  scrollOverflow: true,
  dragAndMove: true,
  scrollOverflowOptions: {
    scrollbars: false,
  },
});
console.log(fullpage);

document.querySelector('.top-bar').addEventListener('click', () => {
  fullpage.moveTo(1);
});
