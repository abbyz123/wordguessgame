// global variables
let wordGuess = ["Lannister", "Stark", "Tangaryen", "Baratheon", "Cercei", "Arya", "Jon", "Robb", "Daenerys", "Sansa"];    // Guessing words
let imageLoc = "../images/";                                                                                               // image location
let wordImage = [null, null, null, null, null, null, null, null, null, null];                                              // Image to show after a word is correctly guessed
let wordMusic = [null, null, null, null, null, null, null, null, null, null];                                              // Music to play after a word is correctly guessed
let winNum = 0;
let guessNum = 12;

// Game Object
let currentGame = Object();

// word letter hash table
let wordTable = Object();

// Functions
function gameStart() {
    let wordIdx = Math.floor(Math.random() * wordGuess.length);     // Randomly pick a word

    // Initialize the game object
    currentGame.word = wordGuess[wordIdx];                          // load word to object
    currentGame.image = wordImage[wordIdx];                         // load image filename to object
    currentGame.music = wordMusic[wordIdx];                         // load music link to object; 

    // Initialize the webpage
    document.getElementById("wins").innerHTML = "Win: " + winNum;   // Initialize number of wins
    document.getElementById("wordBlank").innerHTML = "_ ".repeat(currentGame.word.length);   // generate blanks according to the word length
    document.getElementById("guessNum").innerHTML = guessNum + " of guess remains"; // number of guess remains

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

