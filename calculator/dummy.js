document.addEventListener("DOMContentLoaded", function () {
  const keys = document.querySelectorAll(".key");
  const inputDisplay = document.querySelector(".display .input");
  const outputDisplay = document.querySelector(".display .output");

  let input = "";

  keys.forEach((key) => {
    const value = key.dataset.key;
    key.addEventListener("click", () => {
      handleButtonClick(value);
      updateDisplay();
    });
  });

  function handleButtonClick(value) {
    switch (value) {
      case "clear":
        resetCalculator();
        break;
      case "backspace":
        removeLastInputCharacter();
        break;
      case "=":
        calculateResult();
        break;
      case "brackets":
        handleBrackets();
        break;
      default:
        handleDefault(value);
    }
  }
  function handleKeyPress(key) {
    switch (key) {
      case "Enter":
        calculateResult();
        break;
      case "Escape":
        resetCalculator();
        break;
      case "Backspace":
        removeLastInputCharacter();
        break;
      default:
        handleDefault(key);
        break;
    }

    updateDisplay();
  }
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    handleKeyPress(key);
  });

  function resetCalculator() {
    input = "";
  }

  function removeLastInputCharacter() {
    input = input.slice(0, -1);
  }

  function calculateResult() {
    try {
      const result = evaluateExpression(parseExpression(input));
      input = result.toString();
    } catch (error) {
      input = "Error";
    }
  }

  function handleBrackets() {
    const lastChar = input.slice(-1);
    if (!lastChar.match(/[\d)%]/)) {
      input += "(";
    } else if (isValidClosingBracket()) {
      input += ")";
    }
  }

  function isValidClosingBracket() {
    const openBracketsCount = (input.match(/\(/g) || []).length;
    const closeBracketsCount = (input.match(/\)/g) || []).length;
    return openBracketsCount > closeBracketsCount;
  }

  function handleDefault(value) {
    switch (true) {
      case /^\d$/.test(value):
        handleNumericInput(value);
        break;
      case /^[-+*/%]$/.test(value):
        handleOperator(value);
        break;
      case value === ".":
        handleDecimalPoint();
        break;
      default:
        // Handle other keys if needed
        break;
    }
  }

  function handleNumericInput(value) {
    const lastChar = input.slice(-1);
  
    if (input === "Error") {
      resetCalculator();
    }
  
    // Check if the last character is an operator or the beginning of the input
    if (lastChar.match(/[+\-*/%(]|^$/)) {
      input += value;
    } else {
      // If not, it's part of the number
      const operators = (input.match(/[-+*/%(]/g) || []).reverse();
      const lastNumberStart = operators.length > 0 ? operators[0] : 0;
      input = input.slice(0, -lastNumberStart.length) + value;
    }
  }
  

  function handleOperator(value) {
    const lastChar = input.slice(-1);
    if (!lastChar.match(/[-+*/.%]/)) {
      input += value;
    } else if (!value.match(/[-+]/)) {
      // Replace the last operator with the new one
      input = input.slice(0, -1) + value;
    }
  }

  function handleDecimalPoint() {
    const lastNumber = getLastNumber();
    if (!lastNumber.includes(".")) {
      input += ".";
    }
  }

  function getLastNumber() {
    const regex = /[+\-*/%]/;
    const tokens = input.split(regex);
    return tokens[tokens.length - 1];
  }

  function parseExpression(expression) {
    // Implement a custom expression parser (you can use a library for this)
    // For simplicity, you can split the expression into tokens
    return expression
      .split(/([\+\-\*\/\%\(\)])/)
      .filter((token) => token.trim() !== "");
  }

  function evaluateExpression(tokens) {
    // Implement a custom expression evaluator
    // Use a stack-based algorithm to handle BODMAS
    const output = [];
    const operators = [];

    const precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
      "%": 2,
    };

    tokens.forEach((token) => {
      if (!isNaN(parseFloat(token))) {
        output.push(parseFloat(token));
      } else if (token === "(") {
        operators.push(token);
      } else if (token === ")") {
        while (operators.length && operators[operators.length - 1] !== "(") {
          applyOperator(operators.pop(), output);
        }
        operators.pop(); // Remove the "(" from the stack
      } else {
        while (
          operators.length &&
          precedence[token] <= precedence[operators[operators.length - 1]]
        ) {
          applyOperator(operators.pop(), output);
        }
        operators.push(token);
      }
    });

    while (operators.length) {
      applyOperator(operators.pop(), output);
    }

    return output[0];
  }

  function applyOperator(operator, output) {
    const operand2 = output.pop();
    const operand1 = output.pop();
    switch (operator) {
      case "+":
        output.push(operand1 + operand2);
        break;
      case "-":
        output.push(operand1 - operand2);
        break;
      case "*":
        output.push(operand1 * operand2);
        break;
      case "/":
        output.push(operand1 / operand2);
        break;
      case "%":
        output.push(operand1 % operand2);
        break;
    }
  }

  function updateDisplay() {
    inputDisplay.textContent = formatInputDisplay();
    outputDisplay.textContent = formatOutputDisplay();
  }

  function formatInputDisplay() {
    // Add your custom formatting logic for the input display here
    return input;
  }

  function formatOutputDisplay() {
    // Add your custom formatting logic for the output display here
    const result = evaluateExpression(parseExpression(input));
    return isNaN(result) ? "Error" : result.toString();
  }
});
