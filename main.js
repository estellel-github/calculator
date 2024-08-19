const add = (a, b) => {
  return a + b;
};
const subtract = (a, b) => {
  return a - b;
};
const multiply = (a, b) => {
  return a * b;
};
const divide = (a, b) => {
  return a / b;
};

const operate = (operator, a, b) => {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    default:
      return null;
  }
};

const numButtons = document.querySelectorAll(".number");
const historyScreen = document.querySelector("#history-screen");
const currentScreen = document.querySelector("#main-screen");
const operatorButtons = document.querySelectorAll(".operator");
const equalBtn = document.querySelector("#equal");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const pointBtn = document.querySelector("#point");
const posNegBtn = document.querySelector("#pos-neg");

let num1 = "";
let num2 = "";
let currentOperation = null;
let resetScreenFlag = false;

numButtons.forEach((button) => button.addEventListener("click", () => addDigit(button.textContent)));
operatorButtons.forEach((button) => button.addEventListener("click", () => setOperation(button.textContent)));
equalBtn.addEventListener("click", evaluateResult);
clearBtn.addEventListener("click", () => clearScreen());
deleteBtn.addEventListener("click", () => deleteLastDigit());
pointBtn.addEventListener("click", () => addPoint());
posNegBtn.addEventListener("click", () => convertPosNeg());

const resetCurrentScreen = () => {
  currentScreen.textContent = "";
  resetScreenFlag = false;
};

const clearScreen = () => {
  currentScreen.textContent = "0";
  historyScreen.textContent = "";
  num1 = "";
  num2 = "";
  operationCurrent = null;
};

const deleteLastDigit = () => {
  currentScreen.textContent = currentScreen.textContent
    .toString()
    .slice(0, -1);
};

const addPoint = () => {
  if (resetScreenFlag) {
    resetCurrentScreen();
  }
  if (currentScreen.textContent === "") {
    currentScreen.textContent === "0";
  }
  if (currentScreen.textContent.includes(".")) {
    return;
  }
  currentScreen.textContent += ".";
};

const convertPosNeg = () => {
  if (resetScreenFlag) {
    resetCurrentScreen();
  }
  if (currentScreen.textContent === "0") {
    return;
  }
  if (currentScreen.textContent.includes("-")) {
    currentScreen.textContent = Array.from(currentScreen.textContent).filter(char => char !== "-").join('');
  }
  currentScreen.textContent = "-" + currentScreen.textContent;
};

function addDigit(digitInput) {
  if (currentScreen.textContent === "0" || resetScreenFlag) {
    resetCurrentScreen();
  }
  currentScreen.textContent += digitInput;
}

function setOperation(operatorInput) {
  if (currentOperation !== null) {
    evaluateResult();
  }
  num1 = currentScreen.textContent;
  currentOperation = operatorInput;
  historyScreen.textContent = `${num1} ${currentOperation}`;
  resetScreenFlag = true;
}

function roundNumber(number) {
  return Math.round(number * 10000000) / 10000000;
}

function evaluateResult() {
  if (currentOperation === null || resetScreenFlag) {
    return;
  }
  if (currentOperation === "÷" && currentScreen.textContent === "0") {
    currentScreen.textContent = "*No can do*";
    setTimeout(() => {
      currentScreen.textContent = "*Clearing*";
    }, 1000);
    setTimeout(() => {
      clearScreen();
    }, 2000);
    return;
  }
  num2 = currentScreen.textContent;
  currentScreen.textContent = roundNumber(
    operate(currentOperation, num1, num2)
  );
  historyScreen.textContent = `${num1} ${currentOperation} ${num2} =`;
  currentOperation = null;
}

function handleKeyPress(e) {
  if (e.key >= 0 && e.key <= 9) return addDigit(e.key);
  if (e.key === "+") return setOperation("+");
  if (e.key === "-") return setOperation("-");
  if (e.key === "*" || e.key === "x") return setOperation("x");
  if (e.key === "/" || e.key === "÷") return setOperation("÷");
  if (e.key === "=" || e.key === "Enter") return evaluateResult();
  if (e.key === ".") return addPoint();
  if (e.key === "Backspace" || e.key === "Delete") return deleteLastDigit();
}

document.addEventListener("keydown", handleKeyPress);