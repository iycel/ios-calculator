const previousElement = document.querySelector(".previous-display");
const currentElement = document.querySelector(".current-display");

const buttonAc = document.querySelector(".ac");
const buttonAdd = document.querySelector(".add");
const buttonPercent = document.querySelector(".percent");
const buttonDiv = document.querySelector(".div");
const buttonSeven = document.querySelector(".numseven");
const buttonEight = document.querySelector(".numeight");
const buttonNine = document.querySelector(".numnine");
const buttonSub = document.querySelector(".sub");
const buttonFour = document.querySelector(".numfour");
const buttonFive = document.querySelector(".numfive");
const buttonSix = document.querySelector(".numsix");
const buttonMul = document.querySelector(".mul");
const buttonOne = document.querySelector(".numone");
const buttonTwo = document.querySelector(".numtwo");
const buttonThree = document.querySelector(".numthree");
const buttonPlus = document.querySelector(".plus");
const buttonZero = document.querySelector(".numzero");
const buttonDecimal = document.querySelector(".decimal");
const buttonEqual = document.querySelector(".equal");


//buttonZero.addEventListener("click", () => {
    //console.log("Number Zero");
//})

//buttonSeven.addEventListener("click", () => {
    //console.log("Number Seven");
//})

const numbersArray = [
    buttonZero,
    buttonOne,
    buttonTwo,
    buttonThree,
    buttonFour,
    buttonFive,
    buttonSix,
    buttonSeven,
    buttonEight,
    buttonNine
]

let previousOperand = "";
let currentOperand = "";
let operation = undefined;
let temporaryOperand = "";

function DisplayNumbers() {
    if(operation){
        previousElement.innerHTML = `${previousOperand} ${operation}`;
    } else {
        previousElement.innerHTML = previousOperand
    }
    currentElement.innerHTML = currentOperand;
}

function AppendNumber(number){
    if(number === "." && currentOperand.includes(".")) return;
    if(number === 0 && currentOperand === "0") return;
    // if(currentOperand.length>7) return;
    currentOperand = currentOperand.toString()  + number.toString();
    
    DisplayNumbers();
}

function ChooseOperation(selectedOperation) {
    if(temporaryOperand){
        previousOperand = temporaryOperand.toString();
        currentOperand = "";
        temporaryOperand = "";
        operation = selectedOperation;
        DisplayNumbers();
        return;
    }

    operation = selectedOperation;
    previousOperand = currentOperand;
    buttonAc.innerHTML = "AC";
    currentOperand ="";
    DisplayNumbers();
}

function Compute() {
    let computation;
    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (!operation) return;
    if (isNaN(previous) || isNaN(current)) return;

    switch (operation) {
        case "+":
            computation = previous + current;
            break;
        case "-":
            computation = previous - current;
            break;
        case "&#247":
            computation = previous / current;
            break;
        case "*":
            computation = previous * current;
            break;
    
        default:
            break;
    }

    if(isNaN(computation)) return;

    currentOperand = computation;
    previousOperand="";
    operation = undefined;
    // buttonAc.innerHTML = "C";
    DisplayNumbers();
    temporaryOperand = currentOperand;
    currentOperand = "";  
}


function AllClear(){
    if(!previousOperand){
        currentOperand = currentOperand.slice(0, currentOperand.length-1);
    }else{
        previousOperand = "";
        urrentOperand = "";
        operation = undefined;
        buttonAc.innerHTML = "C";
    }
    

    DisplayNumbers();
}

function PlusMinus() {
    currentOperand = currentOperand * -1;
    DisplayNumbers();
}

function Percent() {
    currentOperand = currentOperand / 100;
    DisplayNumbers();
}

// Add Event Listener to Operator Buttons

buttonPlus.addEventListener("click", () => {
    ChooseOperation("+");
})

buttonDiv.addEventListener("click", () => {
    ChooseOperation("&#247");
})

buttonMul.addEventListener("click", () => {
    ChooseOperation("-");
})

buttonSub.addEventListener("click", () => {
    ChooseOperation("*");
})

buttonEqual.addEventListener("click", () => {
    Compute();
})

// Add Event Listener to Function Buttons

buttonAc.addEventListener("click", () => {
    AllClear();
})

buttonAdd.addEventListener("click", () => {
    PlusMinus();
})

buttonPercent.addEventListener("click", () => {
    Percent();
})

buttonDecimal.addEventListener("click", () =>{ 
    AppendNumber(".");
})



for(let i =0 ; i<numbersArray.length; i++) {
    const number = numbersArray[i];

    number.addEventListener("click", () => {
        AppendNumber(i);
        temporaryOperand = "";
    })
}