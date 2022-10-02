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
let firstNumber = "";
let mathOperator = "";
let secondNumber = "";
let result = "";

// Event listeners
numberButtons.forEach(function (element) {
  element.addEventListener("click", function (event) {
    console.log(firstNumber, mathOperator, secondNumber, result);
    if (!secondNumber && !mathOperator) {
      firstNumber += event.target.dataset.number;
      firstNumberContainer.innerText = firstNumber;
      console.log("1st warunek:");
    } else if (result) {
      firstNumber = event.target.dataset.number;
      firstNumberContainer.innerText = firstNumber;

      mathOperator = "";
      mathOperatorContainer.innerText = "";

      secondNumber = "";
      secondNumberContainer.innerText = "";

      resultOperator.classList.remove("equal_visible");

      resultValue.innerText = "";
      result = "";
      console.log("3rd warunek:");
    } else if (firstNumber && mathOperator) {
      secondNumber += event.target.dataset.number;
      secondNumberContainer.innerText = secondNumber;
      console.log("2nd warunek:");
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
      result = parseFloat(firstNumber) + parseFloat(secondNumber);
    } else if (mathOperator === "-") {
      result = parseFloat(firstNumber) - parseFloat(secondNumber);
    } else if (mathOperator === "*") {
      result = parseFloat(firstNumber) * parseFloat(secondNumber);
    } else if (mathOperator === "/") {
      result = parseFloat(firstNumber) / parseFloat(secondNumber);
    }
  }
  resultOperator.classList.add("equal_visible");
  resultValue.innerText = result;
});

resetButton.addEventListener("click", function () {
  firstNumberContainer.innerText = "";
  firstNumber = "";

  mathOperatorContainer.innerText = "";
  mathOperator = "";

  secondNumberContainer.innerText = "";
  secondNumber = "";

  resultValue.innerText = "";
  result = "";
  resultOperator.classList.remove("equal_visible");
});

cancelButton.addEventListener("click", function () {
  if (!result) {
    if (secondNumber) {
      secondNumberContainer.innerText = "";
      secondNumber = "";
    } else if (mathOperator) {
      mathOperatorContainer.innerText = "";
      mathOperator = "";
    } else if (firstNumber) {
      firstNumberContainer.innerText = "";
      firstNumber = "";
    }
  }
});

pointButton.addEventListener("click", function (event) {
  if (!firstNumber.includes(".") && !mathOperator && !secondNumber) {
    firstNumber += event.target.dataset.operator;
    firstNumberContainer.innerText = firstNumber;
  }
  if (firstNumber && mathOperator && !secondNumber.includes(".")) {
    secondNumber += event.target.dataset.operator;
    secondNumberContainer.innerText = secondNumber;
  }
});

// Theme switch
themeButton.addEventListener("click", function () {
  body.classList.toggle("darktheme");
});
