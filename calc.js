function add(a,b) {
    return a + b
}

function subtract(a,b) {
    return a - b
}

function multiply(a,b) {
    return a * b
}

function divide(a,b) {
    return a / b
}

function operate(operator, n1, n2) {
    switch (operator) {
        case '+':
            add(n1,n2);
            break;
        case '/':
            divide(n1,n2);
            break;
        case '*':
            multiply(n1,n2);
            break;
        case '-':
            subtract(n1,n2);
            break;
        default:
            return 'Invalid operator.';
    }
}