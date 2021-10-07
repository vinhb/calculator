const screen = document.getElementById('display');
const onButton = document.querySelector('.on')
const clearButton = document.querySelector('.clear')
const deleteButton = document.querySelector('.delete')
const equalButton = document.querySelector('.equal')
const numberButtons = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')

let currentValue = '';
let previousValue = '';
let powerState = false;
let currentOperation = null;
let result = '';

/*
scenarios
1. user types in 5 + 6 * 2 / 4, expect (5.5)
2. user types in 5 + 1, 2 + 3, expect 6, expect 5
3. user types in 3 + 3, then = expect 6, then 9, then 12
*/

function add(num1, num2) {
    result = Number(num1) + Number(num2)
}

function sub(num1, num2) {
    result = Number(num1) - Number(num2)
}

function divide(num1, num2) {
    Number(num2) === 0 ?
        alert('Cannot divide by 0!'): result = Number(num1) / Number(num2) 
}

function multiply(num1, num2) {
    result = Number(num1) * Number(num2)
}

function operate(num1, num2, operator) {
    switch (operator) { 
        case '+':
            add(num1, num2)
            break;
        case '÷':
            divide(num1, num2)
            break;
        case 'X':
            multiply(num1, num2)
            break;
        case '-':
            sub(num1, num2)
            break;
        default:
            return;
    }
    screen.innerText = result;
}

function power() {
    powerState = true;
    screen.textContent = '0';
}

function reset() {
    screen.textContent = '0';
    currentValue = '';
    previousValue = '';
    currentOperation = null;
    result = '';

}

function del() {
    screen.textContent = screen.textContent.slice(0, -1);
}


onButton.addEventListener('click', () => {
         !powerState ? power(): false;
     })


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (powerState) {
            if (button.textContent == '.') {
                if (screen.innerText.includes('.')) {
                    return;
                } 
                else {
                    screen.innerText == '0' || screen.innerText == ''? screen.innerText = '0.': screen.innerText += button.innerText;
                }
            }

            else {
                if (screen.innerText == '0' || screen.innerText == '' || result || screen.innerText === result) {
                    screen.innerText = button.innerText;
                    console.log(currentValue, currentOperation, result, previousValue)
                    result = '';
                }
                else {
                    screen.innerText += button.innerText;
                }
            }
        }   
    })
})

clearButton.addEventListener('click', () => {
    screen.textContent = '';
    if (powerState) {
        setTimeout(reset, 100);  
    }
})

deleteButton.addEventListener('click', () => {
    if (powerState) {
        screen.textContent.length === 1 ? 
        screen.textContent = '0': del();
    }
})

operators.forEach(button => {
    button.addEventListener('click', () => {
        if (powerState) {
            if (currentOperation) {
                currentValue = screen.innerText;
                operate(previousValue, currentValue, currentOperation);
                screen.innerText = result;
                currentOperation = button.innerText;
                previousValue = result;   
                
            }
            else {
                previousValue = screen.innerText;
                currentOperation = button.innerText;
                screen.innerText = '';
            }
            
            
        }
        
    })
})

equalButton.addEventListener('click', () => {
    if (powerState) {
        if (screen.innerText && result === '') {
            currentValue = screen.innerText;
            operate(previousValue, currentValue, currentOperation);
        } 
        else {
            operate(previousValue, currentValue, currentOperation);
        }
        previousValue = result;
    }
})
