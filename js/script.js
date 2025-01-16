// PRENDO I DATI DAL DOM
const countdown = document.getElementById('countdown');
const instructions = document.getElementById('instructions');
const numbersList = document.getElementById('numbers-list');
const answersForm = document.getElementById('answers-form');
const inputGroup = document.getElementById('input-group');
const message = document.getElementById('message');

// GENERO 5 NUMERI CASUALI NON UGUALI FRA DI LORO E LI SALVO IN UN ARRAY
function generateRandomUniqueNumbers(minValue, maxValue, totalNumbers) {
    let numbersSet = new Set();
    while (numbersSet.size < totalNumbers) {
        numbersSet.add(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
    }
    return Array.from(numbersSet);
}

const minValue = 1;
const maxValue = 50;
const totalNumbers = 5;

const generatedNumbers = generateRandomUniqueNumbers(minValue, maxValue, totalNumbers);

// SCRIVO I NUMERI SALVATI NELL'ARRAY NELL'HTML
generatedNumbers = Array.from(uniqueNumbers);
return generatedNumbers.map(function (number) {
    return "<ul>" + number + "</ul>";
}).join('');
}

const numbersHTML = generateRandomUniqueNumbers();
numbersList.innerHTML = numbersHTML;

// MOSTRO IL COUNTDOWN A PARTIRE DA SUBITO
let countdownTime = 30;
countdown.innerHTML = countdownTime;

// INIZIO IL COUNTDOWN E ALLA FINE DI ESSO NASCONDO I NUMERI E MOSTRO IL FORM DI INPUT
let countdownInterval = setInterval(function () {
    countdownTime--;
    countdown.innerHTML = countdownTime;

    if (countdownTime < 0) {
        clearInterval(countdownInterval);
        numbersList.innerHTML = '';
        answersForm.classList.remove('d-none');
        answersForm.classList.add('d-block');
        countdown.innerHTML = '';
    }
}, 1000);

// LEGGO L'INPUT DEL FORM
let userNumbers = [];

answersForm.addEventListener('submit', function (event) {
    event.preventDefault();
    userNumbers = [];

    const inputs = document.querySelectorAll('#input-group input');
    let hasDuplicates = false;

    for (let i = 0; i < inputs.length; i++) {
        let number = Number(inputs[i].value);
        if (userNumbers.includes(number)) {
            hasDuplicates = true;
        }
        userNumbers.push(number);
        inputs[i].value = '';
    }

    if (hasDuplicates) {
        message.textContent = "Hai inserito numeri duplicati! Riprova.";
    } else {
        compareNumbers();
    }
});

// CONFRONTO I NUMERI GENERATI CON I NUMERI INSERITI
function compareNumbers() {
    let correctCount = 0;

    for (let i = 0; i < generatedNumbers.length; i++) {
        if (userNumbers.includes(generatedNumbers[i])) {
            correctCount++;
        }
    }

    if (correctCount > 1) {
        message.textContent = "Hai indovinato " + correctCount + " numeri corretti!";
        message.classList.add('text-success');
        message.classList.remove('text-danger');
    } else if (correctCount == 1) {
        message.textContent = "Hai indovinato un numero!";
        message.classList.add('text-success');
        message.classList.remove('text-danger');
    }
    else {
        message.textContent = "Non hai indovinato nessun numero!";
    }
}