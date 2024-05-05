const outputScreen = document.getElementById("output-screen");
let anotherOperand = false;
let ansValue = '';

// clear display
function clearDisplay() {
    outputScreen.value = '';
    anotherOperand = false;
}

// delete display 
function deleteDisplay() {
    outputScreen.value = outputScreen.value.slice(0, -1);
    anotherOperand = /[+\-%*/]/.test(outputScreen.value.slice(-1));
}

// backspace = delete
outputScreen.addEventListener('keypress', function(event) {
    if (event.key !== "Backspace" && isNaN(Number(event.key))) {
        event.preventDefault();
    }
});

// display
function appendToDisplay(num) {
    // limits display of another operand after operand
    if (/[0-9+\-%*/.]/.test(num)) {
        if (anotherOperand && /[+\-%*/]/.test(num)) {
            return;
        }
        outputScreen.value += num;
        anotherOperand = /[+\-%*/]/.test(num);
    }
}

// calculate
function calculateDisplay() {
    try {
        ansValue = eval(outputScreen.value);
        outputScreen.value = ansValue;
    } catch(err) {
        outputScreen.value = "Error";
        ansValue = '';
        setTimeout(clearError, 600);
    }
}

// clear when error
function clearError() {
    outputScreen.value = "";
}

function appendAns() {
    if (ansValue !== '') {
        outputScreen.value += ansValue;
    }
}

// enter = calculate
document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        calculateDisplay();
    }
});

// dark-mode
function toggleTheme() {
    const body = document.querySelector('html');
    body.classList.toggle('dark-mode');
}