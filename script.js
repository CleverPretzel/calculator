const zeroButton = document.querySelector('.zero');
const oneButton = document.querySelector('.one');
const twoButton = document.querySelector('.two');
const threeButton = document.querySelector('.three');
const fourButton = document.querySelector('.four');
const fiveButton = document.querySelector('.five');
const sixButton = document.querySelector('.six');
const sevenButton = document.querySelector('.seven');
const eightButton = document.querySelector('.eight');
const nineButton = document.querySelector('.nine');

const addButton = document.querySelector('.add');
const subtractButton = document.querySelector('.subtract');
const multiplyButton = document.querySelector('.multiply');
const divideButton = document.querySelector('.divide');
const equalsButton = document.querySelector('.equals');

const clearButton = document.querySelector('.clear');

let display = document.querySelector('.display');

let firstNum;
let operator;
let secondNum;

const numOpButtons = [zeroButton, oneButton, twoButton, threeButton, fourButton, fiveButton, sixButton, sevenButton, eightButton, nineButton, addButton, subtractButton, multiplyButton, divideButton];

clearButton.addEventListener('click', clearDisplay);

numOpButtons.forEach(button => {
  button.addEventListener('click', setVariable);
})

equalsButton.addEventListener('click', operate);

function setVariable (event) {
  let numIsClicked = Number.isInteger(Number(event.target.textContent));

  if (numIsClicked) {
    if (!operator) {
      if (!firstNum) {
        firstNum = event.target.textContent;
      } else {
        firstNum += event.target.textContent;
      }
    } else {
      if (!secondNum) {
        secondNum = event.target.textContent;
      } else {
        secondNum += event.target.textContent;
      }
    }

  } else {
    if (!operator) {
      operator = event.target.textContent;
    } else {
      operate();
      operator = event.target.textContent;
    }
  }

  updateDisplay(event.target.textContent);
}

function clearDisplay () {
  display.textContent = '';
  firstNum = null;
  operator = null;
  secondNum = null;
}

function updateDisplay (text) {
  display.textContent += text;
}

function add (a, b) {
  return a + b;
}

function subtract (a, b) {
  return a - b;
}

function multiply (a, b) {
  return a * b;
}

function divide (a, b) {
  return a / b;
}

function operate () {
  if (!firstNum || !secondNum || !operator) {
    return;
  }

  firstNum = Number(firstNum);
  secondNum = Number(secondNum);
  let result;

  switch (operator) {
    case '+':
      result = add(firstNum, secondNum);
      break;
    case '-':
      result = subtract(firstNum, secondNum);
      break;
    case '*':
      result = multiply(firstNum, secondNum);
      break;
    case '/':
      result = divide(firstNum, secondNum);
      break;
    default:
      alert('Unknown operator');
  }

  result = handleNonInteger(result) || result;
  clearDisplay()
  updateDisplay(result);
  firstNum = result;
}

function handleNonInteger (num) {
  if (!Number.isInteger(num)) {
    return Math.round(num * 100) / 100;
  }
}