// Setting variable for player turn
var playerTurn = "";

// creating empty arrays with continents for each player
gArray = [];
dArray = [];

// making the rules appear in the aside section when the "Rules" button is clicked
function clickRules() {
  console.log("Posting the game rules.")
  document.getElementById("announceTitle").innerHTML = "The Rules";
  document.getElementById("announceText").innerHTML = "\'General Versus Diplomat\' is a game between 2 players. The game begins with the General and Diplomat each choosing 3 continents. After the continents are selected, the game play begins.<br><br>The General 'attacks' a continent during each turn. The Diplomat 'negotiates' with a continent for each turn. A player can attack or negotiate with any continent, regardless of location. Each turn means taking a risk. If a player is successful during a turn, that player takes control of a new continent. Failure means that the player loses a continent.<br><br>A player wins by controlling all 6 continents. If the General controls all of the continents, the world will be at war. If the Diplomat controls all of the continents, the world will be at peace.";
};

// Phase One: Continent Selection

  // Change aside section and 3 lower boxes in the continent selecting phase of the game
function startGame() {
  console.log("Starting the continent selection phase.")

  // calling function to set random player to start
  randomPlayer();

  // adding event listeners to continents at start of game
  addListeners();

  // changing text on game board for continent selection phase
  document.getElementById("announceTitle").innerHTML = "Begin Selecting";
  document.getElementById("announceText").innerHTML = "General and Diplomat, welcome.<br><br>You will alternate selecting the continents you wish to control.<br><br>You each get 3 continents.<br><br>Choose wisely."
  document.getElementById("general-status").innerHTML = "General: You will need to pick 3 continents";
  document.getElementById("diplomat-status").innerHTML = "Diplomat: You will need to pick 3 continents";
  document.getElementById("turn-player").innerHTML = `${playerTurn}, it's your turn to pick a continent`;
  document.getElementById("turn-message").innerHTML = "Be saavy in choosing your continents"
  document.getElementById("world-message").innerHTML = "Every continent anxiously awaits the manipulation of the General and the Diplomat"
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
  var allContinents = document.querySelectorAll(".continents .box");
    console.log(allContinents);

  for (let i=0; i<allContinents.length; i++) {
    allContinents[i].addEventListener("click", selectContinent);
  };
};

  // Alternating turns to select 3 continents each
function selectContinent() {

  if (playerTurn === 'General'){
    gArray.push('North_America');

    // change color of selected continent
    document.getElementById("North_America").style.backgroundColor = "#E52C1A";
    playerTurn = "Diplomat";
    document.getElementById("North_America").removeEventListener("click", selectContinent);
  } else if (playerTurn === 'Diplomat') {
    dArray.push('North_America');

    // change color of selected continent
    document.getElementById("North_America").style.backgroundColor = "#001775";
    playerTurn = "General";
    document.getElementById("North_America").removeEventListener("click", selectContinent);
  }
  document.getElementById("turn-player").innerHTML = `${playerTurn}, it's your turn to pick a continent`;
};

  // The boxes under the continents:
  //   Turn box: says whose turn it is
  //   Status box: says which continent was last selected
  //   World box: says that players are selecting continents throughout this phase

// Phase Two: Game Play

 // Alternating turns

 //    For a move:
 //        Player clicks on a continent belonging to the other player
 //        Random determination whether the move is a win or a loss
 //        If win, the player gains that continent
 //        If loss, the player loses a random continent

 //    The boxes below the continents:
 //        Turn box: says whose turn it is
 //        Status box: says which continent was last attacked and the result
 //        World box: says that the world is in jeopardy throughout this phase

// Phase Three: Selecting A Winner

// If a player controls all 6 continents, game over.
//     The surviving player wins
//     World box:
//         If general wins, says that the world is at war
//         If diplomat wins, says the world is at peace

// Resetting and playing again
