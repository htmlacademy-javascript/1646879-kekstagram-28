import { getFilter } from './pictures.js';

const API_URL = 'https://28.javascript.pages.academy/kekstagram';
const ERROR_TEXT = 'Нет связи с сервером';

const getData = (onSuccess, onError) => {
  fetch(`${API_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      onError(`${ERROR_TEXT}`);
    })
    .then((response) => response.json())
    .then((pictures) => {
      getFilter();
      onSuccess(pictures);
    })
    .catch(() => onError(`${ERROR_TEXT}`));
};

const sendData = (onSuccess, formData, onError) => {
  fetch(API_URL,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => onError());
};

export {getData, sendData};
