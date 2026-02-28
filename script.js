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
const deleteButton = document.querySelector('.delete');

const htmlBody = document.querySelector('body');

let display = document.querySelector('.display');

let firstNum;
let operator;
let secondNum;

let equalsPressed = false;
let decimalPressed = false;

const numOpButtons = [zeroButton, oneButton, twoButton, threeButton, fourButton, fiveButton, sixButton, sevenButton, eightButton, nineButton, addButton, subtractButton, multiplyButton, divideButton];

decimalButton.addEventListener('click', handleDecimal);

clearButton.addEventListener('click', clearDisplay);

deleteButton.addEventListener('click', deleteLast);

numOpButtons.forEach(button => {
  button.addEventListener('click', handleNumOp);
})

equalsButton.addEventListener('click', handleEquals);

function setVariable (event) {
  let digit = event.key || event.target.textContent;
  let numIsClicked = Number.isInteger(Number(digit));

  if (numIsClicked) {
    if (!operator) {
      if (!firstNum) {
        firstNum = digit;
      } else {
        firstNum += digit;
      }
    } else {
      if (!secondNum) {
        secondNum = digit;
      } else {
        secondNum += digit;
      }
    }

  } else {
    if (!firstNum) return;
    if (!operator) {
      operator = digit;
      decimalPressed = false;
    } else {
      if (!secondNum) {
        operator = digit;
        display.textContent = display.textContent.slice(0, -1);
        updateDisplay(digit);
        return;
      }
      operate();
      operator = digit;
    }
  }

  updateDisplay(digit);
}

function clearDisplay () {
  display.textContent = '';
  firstNum = null;
  operator = null;
  secondNum = null;
}

function deleteLast () {
  if (firstNum && !operator) {
    let lastChar = firstNum.slice(-1);
    if (lastChar === '.') decimalPressed = false;

    firstNum = firstNum.slice(0, -1);
  } else if (operator && !secondNum) {
    operator = null;
  } else if (secondNum) {
    let lastChar = secondNum.slice(-1);
    if (lastChar === '.') decimalPressed = false;

    secondNum = secondNum.slice(0, -1);
  }

  display.textContent = display.textContent.slice(0, -1);
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

htmlBody.addEventListener('keydown', e => {
  const numsAndOps = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '*', '-', '+'];

  if (e.key === '.') handleDecimal();
  if (e.key === 'Backspace') deleteLast();
  if (e.key === '=' || e.key === 'Enter') handleEquals();
  if (numsAndOps.includes(e.key)) handleNumOp(e);
})