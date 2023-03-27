import './big-picture.js';
import './picture-effect.js';
import {renderPictures, onPicturesFilters} from './pictures.js';
import {setUserFormSubmit} from './form.js';
import {getData} from './api.js';
import {dataErrorPopup} from './popup.js';


getData((pictures) => {
  renderPictures(pictures);
  onPicturesFilters(pictures, (data) => renderPictures(data));
}, dataErrorPopup);
setUserFormSubmit();

