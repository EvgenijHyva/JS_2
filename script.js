// обращаемся к файлу https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json

const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/";


class GoodsBasket {
    constructor(container = ".basket") {
        this.container = container;
        this.basket = [];
        this._init();
    }

    addToBasket(obj) {
        console.log(obj) // target object
        let productID = +obj.id; // Object ID

        let find = this.basket.find(product => product.id === productID)
        // console.log(find, "find") // basket object
        if (find) {
            find.quantity++;
            console.log(find)
            this.render()
        } else {
            let product = {
                id_product: +obj.id,
                product_name: obj.name,
                price: +obj.price
            };
            let smallProd = new ProductSmall(product);
            this.basket.push(smallProd)
            this.render()
        }
        console.log(this.basket)

    }
    removeFromBasket(obj) {
        let productID = +obj.id;
        let find = this.basket.find(product => product.id === productID);
        if (find.quantity > 1) {
            find.quantity--;
            this.render()
        } else {

            this.basket.splice(this.basket.indexOf(find), 1);
            document.querySelector(`.card-item[data-id="${productID}"]`).remove();
        }
    }

    render() {
        const container = document.querySelector(this.container);
        container.innerHTML = "";
        //console.log(this, basket, "basket check")
        this.basket.forEach(prod => {
            container.insertAdjacentHTML("beforeend", prod.renderProduct())
        })
    }


    calcSum() {
        return this.basket.reduce((total, item) => total += item.price, 0);
    }


    _init() {
        document.querySelector(".btn-cart").addEventListener("click", () => {
            document.querySelector(this.container).classList.toggle("invisible");
            this.render()
        });
        document.querySelector(this.container).addEventListener('click', (e) => {
            if (e.target.classList.contains('del-btn')) {
                this.removeFromBasket(e.target.dataset);
                //console.log(e)
            }
        })
    }
}

class ProductList {
    constructor(basket, container = ".products") {
        this.container = container;
        this.basket = basket;
        this.goods = []; //JSON objects from API
        this.goodsObj = []; // Objects of class Product
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                console.log(this.goods, "goods");  // Отладка
                console.log(this.goodsObj, "goodsOBJ");
                this.render();
            });
        this._init();
    }
    _getProducts() {
        return fetch(`${API}catalogData.json`)
            .then(result => result.json())
            .catch(err => console.log(err));
    }
    render() {
        const container = document.querySelector(this.container);
        this.goods.forEach(item => {
            let productObj = new Product(item);
            this.goodsObj.push(productObj);
            container.insertAdjacentHTML("beforeend", productObj.renderProduct())
        })
    }
    _init() { // кнопка добавления товара
        document.querySelector(this.container).addEventListener("click", e => {
            //console.log(e.target.dataset)
            //console.log(e.target.classList.contains("buy-btn"))
            if (e.target.classList.contains("buy-btn")) {
                basket.addToBasket(e.target.dataset) // Довавление в корзину
            }
        })
    }
}

class Product {
    constructor(product, img = "https://placehold.it/200x150") {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    renderProduct() {
        return `<div class="product-item data-id="${this.id}">
        <img src="${this.img}">
        <div class="desc">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <button class="buy-btn" 
        data-id="${this.id}"
        data-name="${this.title}"
        data-price="${this.price}">Купить</button>
        </div>
        </div>`
    }
}

// Для корзины:
class ProductSmall extends Product {
    constructor(product, img = "https://placehold.it/50x100") {
        super(product, img);
        this.quantity = 1;
    }
    renderProduct() {
        return `<div class="card-item" data-id="${this.id}">
        <div class="product-bio">
        <img src="${this.img}">
        <div class="product-desc">
        <p class="product-title">${this.title}</p>
        <p class="product-quantity">Quantity: ${this.quantity}</p>
        <p product-single-price>$${this.price} each</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">$${this.quantity * this.price} total</p>
            <button class="del-btn" data-id="${this.id}">&times;</button>
        </div>
        </div>`
    }
}


let basket = new GoodsBasket();
let list = new ProductList(basket);
