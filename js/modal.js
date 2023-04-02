import { isEscapeKey} from './util.js';
import { bigPictureElement} from './big-picture.js';
import { deleteFormData, uploadImgElement } from './form.js';

const closeButtons = document.querySelectorAll('.cancel');

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !document.activeElement.classList.contains('focusable') && document.querySelector('.error') === null) {
    evt.preventDefault();
    closeModal();
  }
};

const onPopupCloseButton = () => {
  closeButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      closeModal();
    });
  });
};

const openModal = () => {
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
};

function closeModal() {
  if (bigPictureElement) {
    bigPictureElement.classList.add('hidden');
  }
  if (uploadImgElement) {
    uploadImgElement.classList.add('hidden');
    deleteFormData();
  }
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
}

export {openModal, closeModal, onPopupCloseButton};
