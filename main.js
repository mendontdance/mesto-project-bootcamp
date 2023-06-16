(()=>{"use strict";var e=document.querySelector(".popup__input_name_edit"),t=document.querySelector(".popup__input_text_edit"),n=document.querySelector(".profile__name"),r=document.querySelector(".profile__text");function o(e){e.classList.add("popup_opened"),document.addEventListener("keydown",c),e.addEventListener("mousedown",u)}function a(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",c),e.removeEventListener("mousedown",u)}function c(e){"Escape"===e.key&&a(document.querySelector(".popup_opened"))}function u(e){e.target===e.currentTarget&&a(e.currentTarget)}document.querySelectorAll(".popup__close").forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return a(t)}))}));var i={baseUrl:"https://nomoreparties.co/v1/wbf-cohort-9",headers:{authorization:"73b99c7a-ecb6-4ee2-8178-466bb6d0830a","Content-Type":"application/json"}};function l(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var s,d=document.querySelector("#card-template").content,p=document.querySelector(".popup_card"),_=document.querySelector(".popup__image_card"),f=document.querySelector(".popup__title_card"),v=document.querySelector(".cards"),m=document.querySelector(".popup__input_name_add"),h=document.querySelector(".popup__input_text_add"),y=document.querySelector(".popup_add");function b(e,t){var n=d.querySelector(".card").cloneNode("true"),r=n.querySelector(".card__image"),c=n.querySelector(".card__title"),u=n.querySelector(".card__button-like"),s=n.querySelector(".card__counter-like"),v=n.querySelector(".card__trash");c.textContent=e.name,r.setAttribute("src",e.link),r.setAttribute("alt",e.name);var m=e.likes;function h(e,t){return e.some((function(e){return e._id===t}))}return s.textContent=m.length,function(e,t){h(m,t)&&(u.classList.add("card__button-like_active"),s.textContent=e.length)}(m,t),u.addEventListener("click",(function(){var n;(h(m,t)?(n=e._id,fetch("".concat(i.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:i.headers}).then(l)):function(e){return fetch("".concat(i.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:i.headers}).then(l)}(e._id)).then((function(e){var t;t=e.likes,m=t,u.classList.contains("card__button-like_active"),u.classList.toggle("card__button-like_active"),s.textContent=t.length})).catch((function(e){return console.log(e)}))})),r.addEventListener("click",(function(){_.setAttribute("src",r.getAttribute("src")),_.setAttribute("alt",r.getAttribute("alt")),f.textContent=c.textContent,o(p)})),e.owner._id===t?(v.classList.add("card__trash_active"),v.addEventListener("click",(function(){var t;(t=e._id,fetch("".concat(i.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:i.headers}).then(l)).then((function(){n.remove()})).catch((function(e){return console.log(e)}))}))):v.remove(),q(r,r.src,a(y),S),n}function S(){console.log("Изображение не прогрузилось. Проверьте подключение.")}function q(e,t,n,r){var o=e;o.src=t,o.onload=n,o.onerror=r}function L(e){return e.some((function(e){return!e.validity.valid}))}function C(e,t,n){L(e)?(t.classList.add(n.inactiveButtonClass),t.disabled=!0):L(e)||(t.classList.remove(n.inactiveButtonClass),t.disabled=!1)}function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var g=document.querySelector(".profile__button-edit"),A=document.querySelector(".popup_edit"),k=document.querySelector(".popup__save_edit");function x(e,t){e.setAttribute("disabled",!0),t.setAttribute("disabled",!0)}function U(e,t){e.removeAttribute("disabled"),t.removeAttribute("disabled")}document.querySelector(".popup__form_edit").addEventListener("submit",(function(o){o.preventDefault(),M(k),x(e,t),function(e,t){return fetch("".concat(i.baseUrl,"/users/me"),{method:"PATCH",headers:i.headers,body:JSON.stringify({name:e,about:t})}).then(l)}(e.value,t.value).then((function(){n.textContent=e.value,r.textContent=t.value})).then((function(){a(A),H(k)})).catch((function(e){console.log(e)})).finally((function(){k.textContent="Сохранить",U(e,t)}))})),g.addEventListener("click",(function(){e.value=n.textContent,t.value=r.textContent,k.classList.remove("popup__save_inactive"),k.disabled=!1,o(A)}));var w=document.querySelector(".profile__button-add"),T=document.querySelector(".popup__save_add");function j(){m.value="",h.value="",T.classList.add("popup__save_inactive"),T.disabled=!0}document.querySelector(".popup__form_add").addEventListener("submit",(function(e){var t;e.preventDefault(),M(T),x(m,h),(t={name:m.value,link:h.value},fetch("".concat(i.baseUrl,"/cards"),{method:"POST",headers:i.headers,body:JSON.stringify({name:t.name,link:t.link})}).then(l)).then((function(e){var t=b(e,s);v.prepend(t)})).then((function(){j(),T.classList.contains("popup__save_inactive")||(T.classList.add("popup__save_inactive"),T.disabled=!0),H(T)})).catch((function(e){return console.log(e)})).finally((function(){T.textContent="Создать",U(m,h)}))})),w.addEventListener("click",(function(){j(),o(y)}));var O,P=document.querySelector(".profile__overlay-avatar"),B=document.querySelector(".profile__avatar"),D=document.querySelector(".popup_avatar"),N=document.querySelector(".popup__form_avatar"),I=document.querySelector(".popup__input_name_avatar"),J=document.querySelector(".popup__save_avatar");function H(e){e.disabled=!0,e.classList.add("popup__save_inactive")}function M(e){e.classList.remove("popup__save_inactive"),e.disabled=!0,e.textContent="Сохранение..."}P.addEventListener("click",(function(){o(D)})),N.addEventListener("submit",(function(e){e.preventDefault(),I.setAttribute("disabled",!0),q(B,I.value,M(J),S),function(e){return fetch("".concat(i.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:i.headers,body:JSON.stringify({avatar:e})}).then(l)}(I.value).then((function(e){e.avatar=I.value})).then((function(){I.value="",H(J)})).then((function(){a(D)})).catch((function(e){return console.log(e)})).finally((function(){J.textContent="Сохранить",I.removeAttribute("disabled",!0)}))})),O={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save",inactiveButtonClass:"popup__save_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},Array.from(document.querySelectorAll(O.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);C(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),C(n,r,t)}))}))}(e,O)})),Promise.all([fetch("".concat(i.baseUrl,"/cards"),{headers:i.headers}).then(l),fetch("".concat(i.baseUrl,"/users/me"),{headers:i.headers}).then(l)]).then((function(e){var t,o,a=(o=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,c,u=[],i=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=a.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return u}}(t,o)||function(e,t){if(e){if("string"==typeof e)return E(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?E(e,t):void 0}}(t,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=a[0],u=a[1];s=u._id,n.textContent=u.name,r.textContent=u.about,B.src=u.avatar,c.forEach((function(e){var t=b(e,s);v.append(t)}))})).catch((function(e){return console.log(e)}))})();