// Setting variable for player turn
var playerTurn = "";

// Setting variable for previous turn's player
var otherTurn = "";

// Creating variable for winner of the game
var gameWinner = "";

// Creating variable for winner of each turn
var turnWinner = "";

//creating variable for previous turn's player's success or failure
var winFail = "";

// creating variable for number of turns
var numTurns = 0;

// Creating empty arrays with continents for each player
gArray = [];
dArray = [];

// Creating variable for all continents
var allContinents = document.querySelectorAll(".continents .box");

// Making the rules appear in the aside section when the "Rules" button is clicked
function clickRules() {
  document.getElementById("announceTitle").innerHTML = "The Rules";
  document.getElementById("announceText").innerHTML = "\'General Versus Diplomat\' is a 2-player game. To begin, each player chooses 3 continents. Next, the game play begins.<br><br>The General 'attacks' one of the Diplomat's continents for each turn. The Diplomat 'negotiates' with one of the General's continents for each turn. If a player is successful during a turn, that player takes control of the continent. But losing means the player loses a continent.<br><br>A player wins by controlling all 6 continents.";
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
  Hides the Rules and Start buttons as soon as the game starts
  Found useful example of display none at:
  https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_style_display
  */
  document.getElementById("play").style.display = "none";
  document.getElementById("rules").style.display = "none";
  document.getElementById("aside-intro").style.display = "none";

   /*
    Audio plays for start of game
    Clip from: https://freesound.org/
    Found method to play audio at: https://stackoverflow.com/questions/9419263/playing-audio-with-javascript
    */
    var audio = new Audio('audio/win-audio.wav');

    // Looked at MDN for .play method: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
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
  } else if (randNum === 1) {
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
  var audio = new Audio('audio/lose-audio.wav');
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
  if (numTurns < 12) {

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
how to fix a bug in my check for winner function
and to hoist above attack function to avoid JS glitch
*/
function checkWinner() {
  let generalCounter = 0;
  let diplomatCounter = 0;

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
  }
};

// Function for the game moves-attacks
function attackContinent() {
  randomWinner()

  if (gameWinner === "") {

    // For General's turn, if turn winner, attack on diplomat contient changes it to Red
    if ((playerTurn === 'General') && (turnWinner === 'General') && (this.getAttribute("data-player") == 'Diplomat')) {
      this.style.backgroundColor = "#E52C1A";
      this.setAttribute('data-player', 'General');
      playerTurn = "Diplomat";
      otherTurn = 'General';
      winFail = ' took your continent away!'

      // Audio plays for a losing turn
      // Clip from: https://freesound.org/
      var audio = new Audio('audio/win-audio.wav');
      audio.play();

      // Increasing the variable for number of turns taken
      numTurns = (numTurns + 1);
      console.log(numTurns);

    }
      // For General's turn, if turn not winner, click just changes turns to diplomat
      else if ((playerTurn === 'General') && (turnWinner !== 'General') && (this.getAttribute("data-player") == 'Diplomat')) {
      playerTurn = "Diplomat";
      otherTurn = 'General';
      winFail = ' FAILED to reduce your power!'

      // Increasing the variable for number of turns taken
      numTurns = (numTurns + 1);
      console.log(numTurns);

      // Audio plays for a losing turn
      // Clip from: https://freesound.org/
      var audio = new Audio('audio/lose-audio.wav');
      audio.play();
    }
    // For Diplomat's turn, if turn winner, attack on general contient changes it to Blue
      else if ((playerTurn === 'Diplomat') && (turnWinner === 'Diplomat') && (this.getAttribute("data-player") == 'General')) {
      this.style.backgroundColor = "#001775";
      this.setAttribute('data-player', 'Diplomat');
      playerTurn = "General";
      otherTurn = 'Diplomat';
      winFail = ' took your continent away!'

      // Variable plays for a successful turn
      var audio = new Audio('audio/win-audio.wav');
      audio.play();

      // Increasing the variable for number of turns taken
      numTurns = (numTurns + 1);
      console.log(numTurns);
    }
      // For General's turn, if turn not winner, click just changes turns to general
      else if ((playerTurn === 'Diplomat') && (turnWinner !== 'Diplomat') && (this.getAttribute("data-player") == 'General')) {
      playerTurn = "General";
      otherTurn = 'Diplomat';
      winFail = ' FAILED to reduce your power!'

      // Audio plays for a losing turn
      var audio = new Audio('audio/lose-audio.wav');
      audio.play();

      // Increasing the variable for number of turns taken
      numTurns = (numTurns + 1);
      console.log(numTurns);
    }
  };

  // Calling the function to check for a winner
  checkWinner();

  // Adding this if statement fixed glitch where messages would be blank sometimes
  if (gameWinner === "") {

  // Creating new message for turn
  document.getElementById("turn-message").innerHTML = `${playerTurn}, it's your turn.`;

  // Updating the status message
  document.getElementById("status-text").innerHTML = `Keep playing! ${otherTurn} ${winFail}`;
  }
};
