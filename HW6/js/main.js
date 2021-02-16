const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        basketJson: "/getBasket.json",
        imgCatalog: 'https://placehold.it/200x150',
        showBasket: false, // Отображение корзины
        basket: [], // массив корзины юзера
        imgBasket: 'https://placehold.it/50x80', // картинка корзины
        filtered: [], // отображение поисковика
        localGetProducts: `getProducts.json`,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product.id_product);
        },
        filter(userSearch) {
            let regexp = new RegExp(userSearch, "ig")
            this.filtered = this.products.filter(item => regexp.test(item.product_name))
        },
        calcSum() {
            return this.basket.reduce((accum, item) => accum += item.price * item.quantity, 0);
        },
        removeProduct(element) { // ТУТ
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        //console.log(element)
                        let productId = +element.id_product;
                        let find = this.basket.find(product => product.id_product === productId);
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.basket.splice(this.basket.indexOf(find), 1);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        addProduct(element) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let productId = +element.id_product;
                        let find = this.basket.find(product => product.id_product === productId);
                        if (find) {
                            find.quantity++;
                        } else {
                            let product = {
                                id_product: productId,
                                price: +element.price,
                                product_name: element.product_name,
                                quantity: 1
                            };
                            this.basket.push(product);
                        }
                    } else {
                        alert('Error');
                    }
                })
        }
    },

    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                //console.log(data)
                for (let el of data) {
                    this.products.push(el)
                    this.filtered.push(el)
                }
            });
        this.getJson(`${API + this.basketJson}`)
            .then(data => {
                for (let el of data.contents) { // массив товаров корзины хранятся в contents
                    this.basket.push(el)
                }
            });
        this.getJson(this.localGetProducts)
            .then(data => {
                for (let el of data) {
                    this.filtered.push(el)
                }
            })
            .catch(error => console.log("произошла ошибка: ", error))
    }
})