import {openModal, closeModal, onPopupCloseButton} from './modal.js';
import {uploadSuccessPopup, uploadErrorPopup} from './popup.js';
import {activateEffects} from './picture-effect.js';
import {useDefaultScale} from './picture-scale.js';
import {sendData} from './api.js';

const MAX_TEXT_LENGTH = 140;
const MIN_HASHTAGS_LENGTH = 5;
const IMG_TYPES = ['jpg', 'png', 'jpeg', 'gif'];

const uploadImgElement = document.querySelector('.img-upload__overlay');
const uploadFileElement = document.querySelector('#upload-file');
const submitButtonElement = document.querySelector('#upload-submit');
const imgPreviewElement = document.querySelector('.img-upload__preview img');
const formElement = document.querySelector('.img-upload__form');
const hashtagsElement = document.querySelector('[name="hashtags"]');
const descriptionElement = document.querySelector('[name="description"]');
const re = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;
const messageElement = document.querySelector('#messages').content.querySelector('.img-upload__message').cloneNode(true);

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'error__field-wrapper'
});

const hashtags = (value) => value.toLowerCase().split(' ');

const descriptionValidate = (value) => value.length <= MAX_TEXT_LENGTH;

pristine.addValidator(hashtagsElement, (value) => hashtags(value).length <= MIN_HASHTAGS_LENGTH, 'Нельзя указать больше пяти хэш-тегов');
pristine.addValidator(hashtagsElement, (value) => value === '' || hashtags(value).every((elem) => re.test(elem)), 'Хэш-тег начинается с символа # и не может состоять только из одной решётки.\n Хэш-тег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.\n Максимальная длина одного хэш-тега 20 символов, включая решётку.');
pristine.addValidator(hashtagsElement, (value) => hashtags(value).length === new Set(hashtags(value)).size, 'Хэш-теги нечувствительны к регистру. Один и тот же хэш-тег не может быть использован дважды.');
pristine.addValidator(descriptionElement, descriptionValidate, 'Максимальная длина сообщения 140 символов');

const deleteFormData = () => {
  uploadFileElement.value = '';
  hashtagsElement.value = '';
  descriptionElement.value = '';
  document.querySelectorAll('.error__field-wrapper').forEach((element) => {
    if (element.textContent.length > 0) {
      element.textContent = '';
    }
  });
};

const onUserFormOpen = () => {
  uploadFileElement.addEventListener('change', () => {
    const file = uploadFileElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = IMG_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      imgPreviewElement.src = URL.createObjectURL(file);
      uploadImgElement.classList.remove('hidden');
      activateEffects();
      useDefaultScale();
      openModal();
    }
    onPopupCloseButton();
  });
};

onUserFormOpen();

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  document.body.append(messageElement);
};

const unBlockSubmitButton = () => {
  submitButtonElement.disabled = false;
  messageElement.remove();
};

const setUserFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          unBlockSubmitButton();
          closeModal();
          uploadSuccessPopup();
        },
        new FormData(evt.target),
        () => {
          unBlockSubmitButton();
          uploadErrorPopup();
        }
      );
    }
  });
};

export {setUserFormSubmit, deleteFormData, imgPreviewElement, uploadImgElement};
