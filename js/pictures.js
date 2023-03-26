import { showBigPicture } from './big-picture.js';
import { debounce } from './util.js';

const picturesSectionElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();
const filterElement = document.querySelector('.img-filters');
const buttonsFilterElement = document.querySelectorAll('.img-filters__button');


const getFilter = () => {
  filterElement.classList.remove('img-filters--inactive');
};

const renderPictures = (array) => {
  array
    .forEach(({url, description, comments, likes}) => {
      const pictureElement = pictureTemplateElement.cloneNode(true);

      pictureElement.querySelector('.picture__img').src = url;
      pictureElement.querySelector('.picture__img').alt = description;
      pictureElement.querySelector('.picture__comments').textContent = comments.length;
      pictureElement.querySelector('.picture__likes').textContent = likes;


      pictureFragment.append(pictureElement);
      pictureElement.addEventListener('click', () => {
        showBigPicture({url, description, comments, likes});
      });
    });

  picturesSectionElement.append(pictureFragment);
};

const sortComments = (a, b) => b.comments.length - a.comments.length;

const sortRandom = () => Math.floor(0.5 - Math.random());


const onPicturesFilters = (data, cb) => {
  filterElement.addEventListener('click', debounce((evt) => {
    const targetElement = evt.target;
    if (targetElement.tagName === 'BUTTON') {
      buttonsFilterElement.forEach((button) => {
        button.classList.remove('img-filters__button--active');
      });
      targetElement.classList.add('img-filters__button--active');
      Array.from(document.querySelectorAll('.picture')).forEach((element) => element.remove());
      const filters = {
        'filter-default': () => cb(data),
        'filter-random': () => cb(data
          .slice()
          .sort(sortRandom)
          .slice(0, 10)),
        'filter-discussed': () => cb(data
          .slice()
          .sort(sortComments)),
      };
      filters[targetElement.id]();
    }
  }));
};

export {renderPictures, getFilter, onPicturesFilters};


