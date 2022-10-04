const menuButton = document.querySelector('.main-header__button');
const naviBar = document.querySelector('.main-header__navigation');
const sliderButtons = document.querySelectorAll('.slider__button');
const sliderImageBefore = document.querySelector('.slider__image--before');
const sliderImageAfter = document.querySelector('.slider__image--after');
const sliderButtonAfter = document.querySelector('.slider__button--after');
const sliderButtonBefore = document.querySelector('.slider__button--before')


menuButton.addEventListener('click', () => {
  naviBar.classList.toggle('main-nav--opened')
})

onSliderButtonClick = () => {
  sliderButtonAfter.classList.toggle('slider__button--active');
  sliderButtonBefore.classList.toggle('slider__button--active');
  sliderImageBefore.classList.toggle('slider__image--active');
  sliderImageAfter.classList.toggle('slider__image--active');
}

sliderButtons.forEach((item) => {
  item.addEventListener('click', onSliderButtonClick);
});
