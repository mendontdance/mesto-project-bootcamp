const popupAddInputName = document.querySelector('.popup__input_name_add');
const popupAddInputText = document.querySelector('.popup__input_text_add');
const popupEditInputName = document.querySelector('.popup__input_name_edit');
const popupEditInputText = document.querySelector('.popup__input_text_edit');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

// Исходные данные
function profileInfo() {
    popupEditInputName.value = profileName.textContent;
    popupEditInputText.value = profileText.textContent;
  }

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

// Функция сброса всех данных в инпутах карточки
function popupAddInputReset() {
    popupAddInputName.value = '';
    popupAddInputText.value = '';
  }

export {popupOpen, popupHide, popupAddInputReset, popupAddInputName, popupEditInputText, popupEditInputName, popupAddInputText, profileInfo, profileName, profileText}