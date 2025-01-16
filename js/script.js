// PRENDO I DATI DAL DOM
const countdown = document.getElementById("countdown");
const instructions = document.getElementById("instructions");
const numbersList = document.getElementById("numbers-list");
const answersForm = document.getElementById("answers-form");
const inputGroup = document.getElementById("input-group");
const message = document.getElementById("message");

// FUNZIONE PER GENERARE UN SET DI NUMERI CASUALI DATI DEI PARAMETRI CHE RITORNA UN ARRAY
function generateRandomUniqueNumbers(min, max, total) {
    let numbersSet = new Set();
    while (numbersSet.size < total) {
        numbersSet.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(numbersSet);
}

// parametri decisi per la generazione di numeri casuali diversi fra di loro
const minValue = 1;
const maxValue = 50;
const totalNumbers = 5;

// chiamo la funzione e la salvo in una costante (ottengo così il primo array di confronto)
const generatedNumbers = generateRandomUniqueNumbers(minValue, maxValue, totalNumbers);

// FUNZIONE PER SCRIVERE I VALORI DI UN ARRAY IN UN ELEMENTO HTML <li>
function generateNumbersListHTML(array) {
    return array.map(function (number) {
        return "<li>" + number + "</li>";
    }).join("");
}

// chiamo la funzione, gli do in pasto il primo array di confronto e lo scrivo nell'html
numbersList.innerHTML = generateNumbersListHTML(generatedNumbers);

// MOSTRO IL COUNTDOWN A PARTIRE DA SUBITO
let countdownTime = 30;
countdown.innerHTML = countdownTime;

// inizio il countdown e alla fine di esso nascondo i numeri e mostro il form di input
let countdownInterval = setInterval(function () {
    countdownTime--;
    countdown.innerHTML = countdownTime;

    if (countdownTime < 0) {
        clearInterval(countdownInterval);
        countdown.innerHTML = "";
        numbersList.innerHTML = "";
        answersForm.classList.remove("d-none");
        answersForm.classList.add("d-block");
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
        const number = Number(inputs[i].value);
        if (userNumbers.includes(number)) {
            hasDuplicates = true;
        } else {
            userNumbers.push(number);
        }
    }

    if (hasDuplicates) {
        message.textContent = "Hai inserito numeri duplicati! Riprova.";
    } else {
        compareNumbers(generatedNumbers, userNumbers);
    }
});

// FUNZIONE GENERATA ADHOC PER CONFRONTARE I DUE ARRAY E SCRIVERE UN MESSAGGIO NELL'HTML
function compareNumbers(array1, array2) {
    let correctCount = 0;

    for (let i = 0; i < array1.length; i++) {
        if (array2.includes(array1[i])) {
            correctCount++;
        }
    }

    if (correctCount === 1) {
        message.textContent = "Hai indovinato un numero!";
        message.classList.add("text-success");
        message.classList.remove("text-danger");
    }
    else if (correctCount > 1) {
        message.textContent = "Hai indovinato " + correctCount + " numeri corretti!";
        message.classList.add("text-success");
        message.classList.remove("text-danger");
    } else {
        message.textContent = "Non hai indovinato nessun numero!";
    }
}