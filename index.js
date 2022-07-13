const display = document.querySelector('.display');
const container = document.querySelector('.container');
const operators = document.querySelector('.operators');
const evaluate = document.getElementById('result');

let firstNumber = '';
let secondNumber = '';
let evaluatedNumber;
let operation = '';
let isOperatorOn = false;
let evaluationResult;

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) return 'Can\'t divide by zero';
    return a / b;
}

function operate(operation, a, b) {
    if (operation == '+') {
        return add(a, b);
    } else if (operation == '-') {
        return substract(a, b);
    } else if (operation == 'x') {
        return multiply(a, b);
    } else if (operation == '/') {
        return divide(a, b);
    }
}
function displayNumbers(e) {
    if (evaluationResult) display.innerHTML = '';
    if (e.target.className == 'play_button') {
        display.innerHTML += `${e.target.textContent}`;
        if (!isOperatorOn) {
            firstNumber += e.target.textContent;
        } else {
            secondNumber += e.target.textContent;
        }
    }
    console.log('First number: ', firstNumber, 'Second number:', secondNumber, operation);
}

function displayOperators(e) {
    if (e.target.className == 'operator_button') {
        if (firstNumber && !isOperatorOn) {
            display.innerHTML = '';
            operation = e.target.textContent;
            isOperatorOn = true;
            firstNumber = Number(firstNumber)
            console.log(operation);
        }
    }
}

function displayResult(e) {
    if (firstNumber && secondNumber ) {
        secondNumber = Number(secondNumber);
        evaluationResult = operate(operation, firstNumber, secondNumber);
        display.innerHTML = `${evaluationResult}`;
        console.log(evaluationResult);
        operation = '';
        firstNumber = '';
        secondNumber = '';
        isOperatorOn = false;
    }
}

container.addEventListener('click', displayNumbers);
operators.addEventListener('click', displayOperators);
evaluate.addEventListener('click', displayResult);