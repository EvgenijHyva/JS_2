const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];
//Функция для формирования верстки каждого товара
const renderProduct = (product, img = 'https://placehold.it/200x150') => {
    return `<div class="product-item">
                <img src="${img}">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
};

renderPage(products);





// Домашка ниже ->

//метод для Goodslist (так же легко адаптируется в класс)

function GoodsSum(arr = products) { // тест массива обьектов
    // через цикл for не интересно, reduse более быстрый
    let result = arr.reduce((sum, product) => sum += product.price, 0)
    return result
}

console.log("Общая стоимость товаров =", GoodsSum())



class goodsBasket {
    constructor(constainer = ".basket") {
        this.constainer = constainer;
        this.basket = [];
    }

    addToBasket() {

    }
    removeFromBasket() {

    }
    renderBasket() {

    }
}



class Product {
    constructor(title, price, id) {
        this.title = title;
        this.price = price;
        this.id = id;
    }
    renderProduct() {

    }
}