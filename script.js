let display = document.getElementById('display');
let currentOperand = '';
let previousOperand = '';
let operator = '';

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operator = '';
    display.textContent = '0';
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    display.textContent = currentOperand;
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operator = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operator = '';
    previousOperand = '';
    display.textContent = currentOperand;
}

function updateDisplay() {
    display.textContent = currentOperand;
}

document.getElementById('clear').addEventListener('click', clearDisplay);
document.getElementById('equals').addEventListener('click', compute);

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        if (!isNaN(button.id)) {
            appendNumber(button.id);
        } else if (button.id === 'decimal') {
            appendNumber('.');
        } else if (button.id === 'add') {
            chooseOperation('+');
        } else if (button.id === 'subtract') {
            chooseOperation('-');
        } else if (button.id === 'multiply') {
            chooseOperation('*');
        } else if (button.id === 'divide') {
            chooseOperation('÷');
        } else if (button.id === 'percent') {
            chooseOperation('%');
        } else if (button.id === 'backspace') {
            currentOperand = currentOperand.slice(0, -1);
            updateDisplay();
        }
    });
});
