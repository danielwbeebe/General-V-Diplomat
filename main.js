// Setting variable for player turn
var playerTurn = "";

// creating empty arrays with continents for each player
gArray = [];
dArray = [];

// creating variable for all continents
var allContinents = document.querySelectorAll(".continents .box");

// making the rules appear in the aside section when the "Rules" button is clicked
function clickRules() {
  document.getElementById("announceTitle").innerHTML = "The Rules";
  document.getElementById("announceText").innerHTML = "\'General Versus Diplomat\' is a 2-player game. To begin, each player chooses 3 continents. Next, the game play begins.<br><br>The General 'attacks' one of the Diplomat's continents for each turn. The Diplomat 'negotiates' with one of the General's continents for each turn. If a player is successful during a turn, that player takes control of the continent. But losing means the player loses a continent.<br><br>A player wins by controlling all 6 continents.";
};

// Phase One: Continent Selection

  // Change aside section and 3 lower boxes in the continent selecting phase of the game
function startGame() {

  // calling function to set random player to start
  randomPlayer();

  // adding event listeners to continents at start of game
  addListeners();

  // changing text on game board for continent selection phase
  document.getElementById("announceTitle").innerHTML = "Begin Selecting";
  document.getElementById("announceText").innerHTML = "General and Diplomat, welcome.<br><br>You will alternate selecting the continents you wish to control.<br><br>You each get 3 continents.<br><br>Choose wisely.";
  document.getElementById("status-text").innerHTML = "General and Diplomat, you will each need to pick 3 continents.";
  document.getElementById("turn-message").innerHTML = `${playerTurn}, it's your turn.`;
};

// function to randomly select starting player
function randomPlayer() {

// using the random number to pick a random player to start
  // got Math.floor Math.random method for getting a randomized number from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  var randNum = Math.floor(Math.random() * 2);

  // selecting either General or Diplomat to go after 50/50 chance determined
  if (randNum === 0) {
    playerTurn = "General";
  } else if (randNum === 1) {
    playerTurn = "Diplomat";
  }
};

// adding event listener to continents
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

    // change color of selected continent
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

// Phase Two: Game Play

function playGame() {

  document.getElementById("announceTitle").innerHTML = "Begin The Struggle";
  document.getElementById("announceText").innerHTML = "General and Diplomat, the fight is now.<br><br>Whether the world suffers war or enjoys peace is up to you!<br><br>May the better player win!";
  document.getElementById("status-text").innerHTML = "General and Diplomat, you will each need to fight it out until someone wins.";
  document.getElementById("turn-message").innerHTML = `${playerTurn}, it's your turn.`;

  // adding event listeners to continents at start of game
  addNewListeners();
};

// adding new listeners so the boxes can be clicked again
function addNewListeners() {
    var allContinents = document.querySelectorAll(".continents .box");
    for (let i=0; i < allContinents.length; i++) {
      allContinents[i].addEventListener("click", attackContinent);
    };
  };

// creating variable for winner of the game
var gameWinner = "";

// creating variable for winner of each turn
var turnWinner = "";

// getting a random 1 or 0 to determine winner of each move.
function randomWinner() {

// using a random number to pick a winner for each attack
  var randNum = Math.floor(Math.random() * 2);

  // selecting either General or Diplomat to win an attack, with 50/50 chance
  if (randNum === 0) {
    turnWinner = "General";
  } else if (randNum === 1) {
    turnWinner = "Diplomat";
  }
};

// Function to find a winner
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

  if (generalCounter === 6) {
    gameWinner = "General";
    document.getElementById("status-text").innerHTML = "The GENERAL has won!<br><br>The entire world is at WAR!";
    document.getElementById("turn-message").innerHTML = "Game Over!<br><br>No more turns.";
    document.getElementById("announceTitle").innerHTML = "The End";
    document.getElementById("announceText").innerHTML = "It's all over.<br><br>Chaos everywhere!<br><br>Hope you\'re proud of yourself!";
  }
  else if (diplomatCounter === 6) {
    gameWinner = "General";
    document.getElementById("status-text").innerHTML = "The DIPLOMAT has won!<br><br>The entire world is at PEACE!";
    document.getElementById("turn-message").innerHTML = "Game Over!<br><br>No more turns";
    document.getElementById("announceTitle").innerHTML = "The End";
    document.getElementById("announceText").innerHTML = "Congratulations!<br><br>The world is grateful to you!<br><br>All is well!"
  }
};

// function for the game attacks
function attackContinent() {
  randomWinner()

  if (gameWinner === "") {

    if ((playerTurn === 'General') && (turnWinner === 'General') && (this.getAttribute("data-player") == 'Diplomat')) {
      this.style.backgroundColor = "#E52C1A";
      this.setAttribute('data-player', 'General');
      playerTurn = "Diplomat";
    }
      else if ((playerTurn === 'General') && (turnWinner !== 'General') && (this.getAttribute("data-player") == 'Diplomat')) {
      playerTurn = "Diplomat";
    }
      else if ((playerTurn === 'Diplomat') && (turnWinner === 'Diplomat') && (this.getAttribute("data-player") == 'General')) {
      this.style.backgroundColor = "#001775";
      this.setAttribute('data-player', 'Diplomat');
      playerTurn = "General";
    }
      else if ((playerTurn === 'Diplomat') && (turnWinner !== 'Diplomat') && (this.getAttribute("data-player") == 'General')) {
      playerTurn = "General";
    }
  };

  document.getElementById("turn-message").innerHTML = `${playerTurn}, pick a continent controlled by your adversary.`;
  checkWinner();
};

// Resetting and playing again
