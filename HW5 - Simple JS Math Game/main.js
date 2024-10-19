let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let operationsCount = 0;
let wins = 0;
let losses = 0;

// Setting up event listeners for number buttons
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        if (!firstNumber) {
            firstNumber = button;
            firstNumber.classList.add('faded');
        } else if (!secondNumber && firstNumber !== button) {
            secondNumber = button;
            secondNumber.classList.add('faded');
            if (currentOperator) {
                performOperation();
            }
        }
    });
});

// Setting up event listeners for operator buttons
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperator) {
            currentOperator.classList.remove('selected');
        }
        currentOperator = button;
        button.classList.add('selected');
    });
});

// Function to perform calculation based on selected numbers and operator
function performOperation() {
    if (!firstNumber || !secondNumber || !currentOperator) return;

    let operand1 = parseFloat(firstNumber.textContent);
    let operand2 = parseFloat(secondNumber.textContent);
    let result = calculateResult(operand1, operand2, currentOperator.dataset.op);

    if (!isNaN(result)) { // Prevent NaN results
        // Append the operation to the work area on a new line
        let calculationDisplay = document.getElementById('calculation');
        calculationDisplay.value += (calculationDisplay.value ? "\n" : "") + `${operand1} ${currentOperator.textContent} ${operand2} = ${result}`;

        // Update only the second number button with the result
        secondNumber.textContent = result;
        secondNumber.classList.remove('faded');

        // Clear and hide the first number button
        firstNumber.textContent = '';
        firstNumber.style.display = 'none';
        firstNumber.disabled = true;

        operationsCount++;
        checkWin(result);
    }
    resetVariables();
}

function calculateResult(operand1, operand2, operator) {
    switch (operator) {
        case '+': return operand1 + operand2;
        case '-': return operand1 - operand2;
        case '*': return operand1 * operand2;
        default: return NaN; // Ensures invalid operations are not processed
    }
}

// Function to check if the goal is achieved
function checkWin(result) {
    let goal = parseInt(document.getElementById('goal').textContent);
    if (result === goal) {
        alert("You won!");
        wins++;
        document.getElementById('wins').textContent = wins;
        //resetGame();
    } else if (/*operationsCount >= 3 && */document.querySelectorAll('.number:not([style*="display: none"])').length === 1) {
        let remainingNumber = parseFloat(document.querySelectorAll('.number:not([style*="display: none"])')[0].textContent);
        if (remainingNumber !== goal) {
            document.getElementById('losses').textContent = losses;
            alert("Try again!");
            losses++;
            //resetGame();
        }
    }
}

// Function to reset the game
document.getElementById('new-game').addEventListener('click', resetGame);

function resetGame() {
    document.getElementById('calculation').value = '';
    document.getElementById('goal').textContent = Math.floor(Math.random() * 50) + 1;
    const numbers = generateUniqueNumbers(4, 1, 10);
    document.querySelectorAll('.number').forEach((button, index) => {
        button.style.display = 'inline-block';
        button.classList.remove('disabled', 'faded');
        button.disabled = false;
        button.textContent = numbers[index];
    });
    resetVariables();
}

// Function to generate unique random numbers
function generateUniqueNumbers(count, min, max) {
    let numbers = new Set();
    while(numbers.size < count) {
        numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(numbers);
}

// Function to reset variables
function resetVariables() {
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    operationsCount = 0;  // Reset the count of operations for the new game
}
