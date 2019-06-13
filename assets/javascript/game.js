// global variables
let wordGuess = ["Lannister", "Stark", "Tangaryen", "Baratheon", "Cercei", "Arya", "Jon", "Robb", "Daenerys", "Sansa"];    // Guessing words
let imageLoc = "../images/";                                                                                               // image location
let wordImage = [null, null, null, null, null, null, null, null, null, null];                                              // Image to show after a word is correctly guessed
let wordMusic = [null, null, null, null, null, null, null, null, null, null];                                              // Music to play after a word is correctly guessed
let winNum = 0;
let guessNum = 12;
let wrongLetterMark = new Array(26).fill(0);
let wrongLetterStr = ""

// Game Object
let currentGame = Object();

// word letter hash table
let wordTable = Object();

// Functions
// initialize the game
function gameStart() {
    // re-initialize global variables for reboot
    guessNum = 12;
    wrongLetterStr = "";
    wrongLetterMark = new Array(26).fill(0);
    currentGame = Object();
    wordTable = Object();

    let wordIdx = Math.floor(Math.random() * wordGuess.length);     // Randomly pick a word

    // Initialize the game object
    currentGame.word = wordGuess[wordIdx];                          // load word to object
    currentGame.image = wordImage[wordIdx];                         // load image filename to object
    currentGame.music = wordMusic[wordIdx];                         // load music link to object; 

    // Initialize the webpage
    document.getElementById("wins").innerHTML = "Win: " + winNum;   // Initialize number of wins
    document.getElementById("wordBlank").innerHTML = "_ ".repeat(currentGame.word.length);   // generate blanks according to the word length
    document.getElementById("guessNum").innerHTML = guessNum + " of guess remains"; // number of guess remains
    document.getElementById("wrongChar").innerHTML = "";

    // initialize the word letter hash table
    for (i = 0; i < currentGame.word.length; i++) {
        currLetter = currentGame.word[i].toUpperCase();
        if (currLetter in wordTable) {
            wordTable[currLetter].push(i);
        } else {
            wordTable[currLetter] = [i];
        }
    }
}

// Reboot the game for winner
function gameRebootLose() {
    console.log(currentGame);
    console.log(wordTable);
    winNum = 0;
    gameStart();
}

// Reboot the game for loser
function gameRebootWin() {
    console.log(currentGame);
    console.log(wordTable);
    gameStart();
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function guessLetter(event) {
    // get key code and convert the key code into upper case character
    let inputCode = event.which | event.keyCode | event.charCode;
    let inputLetter = String.fromCharCode(inputCode);
    inputLetter = inputLetter.toUpperCase();

    // check if the input letter is in the hash table
    if (inputLetter in wordTable) {
        // Pop out the guessed letter position index. If the position indices run out, delete the letter in the hash table
        let pos = wordTable[inputLetter].pop();
        if (wordTable[inputLetter].length === 0) {
            delete wordTable[inputLetter];
        }

        // Show the guessed letter on the wordBlank container
        let currentBlank = document.getElementById("wordBlank").innerText;
        let newBlank = currentBlank.substr(0, 2*pos) + inputLetter + currentBlank.substr(2*pos+1, currentBlank.length);
        document.getElementById("wordBlank").innerHTML = newBlank;

        // restart the game if wins
        if (isEmpty(wordTable)) {
            winNum += 1;
            gameRebootWin();
        }
    } else { // decrease remaining guess number by 1. If the remaining guess number is zero, reboot the whole game
        guessNum -= 1;
        document.getElementById("guessNum").innerHTML = guessNum + " of guess remains"; // number of guess remains
        wrongLetterIdx = inputLetter.charCodeAt(0) - 'A'.charCodeAt(0);
        if (0 === guessNum) {
            gameRebootLose();
        } else if (0 == wrongLetterStr.length) {
            wrongLetterStr += inputLetter;
            wrongLetterMark[wrongLetterIdx] = 1;
        } else if (0 == wrongLetterMark[wrongLetterIdx]) {
            wrongLetterStr = wrongLetterStr + ", " + inputLetter;
            wrongLetterMark[wrongLetterIdx] = 1;
        } else {
            // do nothing
        }
        // update wrong letters guessed
        document.getElementById("wrongChar").innerHTML = wrongLetterStr;
    }
}

