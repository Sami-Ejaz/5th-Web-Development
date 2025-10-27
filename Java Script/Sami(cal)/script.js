
let display = document.getElementById('display');
let expression = "";
let currentNumber = "";
let numbers = [];
let operators = [];

// Update display
function updateDisplay() {
    display.value = expression || "0";
}

// Handle number or operator input
function handleClick(value) {
    if (!isNaN(value) || value === ".") {
        // Number or decimal
        currentNumber += value;
        expression += value;
    } else {
        // Operator
        if (currentNumber !== "") {
            numbers.push(parseFloat(currentNumber));
            currentNumber = "";
        }
        operators.push(value);
        expression += value;
    }
    updateDisplay();
}

// Clear all
function clearDisplay() {
    expression = "";
    currentNumber = "";
    numbers = [];
    operators = [];
    updateDisplay();
}

// Delete last character
function deleteChar() {
    if (expression.length === 0) return;

    let lastChar = expression.slice(-1);
    expression = expression.slice(0, -1);

    if (!isNaN(lastChar) || lastChar === ".") {
        currentNumber = currentNumber.slice(0, -1);
    } else {
        operators.pop();
    }
    updateDisplay();
}

// Manual calculation (no eval)
function calculate() {
    if (currentNumber !== "") {
        numbers.push(parseFloat(currentNumber));
        currentNumber = "";
    }

    if (numbers.length === 0) return;

    // Handle *, /, %
    for (let i = 0; i < operators.length; i++) {
        if (["*", "/", "%"].includes(operators[i])) {
            let result;
            if (operators[i] === "*") result = numbers[i] * numbers[i + 1];
            else if (operators[i] === "/") {
                if (numbers[i + 1] === 0) {
                    display.value = "Error";
                    clearDisplay();
                    return;
                }
                result = numbers[i] / numbers[i + 1];
            } else if (operators[i] === "%") {
                result = numbers[i] % numbers[i + 1];
            }
            numbers.splice(i, 2, result);
            operators.splice(i, 1);
            i--;
        }
    }

    // Handle + and -
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+") result += numbers[i + 1];
        else if (operators[i] === "-") result -= numbers[i + 1];
    }

    expression = result.toString();
    numbers = [];
    operators = [];
    currentNumber = expression;
    updateDisplay();
}

// Button listeners
document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.id;
        const text = button.textContent.trim();

        if (id === "clear") clearDisplay();
        else if (id === "delete") deleteChar();
        else if (id === "equal") calculate();
        else handleClick(text);
    });
});

