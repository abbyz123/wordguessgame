// global variables
let wordGuess = ["Lannister", "Stark", "Targaryen", "Baratheon", "Cersei", "Arya", "Jon", "Tyrion", "Daenerys", "Sansa"];    // Guessing words
let imageLoc = "assets/images/";                                                                                               // image location
let wordImage = ["House_Lannister.svg", "House_Stark.svg", "House_Targaryen.svg", "House_Baratheon.svg", 
                 "Cersei.jpg", "Arya.jpg", "Jon.png", "Tyrion.jpg", "Danny.jpg", "Sansa.jpg"];                                           // Image to show after a word is correctly guessed
let wordCaption = ["Hear me roar", "Winter is coming", "Fire and Blood", "Ours is the fury", 
                   "Power is power", "A girl has no name", "You know nothing Jon Snow", "I drink and I knowthings",
                   "Daenerys of the House Targaryen, the First of Her Name, The Unburnt, Queen of the Andals, the Rhoynar and the First Men, Queen of Meereen, Khaleesi of the Great Grass Sea, Protector of the Realm, Lady Regent of the Seven Kingdoms, Breaker of Chains and Mother of Dragons", "Lady of Winterfell"];
let wordMusic = [null, null, null, null, null, null, null, null, null, null];                                              // Music to play after a word is correctly guessed
let winNum = 0;
let guessNum = 12;
let wrongLetterStr = "";

// Game Object
let currentGame = Object();

// word letter hash table
let wordTable = Object();

// wrong letter hash table
let wrongTable = Object();

// Functions
// initialize the game
function gameStart() {
    // re-initialize global variables for reboot
    guessNum = 12;
    wrongLetterStr = "";
    currentGame = Object();
    wordTable = Object();
    wrongTable = Object();

    let wordIdx = Math.floor(Math.random() * wordGuess.length);     // Randomly pick a word

    // Initialize the game object
    currentGame.word = wordGuess[wordIdx];                          // load word to object
    currentGame.image = wordImage[wordIdx];                         // load image filename to object
    currentGame.music = wordMusic[wordIdx];                         // load music link to object; 
    currentGame.wordCaption = wordCaption[wordIdx];                 // load word image caption to object

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

// Reboot the game for loser
function gameRebootLose() {
    winNum = 0;
    gameStart();
}

// Reboot the game for winner
function gameRebootWin() {
    gameStart();
}

// check if an object is empty
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
            document.getElementById("answer").innerHTML = currentGame.word;         // show the answer

            // show image
            document.getElementById("answerImage").innerHTML = "<img src=" + '\"' + imageLoc + currentGame.image + '\"' + 
                                                               " width=" + '\"' + "50%" + '\"' + 
                                                               " height=" + '\"' + "50%" + '\"' + 
                                                               " alt=" + '\"' + "got" + '\"' + ">";
            // show image caption
            document.getElementById("imageCaption").innerHTML = "<h5>" + currentGame.wordCaption + "</h5>";

            winNum += 1;                                                            // winner : win + 1
            gameRebootWin();                                                        // reboot the game for winner
        }
    } else { // decrease remaining guess number by 1. If the remaining guess number is zero, reboot the whole game
        guessNum -= 1;
        document.getElementById("guessNum").innerHTML = guessNum + " of guess remains"; // number of guess remains
        if (0 === guessNum) {
            // numnber of guess runs out! Reboot for loser!
            gameRebootLose();
        } else if (0 == wrongLetterStr.length) {
            // first wrong letter
            wrongLetterStr += inputLetter;
            wrongTable[inputLetter] = 1;
        } else if (!(inputLetter in wrongTable)) {
            // following wrong letter occurs the first time
            wrongLetterStr = wrongLetterStr + ", " + inputLetter;
            wrongTable[inputLetter] = 1;
        } else {
            // do nothing
        }
        // update wrong letters guessed
        document.getElementById("wrongChar").innerHTML = wrongLetterStr;
    }
}

