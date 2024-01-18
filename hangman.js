const wordDisplay = document.querySelector('.word-display');
const hangman = document.querySelector('.hangman-box img');
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector('.keyboard');
const gameModal = document.querySelector('.game-modal');
const playAgain = document.querySelector('.play-again');

let currentWord, correctLetters, wrongGuessesCount;
const maxGuesses = 6;

const resetGame = () =>{
    // Resetting all game variables and UI elements
    correctLetters = [];
    wrongGuessesCount = 0;
    hangman.src = `images/hangman/hangman-${wrongGuessesCount}.svg`;
    guessesText.innerText = `${wrongGuessesCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove('show');
}

const getRandomWord = () => {
    //Selecting a random word from our list
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        //After 600ms of game Complete... showing modal with relevant details
        const modalText = isVictory ? `Use this BARAD_COUPON:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/hangman/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congratulations! You Just Earned 25% discount on your next visit!' : 'Whops!! Better luck next time!'}`;
        gameModal.querySelector("p").innerHTML = isVictory ? `${modalText} <b>${Math.ceil(Math.random()*300000 + 5000)}</b>` : `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add('show');
    }, 300)
}

const initGame = (button, clickedLetter) => {
    // checkin if clicked letter is there in the word or not
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        //if clicked letter doesn't exist then update the wrongGuessesCount and hangman image
        wrongGuessesCount++;
        hangman.src = `images/hangman/hangman-${wrongGuessesCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessesCount} / ${maxGuesses}`;

    //Calling the gameOver function of any of these condition meets
    if (wrongGuessesCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}
getRandomWord();
playAgain.addEventListener("click", getRandomWord);
