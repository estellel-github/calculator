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
    case "/":
      return divide(num1, num2);
    default:
      return null;
  }
};

const numButtons = document.querySelectorAll(".number");

const displayEl = document.querySelector("#display");

const operatorButtons = document.querySelectorAll(".operator");

const equalBtn = document.querySelector("#equal");

const clearBtn = document.querySelector("#clear");

const clearDisplay = () => {
  num1 = "";
  num2 = "";
  result = "";
  operator = "";
  displayEl.textContent = "0";
  console.log("Display cleared", num1, num2, result, operator);
};

clearDisplay();

clearBtn.addEventListener("click", () => {
  clearDisplay();
});

const updateDisplay = (value) => {
  displayEl.textContent = "";
  displayEl.textContent = value;
};

numButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let currentDigit = event.target.textContent.trim();
    if (operator === "") {
      num1 += currentDigit;
      updateDisplay(num1);
    } else {
      num2 += currentDigit;
      updateDisplay(num2);
    }
    console.log("Num1:", num1, "Operator", operator, "Num2:", num2);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    currentOperator = event.target.textContent.trim();
    if (num1 != "") {
      operator = currentOperator;
    }
    updateDisplay(operator);
    console.log("Num1", num1, "Operator:", operator, "Num2", num2);
  });
});

equalBtn.addEventListener("click", () => {
  if (num1 === "" || num2 === "" || operator === "") {
    return;
  }
  result = operate(Number(num1), operator, Number(num2));
  if (operator === "/" && Number(num2) === 0) {
    updateDisplay("No can do!");
    setTimeout(() => {
      updateDisplay("Clearing...");
    }, 1000);
    setTimeout(() => {
      clearDisplay();
    }, 2000);
  } else {
    updateDisplay(result);
  }
  num1 = result;
  num2 = "";
  operator = "";
  console.log("Result:", result);
});