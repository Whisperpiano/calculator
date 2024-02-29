const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperandTextContainer = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextContainer = document.querySelector(
  "[data-current-operand]"
);

class Calculator {
  constructor(previousOperandTextContainer, currentOperandTextContainer) {
    this.previousOperandTextContainer = previousOperandTextContainer;
    this.currentOperandTextContainer = currentOperandTextContainer;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "x":
        computation = prev * current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextContainer.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextContainer.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )}
        ${this.operation}`;
    } else {
      this.previousOperandTextContainer.innerText = "";
    }
  }
}

const calculator = new Calculator(
  previousOperandTextContainer,
  currentOperandTextContainer
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

// Theme toggle

const changeTheme = document.getElementById('mode');

changeTheme.onchange = (e) => {
  if (changeTheme.checked === true) {
    
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light")
    window.localStorage.setItem('mode', 'light');
  } else {
   
  
    document.documentElement.classList.remove("light")
    document.documentElement.classList.add("dark")
    window.localStorage.setItem('mode', 'dark');
  }
}
const mode = window.localStorage.getItem('mode');

if (mode == 'dark') {
  changeTheme.checked = true;
  document.documentElement.classList.remove("light")
  document.documentElement.classList.add("dark")
}

if (mode == 'light') {
    const slideBall = document.querySelector('.slider:before');
    console.oog(slideBall)
  changeTheme.checked = false;
  document.documentElement.classList.remove("dark")
  document.documentElement.classList.add("light")
}
