const svgElement = document.querySelector('#hanged--man svg');
svgElement.classList.add('scale-up');

const passwords = [
    //KRAJE
    "POLSKA", 
    "NORWEGIA", 
    "SZWECJA", 
    "ROSJA", 
    "FRANCJA", 
    "SZWAJCARIA",
    "DANIA", 
    "CZECHY",
    "SŁOWACJA", 
    "SŁOWENIA", 
    "WĘGRY", 
    "NIEMCY", 
    "HOLANDIA", 
    "HISZPANIA", 
    "PORTUGALIA", 
    "BELGIA", 
    "WŁOCHY", 
    "GRECJA", 
    "FINLANDIA", 
    "AUSTRIA",

    //ZWIERZĘTA
    "KOŃ", 
    "LEW", 
    "MAŁPA", 
    "SMOK", 
    "RYBA", 
    "REKIN", 
    "SŁOŃ", 
    "ZEBRA", 
    "WILK", 
    "TYGRYS", 
    "SŁOŃ", 
    "KANGUR", 
    "ŻYRAFA", 
    "KOALA", 
    "PANDA", 
    "LIS",

    //POJAZDY
    "MOTOR", 
    "QUAD", 
    "CIĄGNIK", 
    "TIR", 
    "AUTOBUS", 
    "SAMOCHÓD", 
    "ROWER", 
    "SKUTER", 
    "MOTORÓWKA", 
    "HELIKOPTER",

    //WALUTY
    "ZŁOTY", 
    "EURO", 
    "DOLAR", 
    "FUNT", 
    "YEN", 
    "FRANK", 
    "KORONA", 
    "PESO", 
    "RUBEL",
];

let wrongGuesses = 0;

function pickRandomPassword() {
    const randomPassword = passwords[Math.floor(Math.random() * passwords.length)].toUpperCase();
    return randomPassword;
}

function passwordEncryption(randomPassword) {
    let encryptedPasswordArray = [];
    for (let i = 0; i < randomPassword.length; i++) {
        if (randomPassword.charAt(i) === " ") {
            encryptedPasswordArray.push(" ");
        } else {
            encryptedPasswordArray.push("_");
        }
        encryptedPasswordArray.push(" ");
    }

    encryptedPasswordArray.pop(); 
    let encryptedPassword = encryptedPasswordArray.join("");
    return encryptedPassword;
}

function getLetter(event) {
    const letter = event.target.textContent.toUpperCase();
    checkPassword(letter); 
}

function checkPassword(letter) {
    const passwordToGuess = document.getElementById("passwordHeader").dataset.password;
    let encryptedPassword = document.getElementById("passwordHeader").textContent; 
    let correctGuess = false;
    let updatedPasswordArray = encryptedPassword.split(" "); 

    for (let i = 0; i < passwordToGuess.length; i++) {
        if (passwordToGuess.charAt(i) === letter) {
            updatedPasswordArray[i] = letter; 
            correctGuess = true;
        }
    }

    const updatedEncryptedPassword = updatedPasswordArray.join(" ");
    document.getElementById("passwordHeader").textContent = updatedEncryptedPassword;

    const button = Array.from(document.querySelectorAll(".letters")).find(button => button.textContent.toUpperCase() === letter);
    button.disabled = true;
    button.style.cursor = "default";
    button.style.transform = "scale(1)";

    if (correctGuess) {
        button.style.backgroundColor = "green";
        button.style.borderColor = "green";
    } else {
        button.style.backgroundColor = "red";
        button.style.borderColor = "red";
        wrongGuesses++;
        drawHangman(wrongGuesses);
    }

    if (!updatedPasswordArray.includes("_")) {
        alert("Wygrałeś!");
        setTimeout(resetGame, 2000);
    }

    if (wrongGuesses >= 7) {
        alert("Przegrałeś! Hasło to: " + passwordToGuess);
        resetGame();
    }
}

function drawHangman(wrongGuesses) {
    const parts = document.querySelectorAll('.part');
    if (wrongGuesses <= parts.length) {
        parts[wrongGuesses - 1].style.display = 'block';
    }
}

function resetGame() {
    wrongGuesses = 0;
    document.querySelectorAll('.part').forEach(part => part.style.display = 'none');

    const lettersButton = document.querySelectorAll(".letters");
    lettersButton.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = "";
        button.style.borderColor = "";
    });

    init();
}

const init = () => {
    const passwordToGuess = pickRandomPassword();
    let encryptedPassword = passwordEncryption(passwordToGuess);
    let passwordHeader = document.getElementById("passwordHeader");
    passwordHeader.textContent = encryptedPassword;
    passwordHeader.dataset.password = passwordToGuess;

    const lettersButton = document.querySelectorAll(".letters");
    lettersButton.forEach(button => {
        button.addEventListener("click", getLetter);
    });

    const faqBtn = document.getElementById("faqBtn");
    faqBtn.addEventListener("click", () => {
        alert("Kategorie haseł: kraje, zwierzęta, pojazdy, waluty. GL HF :)");
    })
}

window.onload = init;
