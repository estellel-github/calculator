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

const operate = (num1, operator, num2) => {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
    default:
      return null;
  }
};

const numButtons = document.querySelectorAll(".number");
const screenEl = document.querySelector("#screen");
const operatorButtons = document.querySelectorAll(".operator");
const equalBtn = document.querySelector("#equal");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const pointBtn = document.querySelector("#point");
const posNegBtn = document.querySelector("#pos-neg");

function adjustFontSize() {
  const maxFontSize = 42;
  const minFontSize = 32;
  let fontSize = maxFontSize;

  const textLength = screenEl.textContent.length;
  if (textLength > 8) {
    fontSize = minFontSize;
  }

  screenEl.style.fontSize = fontSize + "px";
}

const updateScreen = (value) => {
  screenEl.textContent = "";
  screenEl.textContent = value;
  adjustFontSize();
};

const clearScreen = () => {
  num1 = "";
  num2 = "";
  result = "";
  operator = "";
  updateScreen("");
  console.log("Screen cleared", num1, num2, result, operator);
};

clearScreen();

clearBtn.addEventListener("click", () => {
  clearScreen();
});

const deleteLastDigit = () => {
  if (!num1 || (!num1 && !num2)) {
    return;
  }
  if (num1 && !num2) {
    num1 = num1.toString().slice(0, -1);
    updateScreen(num1);
    console.log("Num1:", num1, "Operator", operator, "Num2:", num2);
  }
  if (num2) {
    num2 = num2.toString().slice(0, -1);
    updateScreen(num2);
  }
};

deleteBtn.addEventListener("click", () => {
  deleteLastDigit();
});

const appendPoint = () => {
  if (!num1 || num1.toString().includes(".") || num2.toString().includes(".")) {
    return;
  }
  if (num1 && !num2) {
    num1 += ".";
    updateScreen(num1);
    console.log("Num1:", num1, "Operator", operator, "Num2:", num2);
  }
  if (num2) {
    num2 += ".";
    updateScreen(num2);
    console.log("Num1:", num1, "Operator", operator, "Num2:", num2);
  }
};

pointBtn.addEventListener("click", () => {
  appendPoint();
  console.log("Test");
});

const convertPosNeg = () => {
  if (!num1) {
    return;
  }
  if (num1 && !num2) {
    num1 *= -1;
    updateScreen(num1);
    console.log("Num1:", num1, "Operator", operator, "Num2:", num2);
  }
  if (num2) {
    num2 *= -1;
    updateScreen(num2);
    console.log("Num1:", num1, "Operator", operator, "Num2:", num2);
  }
};

posNegBtn.addEventListener("click", () => {
  convertPosNeg();
});

function setDigit(digitInput) {
  let currentDigit = digitInput;
  if (operator === "") {
    num1 += currentDigit;
    updateScreen(num1);
  } else {
    num2 += currentDigit;
    updateScreen(num2);
  }
  console.log("Num1:", num1, "Operator", operator, "Num2:", num2);
}

numButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    setDigit(event.target.textContent);
  });
});

function setOperator(operatorInput) {
  if (operator != "") {
    return;
  }
  if (num1 != "") {
    operator = operatorInput;
  }
  updateScreen(operator);
  console.log("Num1", num1, "Operator:", operator, "Num2", num2);
}

operatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    setOperator(event.target.textContent);
  });
});

function roundNumber(number) {
  return Math.round(number * 10000000) / 10000000;
}

equalBtn.addEventListener("click", evaluateResult);

function evaluateResult() {
  if (num1 === "" || num2 === "" || operator === "") {
    return;
  }
  result = roundNumber(operate(Number(num1), operator, Number(num2)));
  if (operator === "÷" && Number(num2) === 0) {
    updateScreen("*No can do*");
    setTimeout(() => {
      updateScreen("*Clearing*");
    }, 1000);
    setTimeout(() => {
      clearScreen();
    }, 2000);
  } else {
    updateScreen(result);
  }
  num1 = result.toString();
  num2 = "";
  operator = "";
  console.log("Result:", result);
}

function handleKeyPress(e) {
  if (e.key >= 0 && e.key <= 9) return setDigit(e.key);
  if (e.key === "+") return setOperator("+");
  if (e.key === "-") return setOperator("-");
  if (e.key === "*" || e.key === "x") return setOperator("x");
  if (e.key === "/" || e.key === "÷") return setOperator("÷");
  if (e.key === "=" || e.key === "Enter") return evaluateResult();
  if (e.key === ".") return appendPoint();
  if (e.key === "Backspace" || e.key === "Delete") return deleteLastDigit();
  }

document.addEventListener("keydown", handleKeyPress);