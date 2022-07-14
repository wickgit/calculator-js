const display = document.querySelector('.display');
const container = document.querySelector('.container');
const operators = document.querySelector('.operators');
const evaluate = document.getElementById('result');
const clearButton = document.getElementById('clear');
const displayUpper = document.querySelector('.display_upper');

let firstNumber = '';
let secondNumber = '';
let allOperations = '';
let operation = '';
let isOperatorOn = false;
let evaluationResult;

function add(a, b) { return a + b; }

function substract(a, b) { return a - b; }

function multiply(a, b) { return a * b; }

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

function clear() {
    operation = '';
    firstNumber = '';
    secondNumber = '';
    evaluationResult = '';
    display.innerHTML = '';
    isOperatorOn = false;
    displayUpper.textContent = '';
}

function addToDisplay(str) {
    if (str === 'clear') {
        displayUpper.textContent = '';
        return;
    }
    displayUpper.textContent += str + ' ';
}

function displayNumbers(e) {
    if (evaluationResult) {
        display.innerHTML = '';
    }
    if (e.target.className == 'play_button') {
        display.innerHTML += `${e.target.textContent}`;
        if (!isOperatorOn) {
            firstNumber += e.target.textContent;
        } else {
            secondNumber += e.target.textContent;
        }
    }
    console.log('First number: ', firstNumber, 'Second number:', secondNumber, 'Operation:', operation);
}

function displayOperators(e) {
    if (e.target.className == 'operator_button') {
        if (!firstNumber && !secondNumber) return;
        if (firstNumber && !isOperatorOn) {
            display.innerHTML = '';
            operation = e.target.textContent;
            isOperatorOn = true;
            addToDisplay(firstNumber);
            addToDisplay(operation);
            firstNumber = Number(firstNumber)
            console.log(operation);
        }
        if (firstNumber && secondNumber) {
            secondNumber = Number(secondNumber);
            evaluationResult = operate(operation, firstNumber, secondNumber);
            display.innerHTML = `${evaluationResult}`;
            console.log('відповідь', evaluationResult, 'Operation:', operation);
            operation = '';
            firstNumber = '';
            secondNumber = '';
            isOperatorOn = true;
            firstNumber = evaluationResult;
        }
        operation = e.target.textContent
        
    }
}

function displayResult(e) {
    if (firstNumber && secondNumber) {
        secondNumber = Number(secondNumber);
        evaluationResult = operate(operation, firstNumber, secondNumber);
        addToDisplay('clear');
        addToDisplay(evaluationResult);
        operation = '';
        firstNumber = '';
        secondNumber = '';
        display.innerHTML = `${evaluationResult}`; 
        firstNumber = evaluationResult;
    }
}

container.addEventListener('click', displayNumbers);
operators.addEventListener('click', displayOperators);
evaluate.addEventListener('click', displayResult);
clearButton.addEventListener('click', clear);