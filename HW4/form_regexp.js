class Validator {
    constructor(form) {
        this.patterns = {
            name: /^[a-zа-я]+$/i,
            phone: /^\+\d{1,5}\(\d{3}\)\d{3}-\d{2}\-\d{2}$/,
            email: /^[\w.]+-?_?[\w.]*@\w+\.[a-z]{2,5}$/i,
            text: /^[\w\d_-]+[\.*\!*\?*]*?$/i,
        };
        this.errors = {
            name: "Tолько буквы",
            phone: "Телефон, шаблон: +359(010)123-12-12",
            email: "шаблоны: my@email.com, my_@email.ru, my-super@mail.novyj, my.new-mail@mail.com",
            text: "Допускаются буквы, цифры, указанные спец знаки (.,?!)"
        };
        this.errorClass = "error"
        this.form = form
        this.valid = false;
        this._validateForm();
    }
    validate(regexp, value) {
        regexp.test(value)
    }
    _validateForm() {
        console.log(document.querySelector(`.${this.form}`).querySelectorAll(`.${this.errorClass}`))
        let errors = [...document.querySelector(`.${this.form}`).querySelectorAll(`.${this.errorClass}`)];
        errors.forEach(error => {
            error.remove();
            console.log(error)
        })


        let formFields = [...document.querySelector(`.${this.form}`).getElementsByClassName('input')];
        formFields.forEach(field => {
            this._validate(field);
        })
        //console.log([...document.querySelector(`.${this.form}`).querySelectorAll('.invalid')].length)
        if (![...document.querySelector(`.${this.form}`).querySelectorAll('.invalid')].length) {
            this.valid = true;
        }
    }
    _validate(field) {
        if (this.patterns[field.name]) {
            if (!this.patterns[field.name].test(field.value)) {  //test returns true or false
                field.classList.add('invalid');
                this._addErrorMSG(field)
                this._watchField(field)
            }
        }
    }
    _addErrorMSG(field) {
        let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div>`
        field.parentNode.insertAdjacentHTML("beforeend", error);
    }
    _watchField(field) {
        field.addEventListener('input', () => {  // input - every new pressed button 
            let error = field.parentNode.querySelector(`.${this.errorClass}`);
            if (this.patterns[field.name].test(field.value)) {
                field.classList.remove('invalid');
                field.classList.add('valid');
                if (error) {
                    error.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if (!error) {
                    this._addErrorMSG(field);
                }
            }
        })
    }

}





window.onload = () => {
    document.querySelector(".third-task").addEventListener("submit", (e) => {
        let valid = new Validator("third-task");
        if (!valid.valid) {
            e.preventDefault();
        } else {
            alert("form was sended")
        }
    })
}