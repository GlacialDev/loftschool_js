/* Задание со звездочкой */

/*
Создайте страницу с кнопкой.
При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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
const addDivButton = homeworkContainer.querySelector('#addDiv');
let currentDrag = {}

addDivButton.addEventListener('click', function () {
    const div = createDiv();

    homeworkContainer.appendChild(div);
});

addListeners()

/*
Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

Пример:
const newDiv = createDiv();
homeworkContainer.appendChild(newDiv);
*/
function createDiv() {
    const newDiv = document.createElement('div');

    newDiv.classList.add('draggable-div');
    newDiv.style.width = `${randomValue(50, 200)}px`;
    newDiv.style.height = `${randomValue(50, 200)}px`;
    newDiv.style.backgroundColor = `rgb(${randomValue(0, 255)}, ${randomValue(0, 255)}, ${randomValue(0, 255)})`;
    newDiv.style.position = 'absolute';
    newDiv.style.top = `${randomValue(0, 100)}%`;
    newDiv.style.left = `${randomValue(0, 100)}%`;
    newDiv.style.cursor = 'grab';
    newDiv.setAttribute('draggable', true);

    return newDiv
}

/*
Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

Пример:
const newDiv = createDiv();
homeworkContainer.appendChild(newDiv);
addListeners(newDiv);
*/
function addListeners() {
    document.addEventListener('dragstart', e => {
        if (e.target.classList.contains('draggable-div')) {
            let boxModel = e.target.getBoundingClientRect();
            // в скобках оффсеты указывают текущую прокрутку если она есть
            // а boxmodel.left/top - положение элемента на начало драга
            // e.pageX/Y - положение мышки когда был начат драг
            // соответственно shiftX/Y - сдвиг мышки относительно top 0 left 0 элемента
            let shiftX = e.pageX - (boxModel.left + pageXOffset)
            let shiftY = e.pageY - (boxModel.top + pageYOffset)

            currentDrag = { container: homeworkContainer, node: e.target, shiftX: shiftX, shiftY: shiftY };
            e.dataTransfer.setData('text/html', 'dragstart');
        }
    });
    document.addEventListener('dragover', e => {
        if (homeworkContainer) {
            e.preventDefault();
        }
    });
    document.addEventListener('drop', e => {
        if (currentDrag) {
            e.preventDefault();

            if (homeworkContainer) {
                e.stopPropagation();
            }

            let Xcoord = e.pageX - currentDrag.shiftX;
            let Ycoord = e.pageY - currentDrag.shiftY;

            currentDrag.node.style.left = Xcoord + 'px';
            currentDrag.node.style.top = Ycoord + 'px';

            return false;
        }
    })
}

function randomValue(min, max) {
    return Math.random() * (max - min) + min
}

export {
    createDiv
};
