const currDisplay = document.querySelector(".cur-display")
const prevDisplay = document.querySelector(".prev-display")
const numbers = document.querySelectorAll(".number")
const operands = document.querySelectorAll(".operation")
const clearBtn = document.querySelector(".clear")
const delBtn = document.querySelector(".delete")
const equalBtn = document.querySelector(".equal")

let operation;

function appendNumber(number) {
    if (number === "." && currDisplay.innerText.includes(".")) return;
    currDisplay.innerText += number
}

function chooseOperation(operand) {
    if (currDisplay.innerText === "") return;
    operation = operand
    compute(operand)
    currDisplay.innerText += operand
    prevDisplay.innerText = currDisplay.innerText
    currDisplay.innerText = ""
}

function clearDisplay() {
    currDisplay.innerText = ""
    prevDisplay.innerText = ""
}

function compute() {
    let result;
    const previousValue = parseFloat(prevDisplay.innerText)
    const currentValue = parseFloat(currDisplay.innerText)

    if (isNaN(previousValue) || isNaN(currentValue)) return;

    switch (operation) {
        case "+":
            result = previousValue + currentValue;
            break;
        case "-":
            result = previousValue - currentValue
            break;
        case "*":
            result = previousValue * currentValue
            break;
        case "/":
            result = previousValue / currentValue
            break;
    }
    currDisplay.innerText = result
}

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        appendNumber(number.innerText)
    })
})

operands.forEach((operand) => {
    operand.addEventListener("click", () => {
        chooseOperation(operand.innerText)
    })
})

clearBtn.addEventListener("click", () => {
    clearDisplay()
})

equalBtn.addEventListener("click", () => {
    compute()
    prevDisplay.innerText = ""
})

delBtn.addEventListener("click", () => {
    currDisplay.innerText = currDisplay.innerText.slice(0, -1)
})

// **Handle Keyboard Input**
document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Handle number input
    if (!isNaN(key) || key === ".") {
        appendNumber(key);
    }

    // Handle operators
    if (key === "+" || key === "-" || key === "*" || key === "/") {
        chooseOperation(key);
    }

    // Handle Enter key (for equals)
    if (key === "Enter") {
        compute();
    }

    // Handle Backspace (for delete)
    if (key === "Backspace") {
        currDisplay.innerText = currDisplay.innerText.slice(0, -1);
    }

    // Handle Escape (for clear)
    if (key === "Escape") {
        clearDisplay();
    }
});