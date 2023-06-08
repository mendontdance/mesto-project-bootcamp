"use strict"
///////////////////////////////////////////////////////////////////////
// Редактирование профиля

const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const popupEdit = document.querySelector('.popup_edit')
const popupEditClose = document.querySelector('.popup__close_edit');
const popupEditTitle = document.querySelector('.popup__title_edit');
const popupEditInputName = document.querySelector('.popup__input_name_edit');
const popupEditInputText = document.querySelector('.popup__input_text_edit');
const popupEditSave = document.querySelector('.popup__save_edit');

// Исходные данные
function profileInfo() {
  popupEditInputName.value = profileName.textContent;
  popupEditInputText.value = profileText.textContent;
}

//Заполняем исходными данными
profileInfo();

// Функция открытия модального окна
function popupOpen(evt) {
  evt.classList.add('popup_opened');
  evt.classList.remove('popup_hidden')
}
// Функция закрытия модульного окна
function popupHide(evt) {
  evt.classList.remove('popup_opened');
  evt.classList.add('popup_hidden')
}

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
profileButtonEdit.addEventListener('click', function() {
  popupOpen(popupEdit)
});

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

// Функция открытия всплывающей карточки
function cardPopupOpen() {
  cardOpened.classList.remove('popup_hidden');
  cardOpened.classList.add('popup_opened');
}

// Функция закрытия всплывающей карточки
// function cardPopupHide() {
//   cardOpened.classList.remove('popup_opened');
//   cardOpened.classList.add('popup_hidden');
// }

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

    cardPopupOpen();
  })

  // Событие удаления карточки
  cardTrash.addEventListener('click', function () {
    cardCreation.remove();
  })
}

// Формируем карточки
initialCards.forEach((elem) => creatingCard(elem))

// Событие клика на закрытие карточки
cardPopupClose.addEventListener('click', function () {
  popupHide(cardOpened);
})

///////////////////////////////////////////////////////////////////////
// Добавление новой карточки в массив
const profileButtonAdd = document.querySelector('.profile__button-add');
const page = document.querySelector('.page');
const popupAdd = document.querySelector('.popup_add');
const popupAddClose = document.querySelector('.popup__close_add');
const popupAddTitle = document.querySelector('.popup__title_add');
const popupAddInputName = document.querySelector('.popup__input_name_add');
const popupAddInputText = document.querySelector('.popup__input_text_add');
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

// Функция сброса всех данных в инпутах карточки
function popupAddInputReset() {
  popupAddInputName.value = '';
  popupAddInputText.value = '';
}

// Событие закрытия модульного окна "+"
popupAddClose.addEventListener('click', function() {
  setTimeout(popupAddInputReset, 1000);
  popupHide(popupAdd);
})

// Событие нажатия на кнопку "+"
profileButtonAdd.addEventListener('click', function() {
  enableValidation();
  popupOpen(popupAdd);
})

////////////////////////////////////////////////////////////////////////////////////////////
///////// Валидация форм

// Скрыть ошибку в Инпуте
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

// Показать ошибку в Инпуте
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

// Проверить валидность в Инпуте
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// События на все инпуты в случае если все введено корректно, то кнопка отображается активной
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement)
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// События для всех модальных окон
const enableValidation = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      popupList.forEach((elem) => {
        popupHide(elem);
      })
    }
  });

  popupList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    formElement.addEventListener('mousedown', function (evt) {
      if (evt.target === evt.currentTarget) {
        popupList.forEach((elem) => {
          popupHide(elem);
        }) 
      }
    });

    const popupForms = Array.from(formElement.querySelectorAll('.popup__form'));
    popupForms.forEach((popupForm) => {
      setEventListeners(popupForm);
    })
  });
};

// Функция проверки валидности всех инпутов в модальном окне
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// Функция переключения кнопки, в случае если все инпуты заполнены корректно
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save_inactive');
    buttonElement.disabled = true;
  } else if (!hasInvalidInput(inputList)) {
    buttonElement.classList.remove('popup__save_inactive');
    buttonElement.disabled = false;
  }
}

// Запуск функции проверки валидности форм
enableValidation();

////////////////////////////////////////////////////////////////////////////////////////////
///////// 