const popupEditInputName = document.querySelector('.popup__input_name_edit');
const popupEditInputText = document.querySelector('.popup__input_text_edit');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

// Функция открытия модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', hidePopupByEsc);
  popup.addEventListener('mousedown', hidePopupByOverlay);
}

document.querySelectorAll('.popup__close').forEach(button => {
  const popup = button.closest('.popup'); // нашли родителя с нужным классом
  button.addEventListener('click', () => hidePopup(popup)); // закрыли попап
});

// Функция закрытия модульного окна
function hidePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', hidePopupByEsc);
  popup.removeEventListener('mousedown', hidePopupByOverlay);
}

function hidePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    
    hidePopup(openedPopup);
  }
}

function hidePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    hidePopup(evt.currentTarget);
  }
}

export { openPopup, hidePopup, popupEditInputText, popupEditInputName, profileName, profileText }