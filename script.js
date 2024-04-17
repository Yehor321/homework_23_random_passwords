let lengthInput = document.getElementById('length');
let numbersCheckbox = document.getElementById('numbers');
let lettersCheckbox = document.getElementById('letters');
let startButton = document.getElementById('start');
let passwordSpan = document.getElementById('password');

let randomNumbers = [];
let randomLetters = [];

numbers_on();
letters_on();

async function numbers_on() {
    try {
        const response = await fetch(`https://www.random.org/integers/?num=10&min=1&max=9&col=1&base=10&format=plain&rnd=new`);
        const result = await response.text();
        randomNumbers = result.trim().split('\n');
    } catch (error) {
        console.error(error);
    }
}

async function letters_on() {
    try {
        const response = await fetch(`https://www.random.org/strings/?num=3&len=18&digits=off&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new`);
        const result = await response.text();
        randomLetters = result.trim().split('');
    } catch (error) {
        console.error(error);
    }
}

function getPasswordObject() {
    let passwordObject = [];
    if (numbersCheckbox.checked) {
        passwordObject = passwordObject.concat(randomNumbers);
    }
    if (lettersCheckbox.checked) {
        passwordObject = passwordObject.concat(randomLetters);
    }
    return passwordObject;
}

startButton.addEventListener('click', async function(event) {
    event.preventDefault();

    await numbers_on();
    await letters_on();

    let passwordObject = getPasswordObject();
    let length = parseInt(lengthInput.value);
    console.log(length);

    let password = '';

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * passwordObject.length);
        password += passwordObject[randomIndex];
        console.log(randomIndex);
    }

    passwordSpan.textContent = password;
});
