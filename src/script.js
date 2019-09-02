class Calculator {
  constructor(lastOperationInput, nextOperationInput) {
    this.lastOperationInput = lastOperationInput;
    this.nextOperationInput = nextOperationInput;
    this.clear();
  }

  clear() {
    this.lastOperation = '';
    this.nextOperation = '';
    this.operation = undefined;
  }

  delete() {
    // convert to string and remove the last character
    this.nextOperation = this.nextOperation.toString().slice(0, -1);
  }

  appendNumber(number) {
    // prevent multiple periods from being chained together
    if (number === '.' && this.nextOperation.includes('.')) return;
    this.nextOperation = this.nextOperation.toString() + number.toString();
  }

  selectOperation(operation) {
    // check if user has entered a number
    if(this.nextOperation === '') return;
    // check if there was a previous number entered to execute with the current number
    if(this.lastOperation !== '') {
      this.calculate();
    }
    this.operation = operation;
    this.lastOperation = this.nextOperation;
    this.nextOperation = '';
  }

  calculate() {
    let computation;
    const last = parseFloat(this.lastOperation);
    const next = parseFloat(this.nextOperation);
    // check if the input fields are not empty
    if(isNaN(last) || isNaN(next)) return;

    switch(this.operation) {
      case '+':
        computation = last + next;
        break;
      case '-':
        computation = last - next;
        break;
      case '*':
        computation = last * next;
        break;
      case '÷':
        computation = last / next;
        break;
      default:
        return;
    }

    this.nextOperation = computation;
    this.operation = undefined;
    this.lastOperation = '';
  }

  getDisplayNumber(number) {
    const numString = number.toString();
    const numInt = parseFloat(numString.split('.')[0]);
    const numDecimal = numString.split('.')[1];
    let displayInt;
    if(isNaN(numInt)) {
      displayInt = '';
    } else {
      displayInt = numInt.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if(numDecimal != null) {
      return `${displayInt}.${numDecimal}`;
    } else {
      return displayInt;
    }
  }

  updateDisplay(isNum) {
    this.nextOperationInput.innerText = this.getDisplayNumber(this.nextOperation);
    // append the operation to the last opearand if it exists
    if(this.operation !== undefined) {
      this.lastOperationInput.innerText = `${this.getDisplayNumber(this.lastOperation)} ${this.operation}`;
    } else {
      this.lastOperationInput.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const lastOperationInput = document.querySelector('[data-last]');
const nextOperationInput = document.querySelector('[data-next]');

const calculator = new Calculator(lastOperationInput, nextOperationInput);

// add event listeners to number buttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})
// add event listeners to operation buttons
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.selectOperation(button.innerText);
    calculator.updateDisplay();
  })
})
// add event listener to the equal button
equalsButton.addEventListener('click', button => {
  calculator.calculate();
  calculator.updateDisplay();
})
// add event listener to the clear button
clearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})
// add event listener to the delete button
deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})
