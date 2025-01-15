// PRENDO I DATI DAL DOM
const countdown = document.getElementById('countdown');
const instructions = document.getElementById('instructions');
const numbersList = document.getElementById('numbers-list');
const answersForm = document.getElementById('answers-form');
const inputGroup = document.getElementById('input-group');
const message = document.getElementById('message');

// GENERO 5 NUMERI CASUALI NON UGUALI FRA DI LORO E LI SCRIVO NELL'HTML
const minValue = 1;
const maxValue = 50;
const totalNumbers = 5;
let generatedNumbers = [];

function generateRandomUniqueNumbers() {
    let uniqueNumbers = new Set();
    while (uniqueNumbers.size < totalNumbers) {
        uniqueNumbers.add(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
    }
    generatedNumbers = Array.from(uniqueNumbers);
    return generatedNumbers.map(function (number) {
        return "<ul>" + number + "</ul>";
    }).join('');
}

const numbersHTML = generateRandomUniqueNumbers();
numbersList.innerHTML = numbersHTML;

// MOSTRO IL COUNTDOWN A PARTIRE DA SUBITO
let countdownTime = 4;
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
const userNumbers = [];
answersForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const inputs = document.querySelectorAll('#input-group input');
    const userNumbers = Array.from(inputs).map(input => +input.value);
});