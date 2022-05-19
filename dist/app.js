let products = document.querySelector('.products__text');

//база данных в виде объекта массивов
let productsList = {
  'Телевизор ТВ-1': [
    ['Модель', 'ТВ-1'],
    ['Диагональ', '32 дюйма'],
    ['Цена', '23000 рублей'],
    ['data-sort', '1'],
    ['data-rating', '20'],
  ],
  'Телевизор ТВ-3': [
    ['Модель', 'ТВ-3'],
    ['Диагональ', '50 дюйм'],
    ['Цена', '29000 рублей'],
    ['data-sort', '3'],
    ['data-rating', '25'],
  ],
  'Телевизор ТВ-2': [
    ['Модель', 'ТВ-2'],
    ['Диагональ', '55 дюймов'],
    ['Цена', '34000 рублей'],
    ['data-sort', '2'],
    ['data-rating', '15'],
  ],
  'Телевизор ТВ-5': [
    ['Модель', 'ТВ-5'],
    ['Диагональ', '22 дюйма'],
    ['Цена', '15000 рублей'],
    ['data-sort', '5'],
    ['data-rating', '32'],
  ],
  'Телевизор ТВ-4': [
    ['Модель', 'ТВ-4'],
    ['Диагональ', '21 дюйм'],
    ['Цена', '14000 рублей'],
    ['data-sort', '4'],
    ['data-rating', '27'],
  ],
  'Телевизор ТВ-8': [
    ['Модель', 'ТВ-8'],
    ['Диагональ', '23 дюйма'],
    ['Цена', '14900 рублей'],
    ['data-sort', '8'],
    ['data-rating', '31'],
  ],
  'Телевизор ТВ-6': [
    ['Модель', 'ТВ-6'],
    ['Диагональ', '19 дюймов'],
    ['Цена', '10000 рублей'],
    ['data-sort', '6'],
    ['data-rating', '45'],
  ],
  'Телевизор ТВ-7': [
    ['Модель', 'ТВ-7'],
    ['Диагональ', '50 дюймоа'],
    ['Цена', '27000 рублей'],
    ['data-sort', '7'],
    ['data-rating', '11'],
  ],
};

for (let key in productsList) {
  let productEl = document.createElement('div'); //создаю новый товар
  productEl.innerHTML = `<p class="products-text__header">${key}</p>`;
  productEl.className = 'products-text__element';
  productEl.setAttribute('data-sort', productsList[key][3][1]);
  productEl.setAttribute('data-rating', productsList[key][4][1]);

  //здесь получаю сумму в виде строки, разбиваю ее на части и отфильтровываю, чтобы убрать слово рубли
  let price = productsList[key][2][1]
    .split(' ')
    .filter((item) => item !== 'рублей')
    .join(' ');

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

// function sortAscending () {
//     //вначале преобразую node лист в массив, который в дальнейшем сортирую и к каждому элементу вызываю callback
//     Array
//         .from(products.children)
//         .sort((a, b) => a.getAttribute('data-sort') - b.getAttribute('data-sort'))
//         .forEach(el => products.appendChild(el))
// }

//сортировка по возрастанию - вначале преобразую node лист в массив, который в дальнейшем сортирую и к каждому элементу вызываю callback
function sortAscending() {
  Array.from(products.children)
    .sort((a, b) => a.getAttribute('data-price') - b.getAttribute('data-price'))
    .forEach((el) => products.appendChild(el));
}

//сортировка по убыванию
function sortDescending() {
  Array.from(products.children)
    .sort((a, b) => b.getAttribute('data-price') - a.getAttribute('data-price'))
    .forEach((el) => products.appendChild(el));
}

//сортировка по названию
function sortName() {
  Array.from(products.children)
    .sort((a, b) => a.getAttribute('data-sort') - b.getAttribute('data-sort'))
    .forEach((el) => products.appendChild(el));
}

function sortRating() {
  //Сразу получаю массив через "Остаточные параметры и оператор расширения"
  [...document.querySelectorAll('div[data-rating')]
    .sort((a, b) => b.dataset.rating - a.dataset.rating)
    //получаю через closest ближайший родительский элемент и добавляю элемент к нему
    .forEach((el) => el.closest('.products__text').append(el));
}

document.getElementById('ascending').addEventListener('click', sortAscending);

document.getElementById('descending').addEventListener('click', sortDescending);

document.getElementById('rating').addEventListener('click', sortRating);

document.getElementById('name').addEventListener('click', sortName);
