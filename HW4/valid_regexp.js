// regular expressions script:
'use strict'

let container = document.querySelector(".text");
let changeButton = document.querySelector("#first-change")
let changeButton2 = document.querySelector("#second-change")
let returnButton = document.querySelector("#return");

function turnButton() {
    returnButton.style.display = ""
    changeButton.style.backgroundColor = "red"
    changeButton2.style.backgroundColor = "red"
}

changeButton.addEventListener("click", () => {
    turnButton()
    container.textContent = container.textContent.replace(/'/g, '"');
})

returnButton.addEventListener("click", () => {
    container.textContent = container.textContent.replace(/"/g, "'");
    returnButton.style.display = "none";
    changeButton.style.backgroundColor = ""
    changeButton2.style.backgroundColor = ""
})

changeButton2.addEventListener("click", () => {
    turnButton()
    container.textContent = container.textContent.replace(/\B'|'\B/g, '"')
})