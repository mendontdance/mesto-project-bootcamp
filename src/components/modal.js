const popupEditInputName = document.querySelector('.popup__input_name_edit');
const popupEditInputText = document.querySelector('.popup__input_text_edit');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

// Функция открытия модального окна
function openPopup(evt) {
  evt.classList.add('popup_opened');

  document.addEventListener('keydown', hidePopupByEsc);
  evt.addEventListener('mousedown', hidePopupByOverlay);
}


document.querySelectorAll('.popup__close').forEach(button => {
  const popupCloseBtn = button.closest('.popup'); // нашли родителя с нужным классом
  button.addEventListener('click', () => hidePopup(popupCloseBtn)); // закрыли попап
});

// Функция закрытия модульного окна
function hidePopup(evt) {
  evt.classList.remove('popup_opened');

  document.removeEventListener('keydown', hidePopupByEsc);
  evt.removeEventListener('mousedown', hidePopupByOverlay);
}

function hidePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    
    hidePopup(openedPopup);
  }
}

function hidePopupByOverlay(evt) {
  const openedPopup = document.querySelector('.popup_opened');

  if (evt.target === evt.currentTarget) {
    hidePopup(openedPopup);
  }
}

export { openPopup, hidePopup, popupEditInputText, popupEditInputName, profileName, profileText }