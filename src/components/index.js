"use strict"

import '../pages/index.css'; // импорт главного файла стилей
import { creatingCard, cards, popupAddInputName, popupAddInputText, } from './card.js' // импорт функции создания карточки и закрытия всплывающего окна
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
function profileInfo() {
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
      enablePopupInput(popupEditInputName, popupEditInputText); // разблокируем инпуты после загрузки
    })
    .catch((err) => {
      console.log(err);
    })
});

// События нажатия на редактирования профиля (запуск функции открытия формы)
profileButtonEdit.addEventListener('click', function () {
  profileInfo();
  openPopup(popupEdit);
});

///////////////////////////////////////////////////////////////////////
// Добавление новой карточки в массив
const profileButtonAdd = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_add');
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
      const newCreatedCard = createNewCard(res, userId);
      const cardImage = newCreatedCard.querySelector('.card__image');
      cards.prepend(newCreatedCard);
      loadImage(cardImage, popupAddInputText.value, hidePopup(popupAdd), errorLoading);
    })
    .then(() => {
      // Убираем все данные с инпутов
      popupAddInputReset();
      // Делаем кнопку неактивной снова после добавления карточки
      makePopupAddInactive();
      resetPopupSave(popupAddSave);
      enablePopupInput(popupAddInputName, popupAddInputText); // разблокируем инпуты после загрузки

    })
    .catch(err => console.log(err))
});

// Функция создания новой карточки
function createNewCard(cardData, userId) {

  const cardElement = creatingCard(cardData, userId);
    // Добавляем опцию удаления карточки
  const cardTrash = cardElement.querySelector('.card__trash');
  cardTrash.classList.add('card__trash_active');

  return cardElement
}

// Функция деактивации кнопки в модальном окне после добавления карточки
function makePopupAddInactive() {
  if (!popupAddSave.classList.contains('popup__save_inactive')) {
    popupAddSave.classList.add('popup__save_inactive');
    popupAddSave.disabled = true;
  }
}

// Функция сброса всех данных в инпутах карточки
function popupAddInputReset() {
  popupAddInputName.value = '';
  popupAddInputText.value = '';
  popupAddSave.classList.add('popup__save_inactive');
  popupAddSave.disabled = true;
}

// Событие нажатия на кнопку "+"
profileButtonAdd.addEventListener('click', function () {
  popupAddInputReset();
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
  popupSave.textContent = 'Сохранить'
}

// События отправки формы загрузки изображения на сервер и вставка изображения в аватарку
popupAvatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  popupInputAvatar.setAttribute('disabled', true)
  loadImage(profileImage, popupInputAvatar.value, isLoading(popupAvatarSave), errorLoading)

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
      popupInputAvatar.removeAttribute('disabled', true)
    })
    .catch(err => console.log(err))
})

// Запуск валидации всех форм
enableValidation(settingsValidation);

// Функция сохранения до того, как изображение прогрузится
function loadImage(image, imageUrl, loading, errorCallback) {
  const img = image;
  img.src = imageUrl;
  // Функция, которая записана в onload
  // будет вызвана после загрузки изображения
  img.onload = loading;
  // В случае ошибки вылезет в консоль сообщение об ошибке
  img.onerror = errorCallback;
}

// Функция вывода ошибки сохранения
function errorLoading() {
  console.log('Изображение не прогрузилось. Проверьте подключение.')
}

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

