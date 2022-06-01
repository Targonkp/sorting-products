//база данных в виде объекта массивов
let tvlist = {
    'Телевизор ТВ-1': [
        ['Модель', 'ТВ-1'],
        ['Диагональ', '32 дюйма'],
        ['Цена', '23000 рублей'],
        ['data-sort', '1'],
        ['data-rating', '20']
    ],
    'Телевизор ТВ-3': [
        ['Модель', 'ТВ-3'],
        ['Диагональ', '50 дюйм'],
        ['Цена', '29000 рублей'],
        ['data-sort', '3'],
        ['data-rating', '25']
    ],
    'Телевизор ТВ-2': [
        ['Модель', 'ТВ-2'],
        ['Диагональ', '55 дюймов'],
        ['Цена', '34000 рублей'],
        ['data-sort', '2'],
        ['data-rating', '15']
    ],
    'Телевизор ТВ-5': [
        ['Модель', 'ТВ-5'],
        ['Диагональ', '22 дюйма'],
        ['Цена', '15000 рублей'],
        ['data-sort', '5'],
        ['data-rating', '32']
    ],
    'Телевизор ТВ-4': [
        ['Модель', 'ТВ-4'],
        ['Диагональ', '21 дюйм'],
        ['Цена', '14000 рублей'],
        ['data-sort', '4'],
        ['data-rating', '27']
    ],
    'Телевизор ТВ-8': [
        ['Модель', 'ТВ-8'],
        ['Диагональ', '23 дюйма'],
        ['Цена', '14900 рублей'],
        ['data-sort', '8'],
        ['data-rating', '31']
    ],
    'Телевизор ТВ-6': [
        ['Модель', 'ТВ-6'],
        ['Диагональ', '19 дюймов'],
        ['Цена', '10000 рублей'],
        ['data-sort', '6'],
        ['data-rating', '45']
    ],
    'Телевизор ТВ-7': [
        ['Модель', 'ТВ-7'],
        ['Диагональ', '50 дюймоd'],
        ['Цена', '27000 рублей'],
        ['data-sort', '7'],
        ['data-rating', '11']
    ],
    'Телевизор ТВ-9': [
        ['Модель', 'ТВ-9'],
        ['Диагональ', '20 дюймоd'],
        ['Цена', '12000 рублей'],
        ['data-sort', '9'],
        ['data-rating', '53']
    ],
    'Телевизор ТВ-10': [
        ['Модель', 'ТВ-10'],
        ['Диагональ', '35 дюймоа'],
        ['Цена', '23000 рублей'],
        ['data-sort', '10'],
        ['data-rating', '23']
]
};

let keys = Object.keys(tvlist);

let products = document.querySelector('.products__text');
let pagination = document.querySelector('.pagination');
let sorting = document.querySelector('.sorting');
let notesOnPage = 3; //количество записей на одной странице по умолчанию

//создаю li с номерами пагинации - для этого делю общую длину массива на количество записей и округляю в большую сторону
function createPaginationEl() {
    for (let i = 1; i <= Math.ceil(keys.length / notesOnPage); i++) {
        let li = document.createElement('li');
        li.className = 'pagination__element';
        li.innerHTML = i;
        pagination.appendChild(li);
    }
    document.querySelectorAll('.pagination__element')[0].classList.add('pagination__element-active');
}

createPaginationEl();

//навешиваю обработчики на количество элементов, которые необходимо отображать на одной странице
sorting.addEventListener(
    'click',
    (event) => {
        if (event.target.classList.contains('sorting__element')) {
            document.querySelectorAll('.sorting__element').forEach(
                item => item.classList.remove('sorting__element-active')
            )
            event.target.classList.add('sorting__element-active');
            notesOnPage = +event.target.textContent; //перезаписываю notesOnPage
            pagination.innerHTML = ''; //удаляю имеющуюся пагинацию
            createPaginationEl(); //добавляю новое количество элементов пагинации в зависимости от notesOnPage
            startPage(notesOnPage); //добавляю "стартовую" функцию, чтобы количество товаров изменялось сразу
        }
    }
)

//навешиваю обработчик на пагинацию
pagination.addEventListener(
    'click',
    function (event) {
        if (event.target.classList.contains('pagination__element')) {
            document.querySelectorAll('.pagination__element').forEach(
                item => item.classList.remove('pagination__element-active')
            )
            products.innerHTML = '';
            event.target.classList.add('pagination__element-active');
            createProducts(event);
        }
    }
)

//"стартовая" функция, которая отображает товары сразу при загрузке страницы
function startPage(end) {
    products.innerHTML = ''; //обнуляю отображаемые товары, иначе они будут прибавляться друг к другу
    let notes = keys.slice(0, end);
    let obj = notes.reduce((a, b) => (a[b] = tvlist[b], a), {});
    newPage(obj);
}

startPage(notesOnPage);

//основная функция, которая отвечает за отображение определенного куска массива товаров
function createProducts(event) {
    let pageNum = +event.target.innerHTML;
    let start = (pageNum - 1) * notesOnPage; //получаю стартовое значение для куска массива
    let end = start + notesOnPage; //получаю конечное значение для куска массива
    let notes = keys.slice(start, end); //получаю нужный кусок массива
    let obj = notes.reduce((a, b) => (a[b] = tvlist[b], a), {});
    newPage(obj);
}


//функция, которая отвечает за создание товаров на странице
function newPage(productsList) {
    for (let key in productsList) {
        let productEl = document.createElement('div'); //создаю новый товар
        productEl.innerHTML = `<p class="products-text__header">${key}</p>`;
        productEl.className = 'products-text__element';
        productEl.setAttribute('data-sort', productsList[key][3][1]);
        productEl.setAttribute('data-rating', productsList[key][4][1]);

        //здесь получаю сумму в виде строки, разбиваю ее на части и отфильтровываю, чтобы убрать слово рубли
        let price = productsList[key][2][1].split(' ').filter(item => item !== 'рублей').join(' ');

        //полученную сумму в цифрах (без слова рубли) добавлю в дата-аттрибут
        productEl.setAttribute('data-price', price);

        products.appendChild(productEl);

        //прохожу по первым трем значениям в товаре (модель, диагональ, цена), чтобы вывести их
        for (let i = 0; i < 3; i++) {
            let productOptions = document.createElement('p');
            productOptions.innerHTML = `<p>${productsList[key][i][0]}: ${productsList[key][i][1]}</p>`;
            productEl.appendChild(productOptions);
        }
    }
}

//сортировка по возрастанию - вначале преобразую node лист в массив, который в дальнейшем сортирую и к каждому элементу вызываю callback
function sortAscending () {
    Array
        .from(products.children)
        .sort((a, b) => a.getAttribute('data-price') - b.getAttribute('data-price'))
        .forEach(el => products.appendChild(el))
}

//сортировка по убыванию
function sortDescending(){
    Array
        .from(products.children)
        .sort((a, b) => b.getAttribute('data-price') - a.getAttribute('data-price'))
        .forEach(el => products.appendChild(el))
}

//сортировка по названию
function sortName(){
    Array
        .from(products.children)
        .sort((a, b) => a.getAttribute('data-sort') - b.getAttribute('data-sort'))
        .forEach(el => products.appendChild(el))
}


function sortRating(){
    //Сразу получаю массив через "Остаточные параметры и оператор расширения"
    [...document.querySelectorAll('div[data-rating')]
        .sort((a, b) => b.dataset.rating - a.dataset.rating)
        //получаю через closest ближайший родительский элемент и добавляю элемент к нему
        .forEach(el => el.closest('.products__text').append(el));
}

document.getElementById('ascending').addEventListener(
    'click',
    sortAscending
)

document.getElementById('descending').addEventListener(
    'click',
    sortDescending
)

document.getElementById('rating').addEventListener(
    'click',
    sortRating
)

document.getElementById('name').addEventListener(
    'click',
    sortName
)
