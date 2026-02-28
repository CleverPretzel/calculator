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
const decimalButton = document.querySelector('.decimal');

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

let equalsPressed = false;
let decimalPressed = false;

const numOpButtons = [zeroButton, oneButton, twoButton, threeButton, fourButton, fiveButton, sixButton, sevenButton, eightButton, nineButton, addButton, subtractButton, multiplyButton, divideButton];

decimalButton.addEventListener('click', handleDecimal);

clearButton.addEventListener('click', clearDisplay);

numOpButtons.forEach(button => {
  button.addEventListener('click', handleNumOp);
})

equalsButton.addEventListener('click', handleEquals);

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
    if (!firstNum) return;
    if (!operator) {
      operator = event.target.textContent;
      decimalPressed = false;
    } else {
      if (!secondNum) {
        operator = event.target.textContent;
        display.textContent = display.textContent.slice(0, -1);
        updateDisplay(event.target.textContent);
        return;
      }
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

  console.log(firstNum, Number(firstNum));
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
  decimalPressed = false;
}

function handleNumOp (event) {
  if (equalsPressed) {
    display.textContent = '';
    firstNum = null;
    operator = null;
    secondNum = null;
  }
  setVariable(event);
  equalsPressed = false;
}

function handleEquals () {
  operate();
  equalsPressed = true;
}

function handleNonInteger (num) {
  if (!Number.isInteger(num)) {
    return Math.round(num * 100) / 100;
  }
}

function handleDecimal () {
  if (!firstNum || 
    decimalPressed ||
    (operator && !secondNum)
  ) return;

  if (!operator) {
    firstNum += '.';
  } else {
    secondNum += '.';
  }
  updateDisplay('.');
  decimalPressed = true;
}