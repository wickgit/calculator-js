const display = document.querySelector('.display');
const container = document.querySelector('.container');
const operators = document.querySelector('.operators');
const evaluate = document.getElementById('result');
const clearButton = document.getElementById('clear');
const displayUpper = document.querySelector('.display_upper');
const dotButton = document.getElementById('dot');
const removeButton = document.getElementById('remove');
const innerMain = document.querySelector('.inner_main');

let firstNumber = '';
let secondNumber = '';
let operation = '';
let isOperatorOn = false;
let evaluationResult;
let currentNumber = 'first';
let previousNumber;

function add(a, b) { return a + b; }

function substract(a, b) { return a - b; }

function multiply(a, b) { return a * b; }

function divide(a, b) {
    if (b == 0) return 'ERROR';
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
    currentNumber = 'first';
}

function addToDisplay(str) {
    if (str === 'clear') {
        displayUpper.textContent = '';
        return;
    }
    displayUpper.textContent += str + ' ';
}


function displayNumbers(e) {
    console.log(currentNumber)
    if (currentNumber == 'first') {
        firstNumber += e.target.textContent;
        display.innerHTML = firstNumber;
    } else {
        if(operation) {
            secondNumber += e.target.textContent;
            display.innerHTML = secondNumber;
        }
    }
    console.log('First number: ', firstNumber, 'Second number:', secondNumber, 'Operation:', operation);
}

function displayOperators(e) {
    if (e.target.className == 'operator_button') {
        // Choose operation if firstName is empty
        if (!firstNumber && !secondNumber) return;
        if (firstNumber && !secondNumber && operation) return;
        // Choose an operation if firstNumber is not empty
        if (firstNumber && !isOperatorOn) {
            display.innerHTML = '';
            operation = e.target.textContent;
            isOperatorOn = true;
            addToDisplay(firstNumber);
            firstNumber = Number(firstNumber);
            currentNumber = 'second';
            console.log(operation);
        }
        
        // if two numbers exists and user press operation button, program evaluate the result
        if (firstNumber && secondNumber) {
            secondNumber = Number(secondNumber);
            evaluationResult = operate(operation, firstNumber, secondNumber);
            display.innerHTML = '';
            addToDisplay('clear')
            addToDisplay(evaluationResult);
            // addToDisplay(operation);
            operation = '';
            currentNumber = 'second';
            secondNumber = '';
            isOperatorOn = true;
            firstNumber = evaluationResult;
            console.log('Result: ', evaluationResult, 'Operation:', operation);
        }
        
        operation = e.target.textContent;
        addToDisplay(operation);
    }
}

function displayResult() {
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

function addDot() {
    if (display.textContent.indexOf('.') === -1) {
        if (currentNumber == 'first') {
            firstNumber += '.';
        } else if (currentNumber == 'second') {
            secondNumber += '.';
        }
    }
}

function removeCharacter() {
    console.log(currentNumber);
    if (currentNumber === 'first') {
        firstNumber = firstNumber.slice(0, -1);
        display.innerHTML = firstNumber;
    } else {
        secondNumber = secondNumber.slice(0, -1);
        display.innerHTML = secondNumber;
    }
}

function identifyNeededEventListener(e) {
    if (e.target.className == 'play_button') displayNumbers(e);
    else if (e.target.className == 'operator_button') displayOperators(e);
    else if (e.target.id == 'result') displayResult();
    else if (e.target.id == 'clear') clear();
    else if (e.target.id == 'dot') addDot();
    else if (e.target.id == 'remove') removeCharacter();
}

innerMain.addEventListener('click', identifyNeededEventListener);