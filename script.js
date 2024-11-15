// Declarate const to use HTML elements in JS
const billValueInput = document.getElementById('bill');
const tipButtons = document.querySelectorAll('.tip-button');
const customeTipAmount = document.getElementById('cutome-tip-value');
const customerNumberInput = document.getElementById('customer-number');

//Declarete initials values for tip , bill and the total.
let tipValue = 0;
let billValue = 0;
let totalWithTip = 0;

//Add event listener to the buttons in order to use them.
tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        //Access to the data that was set in the HTML index
        //and call the calculateTip funcition using porcentage.
        const porcentage = button.dataset.value;
        calculateTip(porcentage)
    });
});

//Declareate a function to calculate the tip porcentage.
function calculateTip(porcentage){
    //Update the bill value.
    billValue = Number(billValueInput.value);
    //calculate the tip value based in the bill value.
    if(!customeTipAmount.value){
        tipValue = billValue * porcentage;
    }else {
        tipValue = Number(customeTipAmount.value);
        if(tipValue <= 0){
            alert ('The minimun tip amount is 1$')
            return;
        }
    }
    //Calculate the total and include the tip amount.
    totalWithTip = billValue + tipValue;
    //call the updateDisplay funciton.
    updateDisplay();
    addCustomeTip()
};

//Declarete a function to update the display.
function updateDisplay() {
    // Declarate const to use HTML elements in JS
    const tip = document.getElementById('tip');
    const bill = document.getElementById('total-bill');

    //Using the innerHTML insert the values in the html
    //Use .toFixed(2) to add 2 decimals in the calc.
    tip.innerHTML = tipValue.toFixed(2);
    bill.innerHTML = totalWithTip.toFixed(2);
}

//Declarete a function to split the bill in case tne customer wanst to.
function splitBill(){
    let customerNumber = parseFloat(customerNumberInput.value);

    //Validate if the customer number is valid.
    if(isNaN(customerNumber) || customerNumber <= 0){
        alert('Please, inctroduce a valid customer number.');
        return;
    };

    //Update the HTML information.
    let billSplited = totalWithTip / customerNumber;
    const bill = document.getElementById('total-bill');
    bill.innerHTML = billSplited.toFixed(2);
};


function billPaid(){
    setTimeout(() => {
        const thanksMessage = document.querySelector('.payment-message');
        thanksMessage.style.display = 'flex';
        setTimeout(() => {
            thanksMessage.style.display = 'none';
        },5000)
    },100)
    resetBillValues()
}

function displayCustomeTip(){
    const customeTip = document.querySelector('.custome-tip');
    const backTipBtn = document.getElementById('back-tip-btn');
    customeTip.style.display = 'flex';
    backTipBtn.addEventListener('click', () => {
        customeTip.style.display = 'none';
        customeTipAmount.value = '';
    });
}

function addCustomeTip(){
    const customeTip = document.querySelector('.custome-tip');
    customeTip.style.display = 'none';
    updateDisplay()
}

//Create a function to reset the values in case the Cx wants to.
function resetBillValues(){
    tipValue = 0;
    billValue = 0;
    totalWithTip = 0;
    tip.innerHTML = 0;
    bill.innerHTML = 0;
    billValueInput.value = ''
    customerNumberInput.value = '';
    customeTipAmount.value = '';
    updateDisplay()
}

//Add events to the buttons to use the reset and stplit function.
document.getElementById('slipt').addEventListener('click', splitBill);
document.getElementById('reset-btn').addEventListener('click', resetBillValues);
document.getElementById('pay-button').addEventListener('click', billPaid);
document.getElementById('custom-tip').addEventListener('click', displayCustomeTip);
document.getElementById('add-tip-btn').addEventListener('click', () => {
    calculateTip()
});