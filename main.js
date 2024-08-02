const add = (a, b) => {
  return a + b;
}

const subtract = (a, b) => {
  return a - b;
}

const multiply = (a, b) => {
  return a * b;
}

const divide = (a, b) => {
  return a / b;
}

let num1;
let num2;
let operator;

const operate = (num1, operator, num2) => {
  switch (operator) {
    case "+" :
      add(num1, num2);
      break;
    case "-" :
      subtract(num1, num2);
      break;
    case "*" :
      multiply(num1, num2);
      break;
    case "/" :
      divide(num1, num2);
      break;
  }
}