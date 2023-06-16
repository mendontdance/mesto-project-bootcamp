"use strict"

import '../pages/index.css'; // импорт главного файла стилей
import { creatingCard, cards, popupAddInputName, popupAddInputText, popupAdd, loadError, loadImage } from './card.js' // импорт функции создания карточки и закрытия всплывающего окна
import { openPopup, hidePopup, popupEditInputName, popupEditInputText, profileName, profileText } from './modal'; // импорт функции открытия и закрытия модального окна, а также добавления сброса модального окна "+"
import { enableValidation, settingsValidation } from './validation';
import { getProfileInfo, getCardArray, addCardToArray, editProfile, editAvatar } from './api';

let userId;
const profileButtonEdit = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup_edit');
const popupEditSave = document.querySelector('.popup__save_edit');
const popupFormEdit = document.querySelector('.popup__form_edit')

///////////////////////////////////////////////////////////////////////
// Редактирование профиля

// Исходные данные
function fillProfileInfo() {
  popupEditInputName.value = profileName.textContent;
  popupEditInputText.value = profileText.textContent;
  popupEditSave.classList.remove('popup__save_inactive');
  popupEditSave.disabled = false;
}

// Функция блокировки инпутов
function disablePopupInput(popupInputName, popupInputText) {
  popupInputName.setAttribute('disabled', true);
  popupInputText.setAttribute('disabled', true);
}

// Функция разблокировки инпутов
function enablePopupInput(popupInputName, popupInputText) {
  popupInputName.removeAttribute('disabled');
  popupInputText.removeAttribute('disabled');
}

// Функция сохранения данных (кнопка сохранить)
popupFormEdit.addEventListener('submit', function (evt) {
  evt.preventDefault();

  isLoading(popupEditSave);
  disablePopupInput(popupEditInputName, popupEditInputText); // чтобы в инпут нельзя было написать ничего, пока идет загрузка

  editProfile(popupEditInputName.value, popupEditInputText.value)
    .then(() => {
      profileName.textContent = popupEditInputName.value;
      profileText.textContent = popupEditInputText.value;
    })
    .then(() => {
      hidePopup(popupEdit);
      resetPopupSave(popupEditSave);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditSave.textContent = 'Сохранить'
      enablePopupInput(popupEditInputName, popupEditInputText); // разблокируем инпуты после загрузки
    })
});

// События нажатия на редактирования профиля (запуск функции открытия формы)
profileButtonEdit.addEventListener('click', function () {
  fillProfileInfo();
  openPopup(popupEdit);
});

///////////////////////////////////////////////////////////////////////
// Добавление новой карточки в массив
const profileButtonAdd = document.querySelector('.profile__button-add');
const popupAddSave = document.querySelector('.popup__save_add');
const popupFormAdd = document.querySelector('.popup__form_add')

// Функция создания новых данных для создания карточки
function creatingNewCardData() {
  const newCardData = {
    'name': popupAddInputName.value,
    'link': popupAddInputText.value
  }
  return newCardData
}

// Создание события отправки формы - создается новая карточка
popupFormAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  isLoading(popupAddSave);
  disablePopupInput(popupAddInputName, popupAddInputText); // чтобы в инпут нельзя было написать ничего, пока идет загрузка
  const newCard = creatingNewCardData();
  // Кидаем на сервер созданную карточку
  addCardToArray(newCard)
    .then((res) => {
      // Создаем карточку и добавляем в html-структуру
      const newCreatedCard = creatingCard(res, userId);
      cards.prepend(newCreatedCard);
    })
    .then(() => {
      // Убираем все данные с инпутов
      resetPopupAddInput();
      // Делаем кнопку неактивной снова после добавления карточки
      makePopupAddInactive();
      resetPopupSave(popupAddSave);
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupAddSave.textContent = 'Создать'
      enablePopupInput(popupAddInputName, popupAddInputText); // разблокируем инпуты после загрузки
    })
});

// Функция деактивации кнопки в модальном окне после добавления карточки
function makePopupAddInactive() {
  if (!popupAddSave.classList.contains('popup__save_inactive')) {
    popupAddSave.classList.add('popup__save_inactive');
    popupAddSave.disabled = true;
  }
}

// Функция сброса всех данных в инпутах карточки
function resetPopupAddInput() {
  popupAddInputName.value = '';
  popupAddInputText.value = '';
  popupAddSave.classList.add('popup__save_inactive');
  popupAddSave.disabled = true;
}

// Событие нажатия на кнопку "+"
profileButtonAdd.addEventListener('click', function () {
  resetPopupAddInput();
  openPopup(popupAdd);
})

/////////////////////////////////////////////////////////////////////
// Редактирование аватарки
const profileAvatar = document.querySelector('.profile__overlay-avatar');
const profileImage = document.querySelector('.profile__avatar')
const popupAvatar = document.querySelector('.popup_avatar');
const popupAvatarForm = document.querySelector('.popup__form_avatar');
const popupInputAvatar = document.querySelector('.popup__input_name_avatar');
const popupAvatarSave = document.querySelector('.popup__save_avatar');

// Событие открытия формы для редактирования аватарки
profileAvatar.addEventListener('click', () => {
  openPopup(popupAvatar)
});

// Функция сброса кнопки сохранения до исходных данных
function resetPopupSave(popupSave) {
  popupSave.disabled = true;
  popupSave.classList.add('popup__save_inactive');
}

// События отправки формы загрузки изображения на сервер и вставка изображения в аватарку
popupAvatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  popupInputAvatar.setAttribute('disabled', true)
  loadImage(profileImage, popupInputAvatar.value, isLoading(popupAvatarSave), loadError)

  editAvatar(popupInputAvatar.value)
    .then((res) => {
      res.avatar = popupInputAvatar.value
    })
    .then(() => {
      popupInputAvatar.value = '';
      resetPopupSave(popupAvatarSave);
    })
    .then(() => {
      hidePopup(popupAvatar);
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupAvatarSave.textContent = 'Сохранить'
      popupInputAvatar.removeAttribute('disabled', true)
    })
})

// Запуск валидации всех форм
enableValidation(settingsValidation);

// Функция загрузки сохранения
function isLoading(popupSave) {
  popupSave.classList.remove('popup__save_inactive');
  popupSave.disabled = true;
  popupSave.textContent = 'Сохранение...'
}

// Получение данных JSON с сервера
Promise.all([getCardArray(), getProfileInfo()])
  .then(([allCards, userData]) => {
    userId = userData._id;
    profileName.textContent = userData.name;
    profileText.textContent = userData.about;

    profileImage.src = userData.avatar;

    allCards.forEach((item) => {
      const newCreatedCard = creatingCard(item, userId);
      cards.append(newCreatedCard);
    })
  })
  .catch((err) => console.log(err))

