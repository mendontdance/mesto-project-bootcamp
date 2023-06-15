const config = {
    baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-9',
    headers: {
        authorization: '73b99c7a-ecb6-4ee2-8178-466bb6d0830a',
        'Content-Type': 'application/json'
    }
}

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
}

function getProfileInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(checkResponse)
}

function getProfileAvatar() {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        headers: config.headers
    })
        .then(checkResponse)
}

function getCardArray() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(checkResponse)
}

function editProfile(profileName, profileDescription) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileName,
            about: profileDescription,
        })
    })
        .then(checkResponse)
}

function editAvatar(profileAvatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: profileAvatar
        })
    })
        .then(checkResponse)
}

function addCardToArray(card) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: card.name,
            link: card.link
        })
    })
        .then(checkResponse)
}

function delLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(checkResponse)
}

function setLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(checkResponse)
}

function delCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(checkResponse)
}

export { getProfileInfo, getCardArray, editProfile, addCardToArray, setLike, delLike, delCard, getProfileAvatar, editAvatar }
