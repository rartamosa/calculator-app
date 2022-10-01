// Buttons
const numberButtons = document.querySelectorAll(".calculator__number-button");
const mathButtons = document.querySelectorAll(".button__variable");
const equalButton = document.querySelector(".button__equal");
const pointButton = document.querySelector(".button__point");
const resultOperator = document.querySelector(".equal");
const resetButton = document.querySelector(".button__reset");
const cancelButton = document.querySelector(".button__cancel");
const themeButton = document.querySelector(".theme_switch");

// Containers
const body = document.querySelector("body");
const firstNumberContainer = document.querySelector(
  ".calculator__screen_element1"
);
const mathOperatorContainer = document.querySelector(".variable");
const secondNumberContainer = document.querySelector(
  ".calculator__screen_element2"
);
const resultValue = document.querySelector(".result");

// Global variables
let firstNumber = null;
let mathOperator = null;
let secondNumber = null;
let result = null;

// Event listeners
numberButtons.forEach(function (element) {
  element.addEventListener("click", function (event) {
    if (!secondNumber && !mathOperator) {
      firstNumber = event.target.dataset.number;
      firstNumberContainer.innerText += firstNumber;
    } else if (firstNumber && mathOperator) {
      secondNumber = event.target.dataset.number;
      secondNumberContainer.innerText += secondNumber;
    }
  });
});

mathButtons.forEach(function (element) {
  element.addEventListener("click", function (event) {
    if (firstNumber && !secondNumber) {
      mathOperator = event.target.dataset.operator;
      mathOperatorContainer.innerText = mathOperator;
    }
  });
});

equalButton.addEventListener("click", function (event) {
  if (firstNumber && mathOperator && secondNumber) {
    if (mathOperator === "+") {
      result = firstNumber + secondNumber;
    } else if (mathOperator === "-") {
      result = firstNumber - secondNumber;
    } else if (mathOperator === "*") {
      result = firstNumber * secondNumber;
    } else if (mathOperator === "/") {
      result = firstNumber / secondNumber;
    }
  }
  resultOperator.classList.add("equal_visible");
  resultValue.innerText = result;
  parseInt(firstNumber);
  parseInt(secondNumber);
});

resetButton.addEventListener("click", function () {
  firstNumberContainer.innerText = "";
  firstNumber = null;

  mathOperatorContainer.innerText = "";
  mathOperator = null;

  secondNumberContainer.innerText = "";
  secondNumber = null;

  resultValue.innerText = "";
  result = null;
  resultOperator.classList.remove("equal_visible");
});

cancelButton.addEventListener("click", function () {
  if (!result) {
    if (secondNumber) {
      secondNumberContainer.innerText = "";
      secondNumber = null;
    } else if (mathOperator) {
      mathOperatorContainer.innerText = "";
      mathOperator = null;
    } else if (firstNumber) {
      firstNumberContainer.innerText = "";
      firstNumber = null;
    }
  }
});

// Theme switch
themeButton.addEventListener("click", function () {
  body.classList.toggle("darktheme");
});
