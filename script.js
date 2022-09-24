const form = document.getElementById("form");
const completed = document.querySelector(".completed");
const submitBtn = document.querySelector(".submitButton");
const continueBtn = document.querySelector(".continue");
const cardCvc = document.querySelector(".card-back-text");
const cardNum = document.querySelector(".card-front-number");
const cardName = document.querySelector(".card-front-name");
const cardMonth = document.querySelector(".month");
const cardYear = document.querySelector(".year");
const userName = document.getElementById("name");
const userCardNum = document.getElementById("number");
const userExpMonth = document.getElementById("expmonth");
const userExpYear = document.getElementById("expyear");
const userCvc = document.getElementById("cvc");

form.addEventListener("submit", function () {
    event.preventDefault();
    const d = new Date;
    const year = d.getFullYear() - 2000;
    const month = d.getMonth() + 1;
    let expmonthValid = false;
    let expyearValid = false;
    let nameValid = false;
    let cardNumValid = false;
    let cvcValid = false;
    const numTest = /\d/g;
    const charTest = /[a-zA-Z]/g;
    
    if(charTest.test(userExpMonth.value) || parseInt(userExpMonth.value) > 12 || userExpMonth.value == "" || parseInt(userExpYear.value) == year && parseInt(userExpMonth.value) > month){
        
        error("expmonth", "Invalid date");
        expmonthValid = false;
    }
    else{
        errorDelete("expmonth");
        expmonthValid = true;
    }

    if(charTest.test(userExpYear.value) || parseInt(userExpYear.value) < year || userExpYear.value == ""){
        
        error("expyear", "Invalid date");
        expyearValid = false;
    }
    else{
        errorDelete("expyear");
        expyearValid = true;
    }

    if(userName.value == "" || numTest.test(userName.value) || userName.value.length > 35){
        error("name", "Can't be blank");
        nameValid = false;
    }
    else{
        errorDelete("name");
        nameValid = true;
    }

    if(charTest.test(userCardNum.value) || userCardNum.value == "" || userCardNum.value.length < 19){
        error("number", "Can't be blank");
        cardNumValid = false;
    }
    else{
        errorDelete("number");
        cardNumValid = true;
    }

    if(charTest.test(userCvc.value) || userCvc.value == ""){
        error("cvc", "Can't be blank");
        cvcValid = false;
    }
    else{
        errorDelete("cvc");
        cvcValid = true;
    }
    
    if(expyearValid && expmonthValid && nameValid && cardNumValid && cvcValid && !charTest.test(userExpMonth.value) && !charTest.test(userExpYear.value) && !numTest.test(userName.value) && !charTest.test(userCardNum.value) && !charTest.test(userCvc.value)){
        form.classList.add("hidden");
        completed.classList.add("active"); 
    }
})

continueBtn.addEventListener("click", function () {
    event.preventDefault();
    completed.classList.remove("active");
    form. classList.remove("hidden");
    userName.value = "";
    userCardNum.value = "";
    userExpMonth.value = "";
    userExpYear.value = "";
    userCvc.value = "";
    cardName.innerHTML = userName.placeholder.replace("e.g. ", "");
    cardNum.innerHTML = "0000 0000 0000 0000";
    cardMonth.innerHTML = "00";
    cardYear.innerHTML = "00";
    cardCvc.innerHTML = "000";
})

function inputName() {
    let formattedName = userName.value.replace(/[0-9]/g, "");
    cardName.innerHTML = formattedName;
    if (cardName.innerHTML == "") {
        cardName.innerHTML = userName.placeholder.replace("e.g. ", "");
    }

}

function inputNum() {
    let formattedNum = userCardNum.value.replace(/[^0-9]/g, "");
    formattedNum = formattedNum.substring(0, 16);
    let numSections = formattedNum.match(/\d{1,4}/g);
    formattedNum = numSections.join(" "); 
    cardNum.innerHTML = formattedNum;

    if (userCardNum.value !== formattedNum) {
        userCardNum.value = formattedNum;
    }

    if (userCardNum.value == "") {
        cardNum.innerHTML = userCardNum.placeholder.replace("e.g. ", "");
    }

    console.log();
}


function inputMM() {
    formattedMonth = userExpMonth.value.replace(/[^0-9]/g, "");
    formattedMonth = formattedMonth.substring(0,2);
    cardMonth.innerHTML = formattedMonth;
    if (userExpMonth.value == "") {
        cardMonth.innerHTML = "00";
    }
}

function inputYear() {
    formattedYear = userExpYear.value.replace(/[^0-9]/g, "");
    formattedYear = formattedYear.substring(0,2);
    cardYear.innerHTML = formattedYear;
    if (userExpYear.value == "") {
        cardYear.innerHTML = "00";
    }
}


function inputCVC() {
    formattedCVC = userCvc.value.replace(/[^0-9]/g, "");
    formattedCVC = formattedCVC.substring(0,3);
    cardCvc.innerHTML = formattedCVC;

    if (userCvc.value == "") {
        cardCvc.innerHTML = "000";
    }
}

function error(field, message) {
    if (field == "expmonth" || field == "expyear") {
        const formControl = form[field].parentNode;
        const error = formControl.parentNode.querySelector(".error");
        formControl.classList.add("input-error");
        error.innerText = message;
        error.style.opacity = 1;
    }
     else{
        const formControl = form[field].parentNode;
        const error = formControl.querySelector(".error");
        formControl.classList.add("input-error");
        error.innerText = message;
        error.style.opacity = 1;
    }
    
    
}

function errorDelete(field) {
    if (field == "expmonth" || field == "expyear") {
        const formControl = form[field].parentNode;
        const error = formControl.parentNode.querySelector(".error");
        formControl.classList.remove("input-error");
        error.style.opacity = 0;
    }
    else{
        const formControl = form[field].parentNode;
        const error = formControl.querySelector(".error");
        formControl.classList.remove("input-error");
        error.style.opacity = 0;
    }
}