// does not stop after a certain number of buttons pressed user can input xxxxxxxxxxx...

// const onButton = document.getElementById('button-container').firstElementChild;
// 
const screen = document.getElementById('display');
const buttons = Array.from(document.querySelectorAll('.key'));
const nonNumbers = ['ON', 'AC', '+', '-', 'X', '÷', '.', '=']
const operators = ['+', '÷', 'X', '-']

let workingValue = 0;
let holdingValue = 0;
let powerState = false;
let firstNumberPressed = true;
let decimalPlace = 0; //counter to track if user has pressed decimal && a single number
let operation;
let result = 0;

function add(a,b) {
    result = a + b;
}

function subtract(a,b) {
    result = a - b;
}

function multiply(a,b) {
    result = a * b;
}

function divide(a,b) {
    (a == 0 || b == 0) ? screen.innerText = 'Cannot divide by zero' : result = a / b;
    
}

function operate(operator, n1, n2) {
    n1 = Number(n1);
    n2 = Number(n2);
    switch (operator) {
        case '+':
            return add(n1,n2);
            break;
        case '÷':
            return divide(n1,n2);
            break;
        case 'X':
            return multiply(n1,n2);
            break;
        case '-':
            return subtract(n1,n2);
            break;
        default:
            return 'Invalid operator.';
    }
}

// turn on calculator
function calcPower() {
    screen.innerText = 0;
    powerState = true;
    workingValue = 0;
}

// maintain state for case when user clicks on on button but with input already on screen
// function maintainState() {
//     screen.innerText = workingValue;
// }

// clear memory
function clear() {
    setTimeout(calcPower, 150);
    workingValue = 0;
    holdingValue = 0;
    firstNumberPressed = true;
    decimalPlace = 0;
    operation = undefined;
    result = 0;
}

// add number
function appendNumber(value) {
    screen.innerText += value;
}

function getButtonValue(e) {
    // if on button is pressed or clear button is pressed while on
    // call calcPower or clear screen then call calcPower to set
    // screen to 0
    if (!powerState) {
        e.target.innerText == 'ON' ? calcPower(): false;
    }

    else { //calculator is on conditions
        if (e.target.innerText == 'AC') { // make sure calculator is on
            screen.innerText = ''; // included to create a 'blink' effect
            clear();
        }

        else if (e.target.innerText == 'ON') {
            return;
        }

        else if (!nonNumbers.includes(e.target.innerText)) { // number is pressed
            if (firstNumberPressed) {
                screen.innerText = ''
                appendNumber(e.target.innerText);
                workingValue = screen.innerText;
                firstNumberPressed = false;
            }
            

            else if (decimalPlace > 0) { // user has pressed decimal but has not selected another number
                decimalPlace < 2 ? appendNumber(e.target.innerText) : false;
                workingValue = screen.innerText;
                decimalPlace++;
            }
            
            else { //operator pressed
                if (operation)  {
                    screen.innerText = '';
                    appendNumber(e.target.innerText);
                    workingValue = screen.innerText;
                }
                else {
                    appendNumber(e.target.innerText);
                    workingValue = screen.innerText;

                }
            }
        }    
        
        else if (e.target.innerText == '.' && decimalPlace < 1) { 
            screen.innerText += '.';   
            workingValue = screen.innerText;
            decimalPlace++;
            firstNumberPressed = false;
        }


        else {
                //operator situations
                // hit equal on first press, keep at 0
                // hit equal otherwise, call same function again and repeat operation
                // hit equal w/o operator keep current value
                // hit operator save as an argument to pass into equal function 
                // 
                // decimalPlace++;
                if (!operation && e.target.innerText == '=') {
                    return;
                }

                else if (operators.includes(e.target.innerText) && !operation)
                {
                    holdingValue = screen.innerText;
                    operation = e.target.innerText;
                    workingValue = 0;
                }

                else if (operation) {
                    console.log(holdingValue);
                    console.log(workingValue);
                    operate(operation, holdingValue, screen.innerText);
                    if (Number.isInteger(result)) {
                        screen.innerText = result;
                        holdingValue = screen.innerText;
                    } 
                    else {
                        screen.innerText = Math.round(result * 10) / 10;
                        holdingValue = screen.innerText;
                    }
                }

                else if (e.target.innerText == '=') {
                    operate(operation, holdingValue, workingValue);
                    Number.isInteger(result) ? screen.innerText = result: screen.innerText = Math.round(result * 10) / 10;
                    firstNumberPressed = true;
                }

                else {
                    return;
                }
            }
        }  
}

// will  need this later const audio = document.querySelect(`audio[data-key=${e.keycode}]`)
buttons.forEach(button => button.addEventListener('click', getButtonValue));

// a user can type in as many numbers as want
// if they hit an operator, can still type in as many numbers as they want
// if they hit equals, show current screen if operator has not been selected otherwise, repeat calculation
// if they hit an operator then another, change operator
// if they give a number hit operator give a number then hit the SAME operator, repeat
// otherwise clear held value

// if there's a held value (user hasn't hit equals or another operator) override

//current issues:
// user can't add more values after hitting an operator
// keyboard support
// divide 0 is not addressed
// if user does a decimal immediately after an operator, doesn't start at 0.n