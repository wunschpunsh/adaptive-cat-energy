'use strict';

const cardMore = document.querySelector('.card-more');
const card = document.querySelector('.card');
const showMoreButton = document.querySelector('.card-more__button');

const MAX_CARD_RENDER = 5;

const getCards = () => {
  for (let i = 0; i < MAX_CARD_RENDER; i++) {
    const newCard = card.cloneNode(true);
    cardMore.insertAdjacentElement('beforebegin', newCard);
  }
  cardMore.style.display = 'none';
  showMoreButton.removeEventListener('click', getCards);
};

showMoreButton.addEventListener('click', getCards);
