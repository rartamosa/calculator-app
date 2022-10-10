// Buttons
const numberButtons = document.querySelectorAll(".calculator__buttons-number");
const mathButtons = document.querySelectorAll(".calculator__buttons-variable");
const equalButton = document.querySelector(".calculator__buttons-equal");
const pointButton = document.querySelector(".calculator__buttons-point");
const resultOperator = document.querySelector(".equal");
const resetButton = document.querySelector(".calculator__buttons-reset");
const cancelButton = document.querySelector(".calculator__buttons-cancel");
const themeButton = document.querySelector(".theme_switch");
const historyButton = document.querySelector(".calculator__buttons-history");

// Containers
const body = document.querySelector("body");
const firstNumberContainer = document.querySelector(
  ".calculator__screen-element1"
);
const mathOperatorContainer = document.querySelector(".variable");
const secondNumberContainer = document.querySelector(
  ".calculator__screen-element2"
);
const resultValue = document.querySelector(".result");
console.log(resultValue);
const historyContainer = document.querySelector(".calculator__screen-history");
const calculatorScreen = document.querySelector(".calculator__screen");
const historyList = document.querySelector(
  ".calculator__screen-history-elements"
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
    } else if (firstNumber && mathOperator) {
      if (secondNumber === "0") {
        secondNumber = event.target.dataset.number;
        secondNumberContainer.innerText = secondNumber;
      } else {
        secondNumber += event.target.dataset.number;
        secondNumberContainer.innerText = secondNumber;
      }
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
  firstNumberContainer.innerText = "0";
  firstNumber = "0";

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
  if (firstNumber && mathOperator && !secondNumber.includes(".") && !result) {
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
