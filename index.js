"use strict"

// Редактирования профиля

const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

function popupEditOpenClose() {
    const popupCreation = popupTemplate.querySelector('.popup').cloneNode('true');
    const popupClose = popupCreation.querySelector('.popup__close');
    const popupTitle = popupCreation.querySelector('.popup__title');
    const popupInputName = popupCreation.querySelector('.popup__input_type_name');
    const popupInputText = popupCreation.querySelector('.popup__input_type_text');
    const popupSave = popupCreation.querySelector('.popup__save');
    popupCreation.classList.toggle('popup_opened');
    popupTitle.textContent = 'Редактировать профиль';
    popupInputName.setAttribute('placeholder', 'Введите имя');
    popupInputText.setAttribute('placeholder', 'Введите описание профиля');
    popupInputName.value = profileName.textContent;
    popupInputText.value = profileText.textContent;
    popupSave.textContent = 'Сохранить';

    popupSave.addEventListener('click', function (evt) {
        evt.preventDefault();

        profileName.textContent = popupInputName.value;
        profileText.textContent = popupInputText.value;

        if (popupCreation.classList.contains('popup_opened')) {
            popupCreation.classList.toggle('popup_opened');
            popupCreation.classList.toggle('popup_closed')
        } else if (cardOpened.classList.contains('popup_closed')) {
            popupCreation.classList.toggle('popup_opened');
            popupCreation.classList.toggle('popup_closed')
        } else if (!cardOpened.classList.contains('popup_closed') && !cardOpened.classList.contains('popup_opened')) {
            cardOpened.classList.toggle('card__popup_opened');
        }
    });

    popupClose.addEventListener('click', function () {
        if (popupCreation.classList.contains('popup_opened')) {
            popupCreation.classList.toggle('popup_opened');
            popupCreation.classList.toggle('popup_closed')
        } else if (cardOpened.classList.contains('popup_closed')) {
            popupCreation.classList.toggle('popup_opened');
            popupCreation.classList.toggle('popup_closed')
        } else if (!cardOpened.classList.contains('popup_closed') && !cardOpened.classList.contains('popup_opened')) {
            cardOpened.classList.toggle('card__popup_opened');
        }
    })

    page.append(popupCreation)
}

profileButtonEdit.addEventListener('click', popupEditOpenClose);

// Добавление карточки

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

// Функция формирования карточек из массива
const cardTemplate = document.querySelector('#card-template').content;
const cards = document.querySelector('.cards');
const cardOpened = document.querySelector('.card__popup');
const cardPopupImage = document.querySelector('.card__popup-image');
const cardPopupClose = document.querySelector('.card__popup-close');
const cardPopupDescription = document.querySelector('.card__popup-description');


function fillCards() {
    for (let i = 0; i < initialCards.length; i++) {
        const cardCreation = cardTemplate.querySelector('.card').cloneNode('true');
        const cardImage = cardCreation.querySelector('.card__image');
        const cardTitle = cardCreation.querySelector('.card__title');
        const cardTrash = cardCreation.querySelector('.card__trash');

        cardTitle.textContent = initialCards[i].name;
        cardImage.setAttribute('src', initialCards[i].link);
        cardImage.setAttribute('alt', initialCards[i].name);
        const cardButtonLike = cardCreation.querySelector('.card__button-like');
        cardButtonLike.addEventListener('click', function (evt) {
            evt.target.classList.toggle('card__button-like_active')
        })

        cardImage.addEventListener('click', function () {
            if (cardOpened.classList.contains('card__popup_opened')) {
                cardOpened.classList.toggle('card__popup_hidden')
                cardOpened.classList.toggle('card__popup_opened');
            } else if (cardOpened.classList.contains('card__popup_hidden')) {
                cardOpened.classList.toggle('card__popup_opened');
                cardOpened.classList.toggle('card__popup_hidden')
            } else if (!cardOpened.classList.contains('card__popup_hidden') && !cardOpened.classList.contains('card__popup_opened')) {
                cardOpened.classList.toggle('card__popup_opened');
            }
            cardPopupImage.setAttribute('src', cardImage.getAttribute('src'));
            cardPopupDescription.textContent = cardTitle.textContent;
        })
        cards.append(cardCreation);

        cardTrash.addEventListener('click', function () {
            cardCreation.remove();
        })
    }
}

cardPopupClose.addEventListener('click', function () {
    cardOpened.classList.toggle('card__popup_opened');
    cardOpened.classList.toggle('card__popup_hidden')
})

fillCards() // Формируем карточки


// Добавление новой карточки в массив
const profileButtonAdd = document.querySelector('.profile__button-add');
const popupTemplate = document.querySelector('#popup-template').content;
const page = document.querySelector('.page');

function popupAddOpenClose() {
    const popupCreation = popupTemplate.querySelector('.popup').cloneNode('true');
    const popupClose = popupCreation.querySelector('.popup__close');
    const popupTitle = popupCreation.querySelector('.popup__title');
    const popupInputName = popupCreation.querySelector('.popup__input_type_name');
    const popupInputText = popupCreation.querySelector('.popup__input_type_text');
    const popupSave = popupCreation.querySelector('.popup__save');
    popupCreation.classList.toggle('popup_opened');
    popupTitle.textContent = 'Новое место';
    popupInputName.setAttribute('placeholder', 'Название');
    popupInputText.setAttribute('placeholder', 'Ссылку на картинку');
    popupInputName.value = '';
    popupInputText.value = '';
    popupSave.textContent = 'Создать';

    // Создание события клика на "Создать" - создается новая карточка
    popupSave.addEventListener('click', function (evt) {
        evt.preventDefault();

        initialCards.unshift({
            'name': popupInputName.value,
            'link': popupInputText.value
        });

        const cardCreation = cardTemplate.querySelector('.card').cloneNode('true');
        const cardImage = cardCreation.querySelector('.card__image');
        const cardTitle = cardCreation.querySelector('.card__title');
        const cardTrash = cardCreation.querySelector('.card__trash');

        cardTitle.textContent = initialCards[0].name;
        cardImage.setAttribute('src', initialCards[0].link);
        cardImage.setAttribute('alt', initialCards[0].name);
        const cardButtonLike = cardCreation.querySelector('.card__button-like');

        cardButtonLike.addEventListener('click', function (evt) {
            evt.target.classList.toggle('card__button-like_active')
        })

        cardImage.addEventListener('click', function () {
            if (cardOpened.classList.contains('card__popup_opened')) {
                cardOpened.classList.toggle('card__popup_hidden')
                cardOpened.classList.toggle('card__popup_opened');
            } else if (cardOpened.classList.contains('card__popup_hidden')) {
                cardOpened.classList.toggle('card__popup_opened');
                cardOpened.classList.toggle('card__popup_hidden')
            } else if (!cardOpened.classList.contains('card__popup_hidden') && !cardOpened.classList.contains('card__popup_opened')) {
                cardOpened.classList.toggle('card__popup_opened');
            }
            cardPopupImage.setAttribute('src', cardImage.getAttribute('src'));
            cardPopupDescription.textContent = cardTitle.textContent;
        })

        cardTrash.addEventListener('click', function () {
            cardCreation.remove();
        })

        cards.prepend(cardCreation);
        if (popupCreation.classList.contains('popup_opened')) {
            popupCreation.classList.toggle('popup_opened');
            popupCreation.classList.toggle('popup_closed')
        } else if (cardOpened.classList.contains('popup_closed')) {
            popupCreation.classList.toggle('popup_opened');
            popupCreation.classList.toggle('popup_closed')
        } else if (!cardOpened.classList.contains('popup_closed') && !cardOpened.classList.contains('popup_opened')) {
            cardOpened.classList.toggle('card__popup_opened');
        }
    });

    popupClose.addEventListener('click', function () {
        // Создание класса "popup_hidden", чтобы эффект плавного исчезновения сработал
        if (popupCreation.classList.contains('popup_opened')) {
            popupCreation.classList.toggle('popup_opened');
            popupCreation.classList.toggle('popup_closed')
        } else if (cardOpened.classList.contains('popup_closed')) {
            popupCreation.classList.toggle('popup_opened');
            popupCreation.classList.toggle('popup_closed')
        } else if (!cardOpened.classList.contains('popup_closed') && !cardOpened.classList.contains('popup_opened')) {
            cardOpened.classList.toggle('card__popup_opened');
        }
    })

    page.append(popupCreation)
}
profileButtonAdd.addEventListener('click', popupAddOpenClose)