"use strict"
///////////////////////////////////////////////////////////////////////
// Редактирование профиля

const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const popupEdit = document.querySelector('.popup-edit')
const popupEditClose = document.querySelector('.popup-edit__close');
const popupEditTitle = document.querySelector('.popup-edit__title');
const popupEditInputName = document.querySelector('.popup-edit__input_type_name');
const popupEditInputText = document.querySelector('.popup-edit__input_type_text');
const popupEditSave = document.querySelector('.popup-edit__save');

// Исходные данные
popupEditInputName.value = profileName.textContent;
popupEditInputText.value = profileText.textContent;

// Функция открытия модального окна

function popupEditOpen() {
    popupEdit.classList.add('popup-edit_opened');
    popupEdit.classList.remove('popup-edit_closed');
}

// Функция закрытия модального окна
function popupEditHide() {
    popupEdit.classList.remove('popup-edit_opened');
    popupEdit.classList.add('popup-edit_closed');
}

// Функция сохранения данных (кнопка сохранить)
popupEditSave.addEventListener('click', function (evt) {
    evt.preventDefault();

    profileName.textContent = popupEditInputName.value;
    profileText.textContent = popupEditInputText.value;

    popupEditHide()
});

// События закрытия формы (кнопка закрыть форму)
popupEditClose.addEventListener('click', popupEditHide);

// События нажатия на редактирования профиля (запуск функции открытия формы)
profileButtonEdit.addEventListener('click', popupEditOpen);

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
const cardOpened = document.querySelector('.card-popup');
const cardPopupImage = document.querySelector('.card-popup__image');
const cardPopupClose = document.querySelector('.card-popup__close');
const cardPopupDescription = document.querySelector('.card-popup__description');

// Функция открытия всплывающей карточки
function cardPopupOpen() {
    cardOpened.classList.remove('card-popup_hidden')
    cardOpened.classList.add('card-popup_opened');
}

// Функция закрытия всплывающей карточки
function cardPopupHide() {
    cardOpened.classList.remove('card-popup_opened');
    cardOpened.classList.add('card-popup_hidden')
}

// Функция формирования карточек из массива initialCards
function cardCreation(cardObj) {
    const cardCreation = cardTemplate.querySelector('.card').cloneNode('true');
    const cardImage = cardCreation.querySelector('.card__image');
    const cardTitle = cardCreation.querySelector('.card__title');
    const cardTrash = cardCreation.querySelector('.card__trash');
    const cardButtonLike = cardCreation.querySelector('.card__button-like');

    // Исходные данные
    cardTitle.textContent = cardObj.name;
    cardImage.setAttribute('src', cardObj.link);
    cardImage.setAttribute('alt', cardObj.name);

    // Добавляем карточку в массив
    cards.prepend(cardCreation);

    // Событие нажатия на картинку для появления всплывающей карточки
    addingImages();

    // Событие нажатия на лайк
    likeCard();

    // Событие удаления карточки
    deleteCard();
}

// Формируем карточки
initialCards.forEach((elem) => cardCreation(elem));

// Добавляем ссылки на картинки и текст к картинке, а также подпись картинки
function addingImages() {
    const cardsImage = document.querySelectorAll('.card__image');
    const cardsTitle = document.querySelectorAll('.card__title');

    for (let i = 0; i < cardsImage.length; i++) {
        cardsImage[i].addEventListener('click', function () {

            cardPopupImage.setAttribute('src', cardsImage[i].getAttribute('src'));
            cardPopupImage.setAttribute('alt', cardsImage[i].getAttribute('alt'));
            cardPopupDescription.textContent = cardsTitle[i].textContent;

            cardPopupOpen();
        })
    }
}

// Функция нажатия на лайк
function likeCard() {
    const cardButtonLikes = document.querySelectorAll('.card__button-like');

    cardButtonLikes.forEach(elem => {
        elem.addEventListener('click', function (evt) {
            evt.target.classList.toggle('card__button-like_active')
        })
    })
}

function deleteCard() {
    const cardTrashes = document.querySelectorAll('.card__trash');
    // Событие удаления карточки
    cardTrashes.forEach(elem => {
        elem.addEventListener('click', function () {
            elem.closest('.card').remove()
        })
    })
}

// Событие клика на закрытие карточки
cardPopupClose.addEventListener('click', cardPopupHide)

///////////////////////////////////////////////////////////////////////
// Добавление новой карточки в массив
const profileButtonAdd = document.querySelector('.profile__button-add');
const page = document.querySelector('.page');
const popupAdd = document.querySelector('.popup-add');
const popupAddClose = document.querySelector('.popup-add__close');
const popupAddTitle = document.querySelector('.popup-add__title');
const popupAddInputName = document.querySelector('.popup-add__input_type_name');
const popupAddInputText = document.querySelector('.popup-add__input_type_text');
const popupAddSave = document.querySelector('.popup-add__save');

// Исходные данные
popupAddInputName.value = '';
popupAddInputText.value = '';

// Создание события клика на "Создать" - создается новая карточка
popupAddSave.addEventListener('click', function (evt) {
    evt.preventDefault();

    // Добавляем карточку в массив initialCards
    initialCards.unshift({
        'name': popupAddInputName.value,
        'link': popupAddInputText.value
    });

    // Создаем карточку и добавляем в html-структуру
    cardCreation(initialCards[0])

    popupAddHide();
});

// Функция открытия формы "+"
function popupAddOpen() {
    popupAdd.classList.add('popup-add_opened');
    popupAdd.classList.remove('popup-add_closed')
}
// Функция закрытия формы "+"
function popupAddHide() {
    popupAdd.classList.remove('popup-add_opened');
    popupAdd.classList.add('popup-add_closed')
}

// Событие закрытия формы
popupAddClose.addEventListener('click', popupAddHide)

// Событие нажатия на кнопку "+"
profileButtonAdd.addEventListener('click', popupAddOpen)