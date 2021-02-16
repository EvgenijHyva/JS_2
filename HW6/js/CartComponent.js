Vue.component('basket', {
    props: ["basket", "img", "show"],
    template: `
        <div class="cart-block" v-if="show">
        <p v-if="!basket.length">Корзина пуста</p>
            <cart-item v-for="item of basket" :key="item.id_product" :img="img" :item="item" :basket="basket" >
            </cart-item>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'item', 'basket'],
    template: `<div class="cart-item">
                    <div class="product-bio">
                    <img :src="img" alt="product pick">
                        <div class="product-desc">
                            <p class="product-title basket-info"> {{item.product_name}} </p>
                            <p class="product-quantity basket-info"> {{item.quantity}}/шт.</p>
                            <p class="product-single-price basket-info"> {{item.price}} шт. </p>
                        </div>
                        <div class="right-block">
                            <p class="product-price"> Цена: {{item.quantity*item.price}} </p>
                            <button class="del-btn" @click="$parent.$emit('remove', item)">&times;</button>
                        </div>
                    </div>                  
                    <p v-if="basket.length" class="total-price"> Цена товаров: {{ basket.length ? $parent.$parent.calcSum() : "пусто" }}
                        <button>next</button>
                    </p>            
                </div> `
})

