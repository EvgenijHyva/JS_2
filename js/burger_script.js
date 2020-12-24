class Option {
    constructor(input) {
        this.name = input.value;
        this.price = +input.dataset["price"];
        this.calories = +input.dataset["calories"];
    }
}


class Burger {
    constructor(size, add, toping) {
        this.size = new Option(this._select(size));
        this.add = new Option(this._select(add));
        this.topings = this._getToppings(toping);
    }

    _getToppings(name) {
        let result = [];
        this._selectAll(name).forEach(element => {
            console.log(element);
            result.push(new Option(element))
        });
        return result;
    }
    _select(name) {
        let result = document.querySelector(`input[name=${name}]:checked`);
        console.log(result)
        return result
    }

    _selectAll(name) {
        let result = [...document.querySelectorAll(`input[name=${name}]:checked`)];
        console.log(result)
        return result
    }
    _sumPrice() {
        let result = this.size.price + this.add.price;
        this.topings.forEach(element => {
            console.log("price =", element.price);
            result += element.price;
        });
        return result;
    }
    _sumCalories() {
        let result = this.size.calories + this.add.calories;
        this.topings.forEach(element => {
            console.log("calories =", element.calories);
            result += element.calories;
        });
        return result;
    }
    showSum(price, calories) {
        document.querySelector(price).textContent = this._sumPrice();
        document.querySelector(calories).textContent = this._sumCalories();
    }
}