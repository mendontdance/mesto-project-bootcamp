"use strict"

import '../pages/index.css'; // импорт главного файла стилей
import {creatingCard, initialCards, cardPopupClose, cardOpened} from './card.js' // импорт функции создания карточки и закрытия всплывающего окна
import {popupOpen, popupHide, popupAddInputReset, popupAddInputName, popupEditInputText, popupEditInputName, popupAddInputText, profileInfo, profileName, profileText} from './modal'; // импорт функции открытия и закрытия модального окна, а также добавления сброса модального окна "+"
import {enableValidation} from './validation';

///////////////////////////////////////////////////////////////////////
// Редактирование профиля

const profileButtonEdit = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup_edit')
const popupEditClose = document.querySelector('.popup__close_edit');
const popupEditSave = document.querySelector('.popup__save_edit');

//Заполняем исходными данными
profileInfo();

// Функция сохранения данных (кнопка сохранить)
popupEditSave.addEventListener('click', function (evt) {
  evt.preventDefault();

  profileName.textContent = popupEditInputName.value;
  profileText.textContent = popupEditInputText.value;

  popupHide(popupEdit)
});

// События закрытия формы (кнопка закрыть форму)
popupEditClose.addEventListener('click', function () {
  popupHide(popupEdit)
  setTimeout(profileInfo, 1000);
});

// События нажатия на редактирования профиля (запуск функции открытия формы)
profileButtonEdit.addEventListener('click', function () {
  popupOpen(popupEdit)
});

// Формируем карточки
initialCards.forEach((elem) => creatingCard(elem))

// Событие клика на закрытие карточки
cardPopupClose.addEventListener('click', function () {
  popupHide(cardOpened);
})

///////////////////////////////////////////////////////////////////////
// Добавление новой карточки в массив
const profileButtonAdd = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_add');
const popupAddClose = document.querySelector('.popup__close_add');
const popupAddSave = document.querySelector('.popup__save_add');

// Исходные данные
popupAddInputName.value = '';
popupAddInputText.value = '';

// Создание события клика на "Создать" - создается новая карточка
popupAddSave.addEventListener('click', function (evt) {
  evt.preventDefault();

  // Добавляем карточку в начало массива initialCards
  initialCards.unshift({
    'name': popupAddInputName.value,
    'link': popupAddInputText.value
  });

  // Создаем карточку и добавляем в html-структуру
  creatingCard(initialCards[0])

  // Убираем все данные с инпутов
  popupAddInputReset();

  // Делаем кнопку неактивной снова после добавления карточки
  makePopupAddInactive();

  // Убираем модальное окно после добавления карточки
  popupHide(popupAdd);
});

// Функция деактивации кнопки в модальном окне после добавления карточки
function makePopupAddInactive() {
  if (!popupAddSave.classList.contains('popup__save_inactive')) {
    popupAddSave.classList.add('popup__save_inactive');
    popupAddSave.disabled = true;
  }
}

// Событие закрытия модульного окна "+"
popupAddClose.addEventListener('click', function () {
  setTimeout(popupAddInputReset, 1000);
  popupHide(popupAdd);
})

// Событие нажатия на кнопку "+"
profileButtonAdd.addEventListener('click', function () {
  enableValidation();
  popupOpen(popupAdd);
})

// Запуск функции проверки валидности форм
enableValidation();