// Buttons
const numberButtons = document.querySelectorAll(".calculator__number-button");
const mathButtons = document.querySelectorAll(".button__variable");
const equalButton = document.querySelector(".button__equal");
const pointButton = document.querySelector(".button__point");
const resultOperator = document.querySelector(".equal");
const resetButton = document.querySelector(".button__reset");
const cancelButton = document.querySelector(".button__cancel");
const themeButton = document.querySelector(".theme_switch");
const historyButton = document.querySelector(".button_history");

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
const historyContainer = document.querySelector(".calculator__screen_history");
const calculatorScreen = document.querySelector(".calculator__screen");
const historyList = document.querySelector(
  ".calculator__screen_history-elements"
);

// Global variables
let firstNumber = "0";
let mathOperator = "";
let secondNumber = "";
let result = "";
firstNumberContainer.innerText = firstNumber;

// Functions
function trimNumbers() {
  if (firstNumber[firstNumber.length - 1] === ".") {
    firstNumber = firstNumber.slice(0, firstNumber.length - 1);
    firstNumberContainer.innerText = firstNumber;
  }
  if (secondNumber[secondNumber.length - 1] === ".") {
    secondNumber = secondNumber.slice(0, secondNumber.length - 1);
    secondNumberContainer.innerText = secondNumber;
  }
}

// Event listeners
numberButtons.forEach(function (element) {
  element.addEventListener("click", function (event) {
    console.log(firstNumber, mathOperator, secondNumber, result);
    if (!secondNumber && !mathOperator) {
      if (firstNumber === "0") {
        firstNumber = event.target.dataset.number;
        firstNumberContainer.innerText = firstNumber;
      } else {
        firstNumber += event.target.dataset.number;
        firstNumberContainer.innerText = firstNumber;
      }
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
      console.log(secondNumber);
    }
  });
});

mathButtons.forEach(function (element) {
  element.addEventListener("click", function (event) {
    trimNumbers();

    if (firstNumber && !secondNumber) {
      mathOperator = event.target.dataset.operator;
      mathOperatorContainer.innerText = mathOperator;
    }
  });
});

equalButton.addEventListener("click", function (event) {
  if (firstNumber && mathOperator && secondNumber) {
    trimNumbers();

    if (mathOperator === "+") {
      result = parseFloat(firstNumber) + parseFloat(secondNumber);
    } else if (mathOperator === "-") {
      result = parseFloat(firstNumber) - parseFloat(secondNumber);
    } else if (mathOperator === "*") {
      result = parseFloat(firstNumber) * parseFloat(secondNumber);
    } else if (mathOperator === "/") {
      result = parseFloat(firstNumber) / parseFloat(secondNumber);
    }
    resultOperator.classList.add("equal_visible");
    resultValue.innerText = result;
  }
  historyList.innerHTML += `<li>${firstNumber} <span class="variable">${mathOperator}</span> ${secondNumber} = ${result}
  </li>`;
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
      secondNumber = secondNumber.slice(0, secondNumber.length - 1);
      secondNumberContainer.innerText = secondNumber;
    } else if (mathOperator) {
      mathOperator = "";
      mathOperatorContainer.innerText = "";
    } else if (firstNumber) {
      firstNumber = firstNumber.slice(0, firstNumber.length - 1);
      firstNumberContainer.innerText = firstNumber;
    }
  }
});

pointButton.addEventListener("click", function (event) {
  if (!firstNumber.includes(".") && !mathOperator && !secondNumber) {
    firstNumber += event.target.dataset.operator;
    firstNumberContainer.innerText = firstNumber;
  }
  if (firstNumber && mathOperator && !secondNumber.includes(".")) {
    if (secondNumber.length === 0) {
      secondNumber += "0.";
      secondNumberContainer.innerText = secondNumber;
    } else {
      secondNumber += event.target.dataset.operator;
      secondNumberContainer.innerText = secondNumber;
    }
  }
});

historyButton.addEventListener("click", function () {
  historyContainer.classList.toggle("screen-hidden");
  calculatorScreen.classList.toggle("screen-hidden");
});

// Theme switch
themeButton.addEventListener("click", function () {
  body.classList.toggle("darktheme");
});
