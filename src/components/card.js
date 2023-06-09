import {popupOpen} from './modal';

// Массив карточек
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

///////////////////////////////////////////////////////////////////////
// Формируем блок карточек из массива
const cardTemplate = document.querySelector('#card-template').content;
const cards = document.querySelector('.cards');
const cardOpened = document.querySelector('.popup_card');
const cardPopupImage = document.querySelector('.popup__image_card');
const cardPopupClose = document.querySelector('.popup__close_card');
const cardPopupTitle = document.querySelector('.popup__title_card');

// Функция формирования карточек из массива initialCards
function creatingCard(cardObj) {
    const cardCreation = cardTemplate.querySelector('.card').cloneNode('true');
    const cardImage = cardCreation.querySelector('.card__image');
    const cardTitle = cardCreation.querySelector('.card__title');
    const cardTrash = cardCreation.querySelector('.card__trash');
    const cardButtonLike = cardCreation.querySelector('.card__button-like');

    // Исходные данные
    cardTitle.textContent = cardObj.name;
    cardImage.setAttribute('src', cardObj.link);
    cardImage.setAttribute('alt', cardObj.name);

    // Добавляем карточку в разметку
    cards.prepend(cardCreation);

    // Событие нажатия на лайк
    cardButtonLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__button-like_active')
    })

    // Событие нажатия на картинку для появления всплывающей карточки
    cardImage.addEventListener('click', function () {

        cardPopupImage.setAttribute('src', cardImage.getAttribute('src'));
        cardPopupImage.setAttribute('alt', cardImage.getAttribute('alt'));
        cardPopupTitle.textContent = cardTitle.textContent;

        popupOpen(cardOpened);
    })

    // Событие удаления карточки
    cardTrash.addEventListener('click', function () {
        cardCreation.remove();
    })
}

export {creatingCard, initialCards, cardPopupClose, cardOpened}