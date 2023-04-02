import { isEscapeKey} from './util.js';

const pictureErrorElement = document.querySelector('#error').content.querySelector('.error');
const errorContent = pictureErrorElement.cloneNode(true);
const pictureSuccessElement = document.querySelector('#success').content.querySelector('.success');
const successContent = pictureSuccessElement.cloneNode(true);

const popupDataError = (message) => {
  const fragment = document.createDocumentFragment();
  const innerElement = errorContent.querySelector('.error__inner');

  innerElement.innerHTML = '';
  const element = document.createElement('p');
  element.classList.add('error__title');
  element.textContent = message;
  element.style.lineHeight = 1;
  innerElement.append(element);
  fragment.append(errorContent);

  return fragment;
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const onPopupCloseClick = (evt) => {
  if (evt.target.className === 'error' || evt.target.className === 'error__button' || evt.target.className === 'success' || evt.target.className === 'success__button') {
    evt.preventDefault();
    closePopup();
  }
};

const createPopup = (popup) => {
  document.body.append(popup);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupCloseClick);
};

function closePopup () {
  if (errorContent) {
    errorContent.remove();
  }
  if (successContent) {
    successContent.remove();
  }

  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupCloseClick);
}

const dataErrorPopup = (message) => createPopup(popupDataError(message));
const uploadErrorPopup = () => createPopup(errorContent);
const uploadSuccessPopup = () => createPopup(successContent);

export {dataErrorPopup, uploadErrorPopup, uploadSuccessPopup};
