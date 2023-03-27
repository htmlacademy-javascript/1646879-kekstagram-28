import {imgPreviewElement} from './form.js';

const STEP_SCALE = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const VALUE = 100;

const controlSmallerElement = document.querySelector('.scale__control--smaller');
const controlBiggerElement = document.querySelector('.scale__control--bigger');
const controlValueElement = document.querySelector('.scale__control--value');

let scale;

const useDefaultScale = () => {
  scale = 100;
  controlValueElement.value = `${MAX_SCALE}%`;
  controlBiggerElement.disabled = true;
  imgPreviewElement.style.transform = '';
  controlBiggerElement.style. backgroundColor = 'rgba(0, 0, 0, 0.3)';
};

controlSmallerElement.addEventListener('click', () => {
  scale -= STEP_SCALE;
  controlValueElement.value = `${scale}%`;
  controlBiggerElement.disabled = false;
  controlBiggerElement.style. backgroundColor = 'rgba(0, 0, 0, 0.6)';
  imgPreviewElement.style.transform = `scale(${scale / VALUE})`;

  if (controlValueElement.value === `${MIN_SCALE}%`) {
    controlSmallerElement.disabled = true;
    controlSmallerElement.style. backgroundColor = 'rgba(0, 0, 0, 0.3)';
  }
});

controlBiggerElement.addEventListener('click', () => {
  scale += STEP_SCALE;
  controlValueElement.value = `${scale}%`;
  controlSmallerElement.disabled = false;
  controlSmallerElement.style. backgroundColor = 'rgba(0, 0, 0, 0.6)';
  imgPreviewElement.style.transform = `scale(${scale / VALUE})`;

  if (controlValueElement.value === `${MAX_SCALE}%`) {
    useDefaultScale();
  }
});

export {useDefaultScale};
