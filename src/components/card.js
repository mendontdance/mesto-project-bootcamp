import { openPopup } from './modal';
import { setLike, delLike, delCard } from './api';

///////////////////////////////////////////////////////////////////////
// Формируем блок карточек из массива
const cardTemplate = document.querySelector('#card-template').content;
const cardOpened = document.querySelector('.popup_card');
const cardPopupImage = document.querySelector('.popup__image_card');
const cardPopupTitle = document.querySelector('.popup__title_card');
const cards = document.querySelector('.cards');
const popupAddInputName = document.querySelector('.popup__input_name_add');
const popupAddInputText = document.querySelector('.popup__input_text_add');

// Функция формирования карточек из массива из JSON
function creatingCard(cardObj, userId) {
    const cardCreation = cardTemplate.querySelector('.card').cloneNode('true');
    const cardImage = cardCreation.querySelector('.card__image');
    const cardTitle = cardCreation.querySelector('.card__title');
    const cardButtonLike = cardCreation.querySelector('.card__button-like');
    const cardCounterLike = cardCreation.querySelector('.card__counter-like');;
    const cardTrash = cardCreation.querySelector('.card__trash');

    // Исходные данные
    cardTitle.textContent = cardObj.name;
    cardImage.setAttribute('src', cardObj.link);
    cardImage.setAttribute('alt', cardObj.name);


    // like
    let cardLikes = cardObj.likes;
    cardCounterLike.textContent = cardLikes.length;

    loadLikes(cardLikes, userId)

    function handleLikeButton() {
        function queryMethod() {
            if (isLiked(cardLikes, userId)) {
                return delLike(cardObj._id)
            } else {
                return setLike(cardObj._id)
            }
        }
        queryMethod()
            .then(res => {
                updateLike(res.likes)
            })
            .catch(err => console.log(err))
    }

    function isLiked(likesArray, userId) {
        return likesArray.some(item => item._id === userId)
    }

    function loadLikes(likesArray, userId) {
        if (isLiked(cardLikes, userId)) {
            cardButtonLike.classList.add('card__button-like_active');
            cardCounterLike.textContent = likesArray.length;
        }
    }

    function updateLike(likesArray) {
        cardLikes = likesArray;
        if (cardButtonLike.classList.contains('card__button-like_active')) {
            cardButtonLike.classList.toggle('card__button-like_active');
            cardCounterLike.textContent = likesArray.length;
        } else {
            cardButtonLike.classList.toggle('card__button-like_active');
            cardCounterLike.textContent = likesArray.length;
        }
    }

    // Событие нажатия на лайк
    cardButtonLike.addEventListener('click', handleLikeButton)

    // Событие нажатия на картинку для появления всплывающей карточки
    cardImage.addEventListener('click', function () {

        cardPopupImage.setAttribute('src', cardImage.getAttribute('src'));
        cardPopupImage.setAttribute('alt', cardImage.getAttribute('alt'));
        cardPopupTitle.textContent = cardTitle.textContent;

        openPopup(cardOpened);
    })

    if (cardObj.owner._id === userId) {
        cardTrash.classList.add('card__trash_active');
        cardTrash.addEventListener('click', () => {
            delCard(cardObj._id)
                .then(() => {
                    cardCreation.remove();
                })
                .catch(err => console.log(err))
        })
    } else {
        cardTrash.remove();
    }

    return cardCreation;
}

export { creatingCard, cards, popupAddInputName, popupAddInputText, }