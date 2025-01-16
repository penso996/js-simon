// PRENDO I DATI DAL DOM
const countdown = document.getElementById("countdown");
const instructions = document.getElementById("instructions");
const numbersList = document.getElementById("numbers-list");
const answersForm = document.getElementById("answers-form");
const inputGroup = document.getElementById("input-group");
const message = document.getElementById("message");

// FUNZIONE PER GENERARE UN SET DI NUMERI CASUALI DATI DEI PARAMETRI E TRASFORMARLO IN ARRAY
function generateRandomUniqueNumbers(minValue, maxValue, totalNumbers) {
    let numbersSet = new Set();
    while (numbersSet.size < totalNumbers) {
        numbersSet.add(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
    }
    return Array.from(numbersSet);
}

// valori decisi per la generazione di numeri casuali diversi fra di loro
const minValue = 1;
const maxValue = 50;
const totalNumbers = 5;

// chiamo la funzione e la salvo in una costante
const generatedNumbers = generateRandomUniqueNumbers(minValue, maxValue, totalNumbers);

// FUNZIONE PER SCRIVERE I VALORI DI UN ARRAY IN UN ELEMENTO HTML <li>
function numbersHTML(numbersArray) {
    return numbersArray.map(function (number) {
        return "<li>" + number + "</li>";
    }).join("");
}

// chiamo la funzione e scrivo nell'index
numbersList.innerHTML = numbersHTML(generatedNumbers);

// MOSTRO IL COUNTDOWN A PARTIRE DA SUBITO
let countdownTime = 30;
countdown.innerHTML = countdownTime;

// INIZIO IL COUNTDOWN E ALLA FINE DI ESSO NASCONDO I NUMERI E MOSTRO IL FORM DI INPUT
let countdownInterval = setInterval(function () {
    countdownTime--;
    countdown.innerHTML = countdownTime;

    if (countdownTime < 0) {
        clearInterval(countdownInterval);
        numbersList.innerHTML = "";
        answersForm.classList.remove("d-none");
        answersForm.classList.add("d-block");
        countdown.innerHTML = "";
    }
}, 1000);

// LEGGO L'INPUT DEL FORM E LO VALIDO PER POI PASSARE AL CONFRONTO
let userNumbers = [];

answersForm.addEventListener("submit", function (event) {
    event.preventDefault();
    userNumbers = [];

    const inputs = document.querySelectorAll("#input-group input");
    let hasDuplicates = false;

    for (let i = 0; i < inputs.length; i++) {
        let number = Number(inputs[i].value);
        if (userNumbers.includes(number)) {
            hasDuplicates = true;
        } else {
            userNumbers.push(number);
        }
    }

    if (hasDuplicates) {
        message.textContent = "Hai inserito numeri duplicati! Riprova.";
    } else {
        compareNumbers();
    }
});

// FUNZIONE GENERATA ADHOC PER CONFRONTARE I NUMERI E SCRIVERE UN MESSAGGIO NELL'HTML
function compareNumbers(generatedNumbers, userNumbers) {
    let correctCount = 0;

    for (let i = 0; i < generatedNumbers.length; i++) {
        if (userNumbers.includes(generatedNumbers[i])) {
            correctCount++;
        }
    }

    if (correctCount > 1) {
        message.textContent = "Hai indovinato " + correctCount + " numeri corretti!";
        message.classList.add("text-success");
        message.classList.remove("text-danger");
    } else if (correctCount === 1) {
        message.textContent = "Hai indovinato un numero!";
        message.classList.add("text-success");
        message.classList.remove("text-danger");
    } else {
        message.textContent = "Non hai indovinato nessun numero!";
    }
}