const menuButton = document.querySelector('.main-header__button');
const naviBar = document.querySelector('.main-header__navigation')
menuButton.addEventListener('click', () => {
  naviBar.classList.toggle('main-nav--opened')
})