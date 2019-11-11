function operate(operand1, operand2, operator) {
    let val1 = parseFloat(operand1);
    let val2 = parseFloat(operand2);

    let result;

    if (operator === "+") {
        result = val1 + val2;
    } else if (operator === "-") {
        result = val1 - val2;
    } else if (operator === "×") {
        result = val1 * val2;
    } else if (operator === "÷") {
        if (val2 === 0) {
            result = "can't divide to zero";
        } else {
            result = val1 / val2;
        }
    }

    console.log({val1, val2, operator, result});

    return result;
}

export default operate;