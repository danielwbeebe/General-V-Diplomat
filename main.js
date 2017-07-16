/*
Setting variables for player turn, non-player turn, previous turn, game winner,
turn winner, if previous turn was a win, and number of turns
*/
var playerTurn = "";
var otherTurn = "";
var gameWinner = "";
var turnWinner = "";
var winFail = "";
var numTurns = 0;

// Creating empty arrays with continents for each player
gArray = [];
dArray = [];

// Creating variable for all continents
var allContinents = document.querySelectorAll(".continents .box");

/*
Automatically playing typing sound when introduction displays
Found method to play audio at: https://stackoverflow.com/questions/9419263/playing-audio-with-javascript
Looked at MDN for .play method: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
*/
var audio = new Audio('audio/typing-sound.wav');
audio.play();

// Making the rules appear in the aside section when the "Rules" button is clicked
function clickRules() {

  /* removing the Introdution title and text so that, when the rules title and text
  are added, the typewriter effect for the title and the fade-in effect for the text
  will be implemented for the rules section when it appears.
  Thanks and credit to J Silverstein for suggesing removing the entire id
  and restoring it to re-generate the CSS animation.
  */
  document.getElementById("announceTitle").remove();
  document.getElementById("announceText").remove();

  // creating rules title and text to add back if rule button clicked
  let rulesDiv = document.createElement('div');
    rulesDiv.innerHTML = "<h3 class='announceTitle' id='announceTitle'>The Rules of 'General vs. Diplomat'</h3><p class='announceText' id='announceText'>\'General Versus Diplomat\' is a 2-player game.<br><br>A player is randomly chosen to start the continent-selection process. Each player chooses 3 continents.<br><br>The General is RED.<br><br>The Diplomat is BLUE.<br><br>After the setup, the General 'attacks' the Diplomat's continents; the Diplomat 'negotiates' with the General's continents.<br><br>The success of a move depends on chance. If a player is successful during a turn, that player takes control of the continent.<br><br>A player wins by controlling all 6 continents.</p><br>";

  // appending the rules title and text back to the 'aside' section
  let intro = document.querySelector('#aside-intro');
    intro.appendChild(rulesDiv);

  // Audio plays if General wins the game
  // Clip from: https://freesound.org/
  var audio = new Audio('audio/typing-sound.wav');
  audio.play();

  // Removing the rules button after it is clicked
  document.getElementById("rules").style.display = "none";
};

/* Function starting game, changing board messages and calling random player function
to choose to starts and function to add event listeners to continent boxes */
function startGame() {

  // Calling function to set random player to start
  randomPlayer();

  // Adding event listeners to continents at start of game
  addListeners();

  // Changing text on game board for continent selection phase
  document.getElementById("status-text").innerHTML = "Pick a continent.";
  document.getElementById("turn-message").innerHTML = `${playerTurn}, it's your turn.`;

  /*
  Hides the Rules and Start buttons as soon as the game starts, and reveals the game board
  And removes the intro and rules section, and re-adjusts padding for game board
  Found helpful example of display none at:
  https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_style_display
  */
  document.getElementById("play").style.display = "none";
  document.getElementById("rules").style.display = "none";
  document.getElementById("aside-intro").style.display = "none";
  document.getElementById("all-boxes").style.padding="60px 20px 60px 20px";
  document.getElementById("continents-north").style.display = "inline-block";
  document.getElementById("continents-south").style.display = "inline-block";

  // Displaying reset button when game starts
  document.getElementById("reset").style.display = "inline-block";

  /*
  Audio plays for start of game
  Clip from: https://freesound.org/
  */
  var audio = new Audio('audio/win-audio.wav');
  audio.play();
};

// function to randomly select starting player
function randomPlayer() {

  /*
  Creating function to pick a random player to start
  I got Math.floor Math.random method for getting a randomized number from:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  */
  var randNum = Math.floor(Math.random() * 2);

  // Selecting either General or Diplomat to start after 50/50 chance determined
  if (randNum === 0) {
    playerTurn = "General";
  } else {
    playerTurn = "Diplomat";
  }
};

// Adding event listener to all continents
function addListeners() {
  for (let i=0; i<allContinents.length; i++) {
    allContinents[i].addEventListener("click", selectContinent);
  };
};

// Alternating turns to select 3 continents each
function selectContinent() {

  var allContinents = document.querySelectorAll(".continents .box");

    if (playerTurn === 'General'){
      gArray.push(this.getAttribute('id'));

    /*
    Thanks and credit to Phil Zak for advice on setting an attribute to the continents
    to utilize later in determining winner change color of selected continent
    */
      this.style.backgroundColor = "#E52C1A";
      this.setAttribute('data-player', 'General');
      playerTurn = "Diplomat";
      this.removeEventListener("click", selectContinent);
    } else if (playerTurn === 'Diplomat') {
      dArray.push(this.getAttribute('id'));

    // change color of selected continent
      this.style.backgroundColor = "#001775";
      this.setAttribute('data-player', 'Diplomat');
      playerTurn = "General";
      this.removeEventListener("click", selectContinent);
    }
    document.getElementById("turn-message").innerHTML = `${playerTurn}, it's your turn.`;
    selectDone();
};

// adding function to end continent selection phase

function selectDone() {
  if (gArray.length + dArray.length === 6) {
    document.getElementById("status-text").innerHTML = "General and Diplomat, you must now struggle to win the world to your side.";
    playGame();
    if (playerTurn === 'General') {
      document.getElementById("turn-message").innerHTML = `${playerTurn}, it's your turn.`;
    } else if (playerTurn === 'Diplomat'){
      document.getElementById("turn-message").innerHTML = `${playerTurn}, it's your turn.`;
    };
  };
};

// Function to begin the game play
function playGame() {

  document.getElementById("status-text").innerHTML = "General, attack BLUE continents.<br>Diplomat, negotiate with RED continents.";
  document.getElementById("turn-message").innerHTML = `${playerTurn}, it's your turn.`;

  // Adding event listeners to continents at start of game
  addNewListeners();

  // Audio plays for the begin of game play
  var audio = new Audio('audio/war-audio.wav');
  audio.play();
};

// Adding new listeners so the boxes can be clicked again
function addNewListeners() {
    var allContinents = document.querySelectorAll(".continents .box");
    for (let i=0; i < allContinents.length; i++) {
      allContinents[i].addEventListener("click", attackContinent);
    };
  };

// Getting a random 1 or 0 to determine winner of each move.
function randomWinner() {

  /*
  sets a maximum number of turns before a random winner is selected,
  to avoid an overly long game caused by the 50/50 chance for each turn
  */
  if (numTurns < 20) {

    // Using a random number to pick a winner for each attack
    var randNum = Math.floor(Math.random() * 2);

    // Selecting either General or Diplomat to win an attack, with 50/50 chance
    if (randNum === 0) {
      turnWinner = "General";
    } else if (randNum === 1) {
      turnWinner = "Diplomat";
    }
  };
};

/*
Function to find a winner
Thanks and credit to Jonathan Ahrens at SRC for helping to understand
hoisting to avoid JS glitch
*/
function checkWinner() {
  let generalCounter = 0;
  let diplomatCounter = 0;

  // For loop checking to see how many continents each player controls
  for (let i = 0; i < allContinents.length; i++) {
    if (allContinents[i].getAttribute("data-player") === 'Diplomat') {
        diplomatCounter = (diplomatCounter + 1);
    } else if(allContinents[i].getAttribute("data-player") === 'General') {
        generalCounter = (generalCounter +1);
    };
  };

  // If the general wins (has all 6 continents), then general wins and new messages appear
  if (generalCounter === 6) {
    gameWinner = "General";
    document.getElementById("status-text").innerHTML = "The GENERAL has won!<br><br>The entire world is at WAR!";
    document.getElementById("turn-message").innerHTML = "Game Over!<br><br>No more turns.";

    // Audio plays if General wins the game
    // Clip from: https://freesound.org/
    var audio = new Audio('audio/game-victory.wav');
    audio.play();

    // Turn off event listeners if general wins
    for (let i=0; i < allContinents.length; i++) {
      allContinents[i].removeEventListener("click", attackContinent);
    }
  }
  // If the diplomat wins (has all 6 continents), then diplomat wins and new messages appear
  else if (diplomatCounter === 6) {
    gameWinner = "General";
    document.getElementById("status-text").innerHTML = "The DIPLOMAT has won!<br><br>The entire world is at PEACE!";
    document.getElementById("turn-message").innerHTML = "Game Over!<br><br>No more turns";

    // Audio plays if Diplomat wins the game
    // Clip from: https://freesound.org/
    var audio = new Audio('audio/game-victory.wav');
    audio.play();

    // Turn off event listeners if Diplomat wins
    for (let i=0; i < allContinents.length; i++) {
      allContinents[i].removeEventListener("click", attackContinent);
    }
  }
};

// Function for the game moves-attacks
function attackContinent() {
  randomWinner();

  if (gameWinner === "") {

    // For General's turn, if turn winner, attack on diplomat contient changes it to Red
    if ((playerTurn === 'General') && (turnWinner === 'General') && (this.getAttribute("data-player") == 'Diplomat')) {
      this.style.backgroundColor = "#E52C1A";
      this.setAttribute('data-player', 'General');
      playerTurn = "Diplomat";
      otherTurn = 'General';
      winFail = ' took your continent away!'

      // Increasing the variable for number of turns taken to avoid overly-long game
      numTurns = (numTurns + 1);

      // Audio plays for a winning turn
      // Clip from: https://freesound.org/
      var audio = new Audio('audio/violin-strum.wav');
      audio.play();
    }
      // For General's turn, if turn not winner, click just changes turns to diplomat
      else if ((playerTurn === 'General') && (turnWinner !== 'General') && (this.getAttribute("data-player") == 'Diplomat')) {
      playerTurn = "Diplomat";
      otherTurn = 'General';
      winFail = ' FAILED to reduce your power!'
      numTurns = (numTurns + 1);

      // Audio plays for a losing turn
      // Clip from: https://freesound.org/
      var audio = new Audio('audio/low-string.wav');
      audio.play();
    }
    // For Diplomat's turn, if turn winner, attack on general contient changes it to Blue
      else if ((playerTurn === 'Diplomat') && (turnWinner === 'Diplomat') && (this.getAttribute("data-player") == 'General')) {
      this.style.backgroundColor = "#001775";
      this.setAttribute('data-player', 'Diplomat');
      playerTurn = "General";
      otherTurn = 'Diplomat';
      winFail = ' took your continent away!'
      numTurns = (numTurns + 1);

      // Variable plays for a winning turn
      var audio = new Audio('audio/violin-strum.wav');
      audio.play();
    }
      // For Diplomat's turn, if not turn winner, click just changes turns to general
      else if ((playerTurn === 'Diplomat') && (turnWinner !== 'Diplomat') && (this.getAttribute("data-player") == 'General')) {
      playerTurn = "General";
      otherTurn = 'Diplomat';
      winFail = ' FAILED to reduce your power!'
      numTurns = (numTurns + 1);

      // Audio plays for a losing turn
      var audio = new Audio('audio/low-string.wav');
      audio.play();
    }
  };

  // Calling the function to check for a winner
  checkWinner();

  // Adding this if statement fixed glitch where messages would be blank sometimes
  if (gameWinner === "") {

  // Creating new message for turn
  document.getElementById("turn-message").innerHTML = `${playerTurn}, it's your turn.`;

  // Updating the status message
  document.getElementById("status-text").innerHTML = `Play! ${otherTurn} ${winFail}`;
  }
};
