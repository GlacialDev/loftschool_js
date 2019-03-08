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

renderTable(cookieParse());

filterNameInput.addEventListener('keyup', function () {
    let cookieObject = cookieParse();
    let cookieForRender = {};

    for (let cookie in cookieObject) {
        if (cookie) {
            if (cookie.indexOf(filterNameInput.value) !== -1 ||
                cookieObject[cookie].indexOf(filterNameInput.value) !== -1) {
                cookieForRender[cookie] = cookieObject[cookie]
            }
        }
    }

    renderTable(cookieForRender);
});

addButton.addEventListener('click', () => {
    setCookie(addNameInput.value, addValueInput.value, 31);
    renderTable(cookieParse());

    addNameInput.value = '';
    addValueInput.value = '';
});

// используем делегирование в пределах таблицы для кнопок удаления куки
listTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('cookie-button')) {
        let cookieName = e.target.parentNode.parentNode.firstChild.innerText;

        deleteCookie(cookieName);
        e.target.parentNode.parentNode.remove();
        renderTable(cookieParse());
    }
})

function setCookie(name, value, options) {
    if (name.trim() === '') {
        return;
    }

    options = options || {};

    let expires = options.expires;

    if (typeof expires == 'number' && expires) {
        let d = new Date();

        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + '=' + value;

    for (let propName in options) {
        if (propName) {
            updatedCookie += '; ' + propName;
            let propValue = options[propName];

            if (propValue !== true) {
                updatedCookie += '=' + propValue;
            }
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, '', {
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

function renderTable(cookieObject) {
    listTable.innerHTML = ''

    for (let cookie in cookieObject) {
        if (cookie) {
            let tr = document.createElement('tr');

            tr.innerHTML = `<th>${cookie}</th><th>${cookieObject[cookie]}</th>
            <th><button type="button" class="cookie-button">Удалить cookie</button></div></th>`;
            listTable.appendChild(tr);
        }
    }
}