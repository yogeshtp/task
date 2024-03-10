const keys = document.querySelectorAll(".key");
const inputDisplay = document.querySelector(".display .input");
const outputDisplay = document.querySelector(".display .output");

let input = "";

keys.forEach((key) => {
  const value = key.dataset.key;
  key.addEventListener("click", () => {
    handleButtonClick(value);
  });
});

// reusable logic
function resetCalculator() {
  input = "";
  inputDisplay.innerHTML = "";
  outputDisplay.innerHTML = "";
}

function removeLastInputCharacter() {
  input = input.slice(0, -1);
  inputDisplay.innerHTML = cleanInput(input);
}

function calculateResult() {
  let result = calculateExpression(prepareInput(input));
  outputDisplay.innerHTML = cleanOutput(result);
}

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
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  handleKeyPress(key);
});

function handleBrackets() {
  if (
    input.indexOf("(") == -1 ||
    (input.indexOf("(") != -1 &&
      input.indexOf(")") != -1 &&
      input.lastIndexOf("(") < input.lastIndexOf(")"))
  ) {
    input += "(";
  } else if (
    (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
    (input.indexOf("(") != -1 &&
      input.indexOf(")") != -1 &&
      input.lastIndexOf("(") > input.lastIndexOf(")"))
  ) {
    input += ")";
  }
  inputDisplay.innerHTML = cleanInput(input);
}

// function handleDefault(value) {
//   // const validKeys = /^[0-9+\-*/.=()%]|Enter|Escape|Backspace$/;
//   // if (validKeys.test(value)) {
//   // }
//   if (isInputKey(value) && validateInput(value)) {
//     input += value;
//     inputDisplay.innerHTML = cleanInput(input);
//   }
// }


function handleDefault(value) {
  const validKeys = /^[0-9+\-*/.=()%]|Enter|Escape|Backspace$/;
  if (validKeys.test(value)) {
    if (value === "-" && input.slice(-1) === "") {
      input += value;
    } else if (isInputKey(value) && validateInput(value)) {
      input += value;
    }
    inputDisplay.innerHTML = cleanInput(input);
  }
}

function isInputKey(key) {
  const validKeys = /^[0-9+\-*/.=()%]|Enter|Escape|Backspace$/;
  return validKeys.test(key);
}

function calculateExpression(input) {
  console.log("calculateExpression", input);
  return calculate(input);
}

// main logic start
function calculate(input) {
  console.log("calculate:", input, typeof input);
  let operators = [];
  let operands = [];

  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  const isOperator = (char) => precedence[char] !== undefined;

  const performOperation = () => {
    const operator = operators.pop();
    const operand2 = operands.pop();
    const operand1 = operands.pop();
    switch (operator) {
      case "+":
        operands.push(operand1 + operand2);
        break;
      case "-":
        operands.push(operand1 - operand2);
        break;
      case "*":
        operands.push(operand1 * operand2);
        break;
      case "/":
        operands.push(operand1 / operand2);
        break;
      case "%":
        operands.push(operand1 % operand2);
        break;
    }
  };

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    console.log("char", char, typeof char);
    if (char === " ") {
      continue;
    }
    // this condition
    else if (
      (char >= "0" && char <= "9") ||
      (char === "-" && (i === 0 || isOperator(input[i - 1])))
    ) {
      let num = parseFloat(char);
      console.log("num", num);
      while (
        i + 1 < input.length &&
        ((input[i + 1] >= "0" && input[i + 1] <= "9") || input[i + 1] === ".")
      ) {
        if (input[i + 1] === ".") {
          num += ".";
          i++;
          while (
            i + 1 < input.length &&
            ((input[i + 1] >= "0" && input[i + 1] <= "9") ||
              input[i + 1] === ".")
          ) {
            num += input[i + 1];
            i++;
          }
        } else {
          num = num * 10 + parseFloat(input[i + 1]);
          i++;
        }
      }
      operands.push(parseFloat(num));
    }
    // end this condition
    else if (isOperator(char)) {
      while (
        operators.length > 0 &&
        isOperator(operators[operators.length - 1]) &&
        precedence[char] <= precedence[operators[operators.length - 1]]
      ) {
        performOperation();
      }
      operators.push(char);
    } else if (char === "(") {
      operators.push(char);
    } else if (char === ")") {
      while (operators.length > 0 && operators[operators.length - 1] !== "(") {
        performOperation();
      }
      operators.pop();
    }
  }

  while (operators.length > 0) {
    performOperation();
  }

  console.log("operands", operands[0], typeof operands[0]);
  if (operands[0] % 1 == 0) {
    return operands[0];
  } else {
    return operands[0].toFixed(6);
  }
}
// main logic end
function cleanInput(input) {
  let inputArray = input.split("");
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] == "*") {
      inputArray[i] = ` <span class="operator">x</span> `;
    } else if (inputArray[i] == "/") {
      inputArray[i] = ` <span class="operator">÷</span> `;
    } else if (inputArray[i] == "+") {
      inputArray[i] = ` <span class="operator">+</span> `;
    } else if (inputArray[i] == "-") {
      inputArray[i] = ` <span class="operator">-</span> `;
    } else if (inputArray[i] == "(") {
      inputArray[i] = `<span class="brackets">(</span>`;
    } else if (inputArray[i] == ")") {
      inputArray[i] = `<span class="brackets">)</span>`;
    } else if (inputArray[i] == "%") {
      inputArray[i] = `<span class="percent">%</span>`;
    }
  }
  return inputArray.join("");
}

function cleanOutput(output) {
  let outputString = output.toString();
  let decimal = outputString.split(".")[1];
  outputString = outputString.split(".")[0];

  let outputArray = outputString.split("");

  if (outputArray.length > 3) {
    for (let i = outputArray.length - 3; i > 0; i -= 3) {
      outputArray.splice(i, 0, ",");
    }
  }

  if (decimal) {
    outputArray.push(".");
    outputArray.push(decimal);
  }

  return outputArray.join("");
}

function validateInput(value) {
  console.log("validateInput", input);
  let lastInput = input.slice(-1);
  let firstInput = input.slice(0);
  console.log("firstInput", firstInput);
  let operators = ["+", "-", "*", "/"];
  if (value == "." && lastInput == ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(lastInput)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function prepareInput(input) {
  console.log("prepareInput:", input);
  let inputArray = input.split("");

  console.log("prepareInput:", inputArray);
  // inputArray.forEach((element, index, array) => {
  //   if (element === "%") {
  //     array[index] = "/100";
  //   }
  // });
  return inputArray.join("");
}

console.log("X");
