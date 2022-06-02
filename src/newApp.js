//база данных в виде массива объектов
let tvlist = [
    {model: 'ТВ-8', diagonal: '36 дюймов', price: '25000 рублей', dataSort: '8', dataRating: '20', image: 'images/tv-image-1.jpg'},
    {model: 'ТВ-1', diagonal: '32 дюйма', price: '23000 рублей', dataSort: '1', dataRating: '10', image: 'images/tv-image-2.jpg'},
    {model: 'ТВ-3', diagonal: '30 дюймов', price: '21000 рублей', dataSort: '3', dataRating: '15', image: 'images/tv-image-3.jpg'},
    {model: 'ТВ-5', diagonal: '23 дюйма', price: '15000 рублей', dataSort: '5', dataRating: '17', image: 'images/tv-image-4.jpg'},
    {model: 'ТВ-2', diagonal: '34 дюйма', price: '35500 рублей', dataSort: '2', dataRating: '45', image: 'images/tv-image-5.jpg'},
    {model: 'ТВ-6', diagonal: '55 дюймов', price: '54000 рублей', dataSort: '6', dataRating: '16', image: 'images/tv-image-1.jpg'},
    {model: 'ТВ-7', diagonal: '28 дюймов', price: '17501 рубль', dataSort: '7', dataRating: '7', image: 'images/tv-image-2.jpg'},
    {model: 'ТВ-9', diagonal: '26 дюймов', price: '17562 рубля', dataSort: '9', dataRating: '17', image: 'images/tv-image-3.jpg'},
    {model: 'ТВ-8', diagonal: '58 дюймов', price: '37800 рублей', dataSort: '8', dataRating: '8', image: 'images/tv-image-4.jpg'},
    {model: 'ТВ-10', diagonal: '26 дюймов', price: '12561 рубль', dataSort: '10', dataRating: '17', image: 'images/tv-image-5.jpg'},
    {model: 'ТВ-12', diagonal: '52 дюйма', price: '42800 рублей', dataSort: '12', dataRating: '3', image: 'images/tv-image-1.jpg'},
    {model: 'ТВ-11', diagonal: '28 дюймов', price: '18000 рублей', dataSort: '11', dataRating: '19', image: 'images/tv-image-2.jpg'},
    {model: 'ТВ-13', diagonal: '58 дюймов', price: '34700 рублей', dataSort: '13', dataRating: '48', image: 'images/tv-image-3.jpg'},
    {model: 'ТВ-14', diagonal: '35 дюймов', price: '22800 рублей', dataSort: '14', dataRating: '18', image: 'images/tv-image-4.jpg'},
]


let products = document.querySelector('.products__text');
let pagination = document.querySelector('.pagination');
let sorting = document.querySelector('.sorting');
let notesOnPage = 3; //количество записей на одной странице по умолчанию

//функция, перебирающся элементы объекта по цене и удаляющся слово "рублей, рубль"
function priceName() {
    tvlist.forEach(
        item => {
            //здесь получаю сумму в виде строки, разбиваю ее на части и отфильтровываю, чтобы убрать слово рубли
            item.price = item.price.split(' ').filter(elem => elem !== 'рублей' && elem !== 'рубль' && elem !== 'рубля').join('');
        }
    );
}

//создаю li с номерами пагинации - для этого делю общую длину массива на количество записей и округляю в большую сторону
function createPaginationEl() {
    for (let i = 1; i <= Math.ceil(tvlist.length / notesOnPage); i++) {
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

//функция, отвечающая за создание элементов на странице
function newPage(productsList) {
    products.innerHTML = '';
    for (let key in productsList){
        let productEl = document.createElement('div'); //создаю новый товар
        productEl.innerHTML = `
        <div class="product-image">
        <img src="${productsList[key].image}" alt="" class="products-text__image"> 
        </div>     
        <div class="product-info">
        <p class="products-text__header">Название модели: ${productsList[key].model}</p>
    <p>Диагональ: ${productsList[key].diagonal}</p>
    <p>Стоимость: ${productsList[key].price} &#8381;</p>
    <p>Рейтинг: ${productsList[key].dataRating}</p>
    </div>
    `;
        productEl.className = 'products-text__element';
        productEl.setAttribute('data-sort', productsList[key].dataSort);
        productEl.setAttribute('data-rating', productsList[key].dataRating);
        products.appendChild(productEl);
    }
}

//"стартовая" функция, которая отображает товары сразу при загрузке страницы
function startPage(end) {
    products.innerHTML = ''; //обнуляю отображаемые товары, иначе они будут прибавляться друг к другу
    priceName();
    let newObj = tvlist.slice(0, end);
    newPage(newObj);
}

startPage(notesOnPage);

//основная функция, которая отвечает за отображение определенного куска массива товаров
function createProducts(event) {
    let pageNum = +event.target.innerHTML;
    let start = (pageNum - 1) * notesOnPage; //получаю стартовое значение для куска массива
    let end = start + notesOnPage; //получаю конечное значение для куска массива
    let newObj = tvlist.slice(start, end); //получаю нужный кусок массива
    newPage(newObj);
}


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

//сортировка по возрастанию
function sortAscending(arr) {
    priceName();
    //сортирую по цене
    arr.sort((a, b) => a.price - b.price); //сортирую текущий объект массивов
    let newObj = arr.slice(0, notesOnPage); //получаю нужный кусок и присваиваю его новому объекту
    console.log(newObj);
    newPage(newObj); //вывожу получившийся кусок на страницу
}

//сортировка по убыванию
function sortDescending(arr) {
    priceName();
    //сортирую по цене
    arr.sort((a, b) => b.price - a.price); //сортирую текущий объект массивов
    let newObj = arr.slice(0, notesOnPage); //получаю нужный кусок и присваиваю его новому объекту
    console.log(newObj);
    newPage(newObj); //вывожу получившийся кусок на страницу
}

//сортировка по имени
function sortName(arr){
    arr.sort((a,b) => a.dataSort - b.dataSort);
    let newObj = arr.slice(0, notesOnPage); //получаю нужный кусок и присваиваю его новому объекту
    newPage(newObj); //вывожу получившийся кусок на страницу
}

//сортировка по популярности
function sortRating(arr){
    arr.sort((a,b) => b.dataRating - a.dataRating);
    let newObj = arr.slice(0, notesOnPage); //получаю нужный кусок и присваиваю его новому объекту
    newPage(newObj);
}

//по возрастанию
document.getElementById('ascending').addEventListener(
    'click',
    () => {
        sortAscending(tvlist);
    }
)

//по убыванию
document.getElementById('descending').addEventListener(
    'click',
    () => {
        sortDescending(tvlist);
    }
)

//по популярности
document.getElementById('rating').addEventListener(
    'click',
    () => {
        sortRating(tvlist);
    }
)

//по названию
document.getElementById('name').addEventListener(
    'click',
    () => {
        sortName(tvlist);
    }
)
