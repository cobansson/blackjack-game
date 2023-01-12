const messageEl = document.getElementById("message-el");
const cardSpan = document.getElementById("cardSpan");
const sumSpan = document.getElementById("sumSpan");
const balanceText = document.getElementById("balance");
const popUpModal = document.getElementById("pop-up");
const popUpMain = document.getElementById("popupMain");
const closeModalButton = document.getElementById("modal-close-btn");

const startID = document.getElementById("startID");
const drawID = document.getElementById("drawID");
const newID = document.getElementById("newID");
const topUpID = document.getElementById("topUpID");
const yourName = document.getElementById("yourName");

let cardArray = [];

let balance = 0;

function newGame() {
    startID.disabled = false;
    messageEl.innerText = `Let's start again!`;
    cardSpan.innerText = ``;
    sumSpan.innerText = ``;
    cardArray = [];
    startGame();
}

function startGame() {
    drawID.disabled = false;
    startID.disabled = true;
    newID.disabled = false;
    topUpID.disabled = false;
}

function renderCard() {
    drawCard();
    paymentBtn();
}

function drawCard() {
    let total = 0;
    const card = Math.floor(Math.random() * 10) + 1;

    cardArray.push(card);

    let numberString = "";

    for (let i = 0; i < cardArray.length; i++) {
        if ([i] != 0) {
            numberString += " - "  + cardArray[i];
        } else {
            numberString += cardArray[i];
        }

        total += cardArray[i];
    }

    cardSpan.innerText = `${numberString}`;

    sumSpan.innerText = `${total}`;

    console.log(numberString);

    if (total > 21) {
        balance = balance - 10;
        console.log(balance);
        balanceText.innerText = `${balance}$`;
        messageEl.innerText = `You lost! Wanna play again?`;
        drawID.disabled = true;
    } else if (total === 21) {
        balance = balance + 50;
        balanceText.innerText = `${balance}$`;
        messageEl.innerText = `Good job! Wanna play again?`;
        drawID.disabled = true;
    } else {
        messageEl.innerText = `Draw a card!`;
    }

    if (balance < 75 && balance > 55) {
        balanceText.classList = !balanceText.classList;
        balanceText.classList.toggle("orange");
    } else if (balance < 55) {
        balanceText.classList = !balanceText.classList;
        balanceText.classList.toggle("red");
    } else if (balance > 75) {
        balanceText.classList = !balanceText.classList;
        balanceText.classList.toggle("balance");
    }

    if (balance === 0) {
        messageEl.innerText = `Your balance is 0. You need to buy chips!`;
        messageEl.classList.toggle("orange");
        startID.disabled = true;
        drawID.disabled = true;
        newID.disabled = true;
    } else {
        messageEl.classList = !messageEl.classList;
        messageEl.classList.toggle("message-el");
    }
}

if (balance === 0) {
    messageEl.innerText = `Your balance is 0. You need to buy chips!`;
    messageEl.classList.toggle("orange");
    startID.disabled = true;
    drawID.disabled = true;
    newID.disabled = true;
}

function topUp100Btn() {
    popUpMain.innerHTML =
    `
    <form id="paymentForm">
        <input id="name"
               name="name"
                type="text"
                placeholder="Dwight Kurt Schrute"
                required>
        <input id="ccn"
                name="ccn"
                type="text"
                maxlength="19"
                placeholder="xxxx xxxx xxxx xxxx"
                required>
        <input id="cvv"
               name="cvv"
                type="text"
                minlength="3"
                maxlength="3"
                placeholder="xxx"
                required>
    </form>
    <button type="submit" id="paymentBtn" class="topUpBtn" onclick="paymentBtn();">PAY</button>
    `;
}

function paymentBtn() {
    const names = document.getElementById("name").value;
    const ccn = document.getElementById("ccn").value;
    const cvv = document.getElementById("cvv").value;
    
    if (names && ccn && cvv) {
        cardArray = [];
        balance += 100;

        startID.disabled = false;
        newID.disabled = true;

        cardSpan.innerText = ``;
        sumSpan.innerText = ``;

        if (balance === 100) {
            messageEl.innerText = `Press START GAME to begin!`;
        } else {
            messageEl.innerText = `Let's start again!`;
            newGame();
            drawID.disabled = true;
        }
        messageEl.classList = !messageEl.classList;
        messageEl.classList.toggle("balance");

        balanceText.innerText = `${balance}$`;
        balanceText.classList = !balanceText.classList;
        balanceText.classList.toggle("balance");

        popUpModal.classList.add("hide");
    }
}

function closeModalBtn() {
    popUpModal.classList.add("hide");
}

function topUpBtn() {
    popUpModal.classList.remove("hide");
}