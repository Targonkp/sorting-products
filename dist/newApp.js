//база данных в виде массива объектов
let tvlist = [
  {
    model: 'ТВ-8',
    diagonal: '36 дюймов',
    price: '25000 рублей',
    dataSort: '8',
    dataRating: '20',
    image: 'images/tv-image-1.jpg',
    brand: 'Abrand',
  },
  {
    model: 'ТВ-1',
    diagonal: '30 дюймов',
    price: '23000 рублей',
    dataSort: '1',
    dataRating: '10',
    image: 'images/tv-image-2.jpg',
    brand: 'Abrand',
  },
  {
    model: 'ТВ-3',
    diagonal: '30 дюймов',
    price: '21000 рублей',
    dataSort: '3',
    dataRating: '15',
    image: 'images/tv-image-3.jpg',
    brand: 'Bbrand',
  },
  {
    model: 'ТВ-5',
    diagonal: '23 дюйма',
    price: '15000 рублей',
    dataSort: '5',
    dataRating: '17',
    image: 'images/tv-image-4.jpg',
    brand: 'Abrand',
  },
  {
    model: 'ТВ-2',
    diagonal: '34 дюйма',
    price: '35500 рублей',
    dataSort: '2',
    dataRating: '45',
    image: 'images/tv-image-5.jpg',
    brand: 'Cbrand',
  },
  {
    model: 'ТВ-6',
    diagonal: '55 дюймов',
    price: '54000 рублей',
    dataSort: '6',
    dataRating: '16',
    image: 'images/tv-image-1.jpg',
    brand: 'Bbrand',
  },
  {
    model: 'ТВ-7',
    diagonal: '28 дюймов',
    price: '17501 рубль',
    dataSort: '7',
    dataRating: '7',
    image: 'images/tv-image-2.jpg',
    brand: 'Abrand',
  },
  {
    model: 'ТВ-9',
    diagonal: '26 дюймов',
    price: '17562 рубля',
    dataSort: '9',
    dataRating: '17',
    image: 'images/tv-image-3.jpg',
    brand: 'Ebrand',
  },
  {
    model: 'ТВ-8',
    diagonal: '58 дюймов',
    price: '37800 рублей',
    dataSort: '8',
    dataRating: '8',
    image: 'images/tv-image-4.jpg',
    brand: 'Ebrand',
  },
  {
    model: 'ТВ-10',
    diagonal: '26 дюймов',
    price: '12561 рубль',
    dataSort: '10',
    dataRating: '17',
    image: 'images/tv-image-5.jpg',
    brand: 'Abrand',
  },
  {
    model: 'ТВ-12',
    diagonal: '52 дюйма',
    price: '42800 рублей',
    dataSort: '12',
    dataRating: '3',
    image: 'images/tv-image-1.jpg',
    brand: 'Dbrand',
  },
  {
    model: 'ТВ-11',
    diagonal: '28 дюймов',
    price: '18000 рублей',
    dataSort: '11',
    dataRating: '19',
    image: 'images/tv-image-2.jpg',
    brand: 'Bbrand',
  },
  {
    model: 'ТВ-13',
    diagonal: '58 дюймов',
    price: '34700 рублей',
    dataSort: '13',
    dataRating: '48',
    image: 'images/tv-image-3.jpg',
    brand: 'Dbrand',
  },
  {
    model: 'ТВ-14',
    diagonal: '35 дюймов',
    price: '22800 рублей',
    dataSort: '14',
    dataRating: '18',
    image: 'images/tv-image-4.jpg',
    brand: 'Cbrand',
  },
];

let products = document.querySelector('.products__text');
let pagination = document.querySelector('.pagination');
let sorting = document.querySelector('.sorting');
let notesOnPage = 3; //количество записей на одной странице по умолчанию
let newElementsList = tvlist;

//функция, перебирающся элементы объекта по цене и удаляющся слово "рублей, рубль"
function priceName() {
  tvlist.forEach((item) => {
    //здесь получаю сумму в виде строки, разбиваю ее на части и отфильтровываю, чтобы убрать слово рубли
    item.price = item.price
      .split(' ')
      .filter(
        (elem) => elem !== 'рублей' && elem !== 'рубль' && elem !== 'рубля'
      )
      .join('');
  });
}

//создаю li с номерами пагинации - для этого делю общую длину массива на количество записей и округляю в большую сторону
function createPaginationEl(array) {
  pagination.innerHTML = '';
  //проверяю длину массива (больше ли нуля), чтобы не было ошибки с навешиванием активного класса
  if (array.length > 0) {
    for (let i = 1; i <= Math.ceil(array.length / notesOnPage); i++) {
      let li = document.createElement('li');
      li.className = 'pagination__element';
      li.innerHTML = i;
      pagination.appendChild(li);
    }
    document
      .querySelectorAll('.pagination__element')[0]
      .classList.add('pagination__element-active');
  }
}

createPaginationEl(tvlist); //при загрузки страницы сразу вывожу пагинацию

//навешиваю обработчики на количество элементов, которые необходимо отображать на одной странице
sorting.addEventListener('click', (event) => {
  if (event.target.classList.contains('sorting__element')) {
    document
      .querySelectorAll('.sorting__element')
      .forEach((item) => item.classList.remove('sorting__element-active'));
    event.target.classList.add('sorting__element-active');
    notesOnPage = +event.target.textContent; //перезаписываю notesOnPage
    pagination.innerHTML = ''; //удаляю имеющуюся пагинацию
    createPaginationEl(newElementsList); //добавляю новое количество элементов пагинации в зависимости от notesOnPage
    startPage(newElementsList, notesOnPage); //добавляю "стартовую" функцию, чтобы количество товаров изменялось сразу
  }
});

//функция, отвечающая за создание элементов на странице
function newPage(productsList) {
  products.innerHTML = '';
  for (let key in productsList) {
    let productEl = document.createElement('div'); //создаю новый товар
    productEl.innerHTML = `
        <div class="product-image">
        <img src="${productsList[key].image}" alt="" class="products-text__image"> 
        </div>
        <div class="product-loop-action">
      <a href="#" class="loop-action__link add-to-cart">Быстрый просмотр</a>
      <a href="#" class="loop-action__link loop-add-to-cart">В корзину</a>
    </div>     
        <div class="product-info">
        <p class="products-text__header">Название модели: ${productsList[key].model}</p>
        <p><strong>Бренд:</strong> ${productsList[key].brand}</p>
    <p><strong>Диагональ:</strong> ${productsList[key].diagonal}</p>
    <p><strong>Стоимость:</strong> ${productsList[key].price} &#8381;</p>
    <p><strong>Рейтинг:</strong> ${productsList[key].dataRating}</p>
    </div>
    `;
    productEl.className = 'products-text__element';
    productEl.setAttribute('data-sort', productsList[key].dataSort);
    productEl.setAttribute('data-rating', productsList[key].dataRating);
    productEl.setAttribute('data-brand', productsList[key].brand);
    products.appendChild(productEl);
  }
}

//"стартовая" функция, которая отображает товары сразу при загрузке страницы
function startPage(array, end) {
  products.innerHTML = ''; //обнуляю отображаемые товары, иначе они будут прибавляться друг к другу
  priceName();
  newPage(array.slice(0, end));
}

startPage(tvlist, notesOnPage);

//основная функция, которая отвечает за отображение определенного куска массива товаров
function createProducts(pageNum, array) {
  let start = (pageNum - 1) * notesOnPage; //получаю стартовое значение для куска массива
  let end = start + notesOnPage; //получаю конечное значение для куска массива
  newObj = array.slice(start, end); //получаю нужный кусок массива
  newPage(newObj);
}

//навешиваю обработчик на пагинацию
pagination.addEventListener('click', function (event) {
  let pageNum = +event.target.innerHTML;
  if (event.target.classList.contains('pagination__element')) {
    document
      .querySelectorAll('.pagination__element')
      .forEach((item) => item.classList.remove('pagination__element-active'));
    products.innerHTML = '';
    event.target.classList.add('pagination__element-active');
    createProducts(pageNum, newElementsList);
  }
});

//сортировка по возрастанию
function sortAscending(arr) {
  priceName();
  //сортирую по цене
  arr.sort((a, b) => a.price - b.price); //сортирую текущий объект массивов
  newObj = arr.slice(0, notesOnPage); //получаю нужный кусок и присваиваю его новому объекту
  newPage(newObj); //вывожу получившийся кусок на страницу
}

//сортировка по убыванию
function sortDescending(arr) {
  priceName();
  //сортирую по цене
  arr.sort((a, b) => b.price - a.price); //сортирую текущий объект массивов
  newObj = arr.slice(0, notesOnPage); //получаю нужный кусок и присваиваю его новому объекту
  newPage(newObj); //вывожу получившийся кусок на страницу
}

//сортировка по имени
function sortName(arr) {
  arr.sort((a, b) => a.dataSort - b.dataSort);
  newObj = arr.slice(0, notesOnPage); //получаю нужный кусок и присваиваю его новому объекту
  newPage(newObj); //вывожу получившийся кусок на страницу
}

//сортировка по популярности
function sortRating(arr) {
  arr.sort((a, b) => b.dataRating - a.dataRating);
  newObj = arr.slice(0, notesOnPage); //получаю нужный кусок и присваиваю его новому объекту
  newPage(newObj);
}

//по возрастанию
document.getElementById('ascending').addEventListener('click', () => {
  sortAscending(newElementsList);
});

//по убыванию
document.getElementById('descending').addEventListener('click', () => {
  sortDescending(newElementsList);
});

//по популярности
document.getElementById('rating').addEventListener('click', () => {
  sortRating(newElementsList);
});

//по названию
document.getElementById('name').addEventListener('click', () => {
  sortName(newElementsList);
});

//Получаю все названия брендов, перебираю их, через Set оставляю только уникальные названия и создаю элементы
let brands = [];
for (key in tvlist) {
  brands.push(tvlist[key].brand);
}
let newbrands = Array.from(new Set(brands)).sort(); //сразу сортирую по алфавиту названия брендов

for (let i = 0; i < newbrands.length; i++) {
  let brandElement = document.createElement('p');
  brandElement.innerHTML = `
        <div class="checkbox">
    <input class="custom-checkbox" data-brandname="${newbrands[i]}" type="checkbox" id="newbrands-${i}">
    <label for="newbrands-${i}">${newbrands[i]}</label>
  </div>
        `;
  document.getElementById('filters-brand').appendChild(brandElement);
}

//Получаю все значения диагонали, перебираю их, через Set оставляю только уникальные названия и создаю элементы
let diagonals = [];
for (key in tvlist) {
  diagonals.push(tvlist[key].diagonal);
}
let newDiagonals = Array.from(new Set(diagonals));
let newDiagonalsSort = newDiagonals.sort(
  (a, b) => parseFloat(a) - parseFloat(b)
);
for (let i = 0; i < newDiagonalsSort.length; i++) {
  let diagonalElement = document.createElement('p');
  diagonalElement.innerHTML = `
        <div class="checkbox">
    <input class="custom-checkbox" data-diagonalsize="${newDiagonalsSort[i]}" type="checkbox" id="diagonals-${i}">
    <label for="diagonals-${i}">${newDiagonals[i]}</label>
  </div>
        `;
  document.getElementById('filters-diagonal').appendChild(diagonalElement);
}

//Создаю массив с ценами и добавляю его в соответствующий блок фильтрациии

let prices = [
  '1-9999',
  '10000-19999',
  '20000-29999',
  '30000-39999',
  '40000-49999',
];

for (let i = 0; i < prices.length; i++) {
  let priceElement = document.createElement('p');
  priceElement.innerHTML = `
        <div class="checkbox">
    <input class="custom-checkbox" data-price="${prices[i]}" type="checkbox" id="prices-${i}">
    <label for="prices-${i}">${prices[i]}</label>
  </div>
        `;
  document.getElementById('filters-price').appendChild(priceElement);
}

document
  .querySelector('.filters__wrap')
  .addEventListener('change', function (event) {
    //добавляю эффект загрузки
    document
      .querySelector('.main-content')
      .classList.add('main-content_loading');
    //здесь возвращаю массив к исходной форме
    newElementsList = tvlist;
    //получаю список отмеченных элементов
    let checkedArray = [
      ...document.querySelectorAll('input[type="checkbox"]:checked'),
    ].length;

    //получаю список всех чекбоксов с data-brandname и состоянием checked
    let brands = [
      ...document.querySelectorAll('[type="checkbox"][data-brandname]:checked'),
    ];
    //получаю список всех чекбоксов с data-diagonalsize
    let diagonals = [
      ...document.querySelectorAll(
        '[type="checkbox"][data-diagonalsize]:checked'
      ),
    ];
    //получаю список всех чекбоксов с data-diagonalsize
    let prices = [
      ...document.querySelectorAll('[type="checkbox"][data-price]:checked'),
    ];

    //если длина массива с отмеченными элементами равна 0, то отображаю на странице товары из базового массива
    if (checkedArray === 0) {
      createPaginationEl(newElementsList);
      createProducts(1, newElementsList);
    }
    //если есть хоть один отмеченный чекбокс с data-price, то выполняю следующую функцию
    else {
      if (prices.length > 0) {
        prices.forEach(function (elem) {
          //с помощью регулярного выражения получаю только цифры из price и присваиваю их двум переменным min и max
          [min, max] = elem.dataset.price.match(/\d+/g);
          //выполняю проверку, чтобы удалить у всех checked кроме элемента, по которому был совершен клик в блоке с ценами
          if (
            event.target.hasAttribute('data-price') &&
            elem !== event.target
          ) {
            elem.checked = false;
          }
        });
        newElementsList = newElementsList.filter(
          (item) =>
            parseFloat(item.price) >= +min && parseFloat(item.price) <= +max
        );
      }

      //если есть хоть один отмеченный чекбокс с data-brandname, то выполняю следующую функцию
      if (brands.length > 0) {
        brands = brands.reduce(function (acc, brand) {
          acc.push(brand.dataset.brandname);
          return acc;
        }, []);
        newElementsList = newElementsList.filter((item) =>
          brands.includes(item.brand)
        );
      }
      if (diagonals.length > 0) {
        diagonals = diagonals.reduce(function (acc, diagonal) {
          acc.push(parseFloat(diagonal.dataset.diagonalsize));
          return acc;
        }, []);
        newElementsList = newElementsList.filter((item) =>
          diagonals.includes(parseFloat(item.diagonal))
        );
      }
    }

    console.log(newElementsList);
    createPaginationEl(newElementsList); //пагинация
    createProducts(1, newElementsList);

    //удаляю эффект загрузки

    setTimeout(() => {
      document
        .querySelector('.main-content')
        .classList.remove('main-content_loading');
    }, 500);
  });

//сброс всех фильтров с состоянием checked
document.querySelector('.reset').addEventListener('click', () => {
  let allCheckboxList = [...document.querySelectorAll('.custom-checkbox')];
  allCheckboxList.forEach((item) => (item.checked = false));
  newElementsList = tvlist; //здесь возвращаю массив к исходной форме
  createPaginationEl(newElementsList);
  createProducts(1, newElementsList);
});
