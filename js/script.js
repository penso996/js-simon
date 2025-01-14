// PRENDO I DATI DAL DOM
const countdown = document.getElementById('countdown');
const instructions = document.getElementById('instructions');
const numbersList = document.getElementById('numbers-list');
const answersForm = document.getElementById('answers-form');
const inputGroup = document.getElementById('input-group');
const message = document.getElementById('message');

// GENERO 5 NUMERI CASUALI NON UGUALI FRA DI LORO
const minValue = 1;
const maxValue = 50;
const totalNumbers = 5;

function generateRandomUniqueNumbers() {
    let uniqueNumbers = new Set();
    while (uniqueNumbers.size < totalNumbers) {
        uniqueNumbers.add(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
    }
    return Array.from(uniqueNumbers).map(function (number) {
        return "<ul>" + number + "</ul>";
    }).join('');
}

const numbersHTML = generateRandomUniqueNumbers();
numbersList.innerHTML = numbersHTML;