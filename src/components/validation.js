////////////////////////////////////////////////////////////////////////////////////////////
///////// Валидация форм

import {popupHide, popupAddInputReset, profileInfo} from './modal'

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
                if (elem.classList.contains('popup_add')) {
                    setTimeout(popupAddInputReset, 1000);
                } else if (elem.classList.contains('popup_edit')) {
                    setTimeout(profileInfo, 1000);
                }
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
                    if (elem.classList.contains('popup_add')) {
                        setTimeout(popupAddInputReset, 1000);
                    } else if (elem.classList.contains('popup_edit')) {
                        setTimeout(profileInfo, 1000);
                    }
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

export { enableValidation }