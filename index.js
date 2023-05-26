"use strict"
// Модальное окно 
const popupEdit = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const profileButtonEdit = document.querySelector('.profile__button-edit');

function popupEditOpenClose() {
    popupEdit.classList.toggle('popup_opened');
}

profileButtonEdit.addEventListener('click', popupEditOpenClose);
popupClose.addEventListener('click', popupEditOpenClose);

const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputText = document.querySelector('.popup__input_type_text');

popupInputName.value = profileName.textContent;
popupInputText.value = profileText.textContent;

const popupSaveSubmit = document.querySelector('.popup__save');

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = popupInputName.value;
    profileText.textContent = popupInputText.value;

    popupEditOpenClose();
}

popupSaveSubmit.addEventListener('click', handleFormSubmit);