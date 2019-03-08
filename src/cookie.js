/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function () {
  // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
  for (let i = 0; i < listTable.children.length; i++) {
    let name = listTable.children[i].children[0].innerText
    let value = listTable.children[i].children[1].innerText

    if (name.indexOf(filterNameInput.value) !== -1 || value.indexOf(filterNameInput.value) !== -1) {
      listTable.children[i].hidden = false
    } else {
      listTable.children[i].hidden = true
    }
  }

});

addButton.addEventListener('click', () => {
  // здесь можно обработать нажатие на кнопку "добавить cookie"
  if (document.cookie !== '') {
    let cookieObject = cookieParse()
    let cookieNamesArray = Object.keys(cookieObject)
    let isCookieDontExist = 1

    for (let i = 0; i < cookieNamesArray.length; i++) {
      if (addNameInput.value === cookieNamesArray[i]) {
        // если имя куки совпадает с одним из имен ключей в объекте из cookieParse
        // мы заменяем имя куки в табличке, и ставим новое значение куки методом setCookie
        // переключаем флаг, указывающий на то, надо ли создавать новую строку в таблице
        listTable.children[i].children[1].innerText = addValueInput.value;
        setCookie(addNameInput.value, addValueInput.value);
        isCookieDontExist = 0;
      }
    }

    if (isCookieDontExist) createNewTr(addNameInput.value, addValueInput.value)

  } else {
    createNewTr(addNameInput.value, addValueInput.value)
  }

  addNameInput.value = ''
  addValueInput.value = ''
});


function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}

function cookieParse() {
  let cookieObject = document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev
  }, {});
  return cookieObject
}

function createNewTr(name, value) {
  setCookie(name, value, 31)
  let tr = document.createElement('tr');
  tr.innerHTML = `<th>${name}</th><th>${value}</th><th><button type="button" id="cookie-${name}">Удалить cookie</button></div></th>`;

  listTable.appendChild(tr);

  let removeCookieBtn = tr.querySelector(`#cookie-${name}`);

  removeCookieBtn.addEventListener('click', () => {
    let cookieName = tr.firstChild.innerText.trim()

    deleteCookie(cookieName)
    removeCookieBtn.parentNode.parentNode.remove();
  })
}