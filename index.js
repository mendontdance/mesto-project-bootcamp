"use strict"
// Модальное окно 
const popupEdit = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const profileButtonEdit = document.querySelector('.profile__button-edit');

function popupEditOpenClose () {
    popupEdit.classList.toggle('popup_opened');
}

profileButtonEdit.addEventListener('click', popupEditOpenClose)
popupClose.addEventListener('click', popupEditOpenClose)
