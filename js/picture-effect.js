import { imgPreviewElement } from './form.js';

const DEFAULT_VALUE = 'none';

const EFFECTS = {
  chrome: {
    values: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filter: 'grayscale',
    unit: '',
  },
  sepia: {
    values: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filter: 'sepia',
    unit: '',
  },
  marvin: {
    values: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    values: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    values: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    filter: 'brightness',
    unit: '',
  },
};
const sliderElement = document.querySelector('.effect-level__slider');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const checkedElement = document.querySelector('#effect-none');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 0,
  },
  start: 0,
  step: 0,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  },
  connect: 'lower',
});

const useDefaultEffect = () => {
  imgPreviewElement.className = '';
  imgPreviewElement.style = '';
  effectLevelValueElement.value = '';
  sliderElement.classList.add('hidden');
  checkedElement.checked = true;
};


const onStepRangeCreate = (targetElement) => {
  sliderElement.noUiSlider.on('update', () => {
    const filter = EFFECTS[targetElement].filter;
    const unit = EFFECTS[targetElement].unit;

    if (targetElement !== DEFAULT_VALUE) {
      const sliderValue = sliderElement.noUiSlider.get();
      imgPreviewElement.style.filter = `${filter}(${sliderValue}${unit})`;
      effectLevelValueElement.value = sliderValue;
    }
  });
};

const onFilterChange = (evt) => {
  const targetElement = evt.target.value;
  sliderElement.classList.add('hidden');
  imgPreviewElement.className = '';
  imgPreviewElement.style.filter = '';

  if (targetElement !== DEFAULT_VALUE) {
    sliderElement.classList.remove('hidden');
    imgPreviewElement.classList.add(`effects__preview--${targetElement}`);
    sliderElement.noUiSlider.updateOptions(EFFECTS[targetElement].values);
    onStepRangeCreate(targetElement);
  }
};

const activateEffects = () => {
  useDefaultEffect();
  effectsListElement.addEventListener('change', onFilterChange);
};

export {activateEffects};
