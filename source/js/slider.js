const sliderButton = document.querySelector('.slider__button');
const sliderImageContainer = document.querySelector('.slider__image');
const sliderImageBefore = document.querySelector('.slider__image--before');
const sliderImageAfter = document.querySelector('.slider__image--after');
const sliderButtonMark = document.querySelector('.slider__button-mark');
const sliderButtonRange = document.querySelector('.slider__button-range');
const imageCatBefore = document.querySelector('.slider__image-wrapper--before');
const imageCatAfter = document.querySelector('.slider__image-wrapper--after');

const IMAGE_CONTAINER_WIDTH = imageCatBefore.clientWidth; // image container width = 591px

const TABLET_WIDTH = 768;

if (window.screen.width >= TABLET_WIDTH) {
  imageCatBefore.style.width = IMAGE_CONTAINER_WIDTH / 2 + 'px';
  imageCatAfter.style.width = IMAGE_CONTAINER_WIDTH / 2 + 'px';
}

onSliderButtonClick = () => {
  sliderButtonMark.classList.toggle('slider__button-mark--active');
  sliderImageBefore.classList.toggle('slider__image--active');
  sliderImageAfter.classList.toggle('slider__image--active');
};

sliderButton.addEventListener('click', onSliderButtonClick);

sliderButtonRange.addEventListener('input', (evt) => {
  if (evt.target.value >= 50) {
    imageCatBefore.style.width = `${evt.target.value}` + '%';
    imageCatAfter.style.width = `${100 - +evt.target.value}` + '%';
  }
  imageCatAfter.style.width = `${100 - +evt.target.value}` + '%';
  imageCatBefore.style.width = `${evt.target.value}` + '%';
});
