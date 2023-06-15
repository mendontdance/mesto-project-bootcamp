////////////////////////////////////////////////////////////////////////////////////////////
///////// Валидация форм

// Параметры валидации
const settingsValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

// Скрыть ошибку в Инпуте
const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};

// Показать ошибку в Инпуте
const hideInputError = (formElement, inputElement,settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

// Проверить валидность в Инпуте
const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

// События на все инпуты в случае если все введено корректно, то кнопка отображается активной
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, settings)
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

// События для всех модальных окон
const enableValidation = (settings) => {
    const popupForms = Array.from(document.querySelectorAll(settings.formSelector));
    popupForms.forEach((popupForm) => {
        setEventListeners(popupForm, settings);
    })
};

// Функция проверки валидности всех инпутов в модальном окне
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

// Функция переключения кнопки, в случае если все инпуты заполнены корректно
function toggleButtonState(inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.disabled = true;
    } else if (!hasInvalidInput(inputList)) {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

export { enableValidation, settingsValidation}