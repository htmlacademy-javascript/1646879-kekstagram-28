import { openModal, onPopupCloseButton } from './modal.js';

const LIMIT = 5;
const MAX_LENGTH = 5;
const MIN_LENGTH = 1;

const bigPictureElement = document.querySelector('.big-picture');
const bigImgElement = document.querySelector('.big-picture__img img');
const captionImgElement = document.querySelector('.social__caption');
const likesImgElement = document.querySelector('.likes-count');
const commentsListElement = document.querySelector('.social__comments');
const commentItemElement = document.querySelector('.social__comment').cloneNode(true);
const commentCountElement = document.querySelector('.social__comment-count');
const commentsButtonElement = document.querySelector('.comments-loader');

let startIndex = 0;
let value = 0;
let photoComments;

const createCommentItem = (comments) => {
  comments.forEach(({avatar, name, message}) => {
    const commentItem = commentItemElement.cloneNode(true);

    commentItem.querySelector('.social__picture').src = avatar;
    commentItem.querySelector('.social__picture').alt = name;
    commentItem.querySelector('.social__text').textContent = message;

    commentsListElement.append(commentItem);
  });
};

const createLoadComments = () => {
  startIndex = value * LIMIT;
  const endIndex = startIndex + LIMIT;

  const commentsVisible = photoComments.slice(startIndex, endIndex);

  createCommentItem(commentsVisible);
  commentCountElement.textContent = `показанo ${commentsVisible.length} из ${photoComments.length} комментариев`;

  if (endIndex > MAX_LENGTH && endIndex < photoComments.length) {
    commentCountElement.textContent = `показанo ${endIndex} из ${photoComments.length} комментариев`;
  } else
  if (endIndex >= photoComments.length) {
    commentsButtonElement.classList.add('hidden');
    commentCountElement.textContent = 'все комментарии показаны';
  }

  value++;
};

const createFillPicture = ({url, description, comments, likes}) => {
  bigImgElement.src = url;
  bigImgElement.alt = description;
  captionImgElement.textContent = description;
  likesImgElement.textContent = likes;
  photoComments = comments;

  commentsButtonElement.classList.add('hidden');

  commentsListElement.innerHTML = '';

  if (comments.length > MAX_LENGTH) {
    commentsButtonElement.classList.remove('hidden');
    createLoadComments();
    commentsButtonElement.addEventListener('click', createLoadComments);
  } else {
    if (comments.length === MIN_LENGTH) {
      commentCountElement.textContent = `показан ${comments.length} комментарий`;
    } else
    if (MIN_LENGTH < comments.length < MAX_LENGTH) {
      commentCountElement.textContent = `показано ${comments.length} комментария`;
    } else
    if (comments.length === MAX_LENGTH) {
      commentCountElement.textContent = `показанo ${comments.length} комментариев`;
    }
    createCommentItem(comments);
  }
};

const showBigPicture = ({url, description, comments, likes}) => {
  bigPictureElement.classList.remove('hidden');
  openModal();
  value = 0;
  createFillPicture({url, description, comments, likes});

  onPopupCloseButton(bigPictureElement);
};

export {showBigPicture, commentsButtonElement, bigPictureElement};
