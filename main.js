function clickRules() {
  console.log("Posting the game rules.")
  document.getElementById("announceTitle").innerHTML = "The Rules";
  document.getElementById("announceText").innerHTML = "\'General Versus Diplomat\' is a game between 2 players. The game begins with the General and Diplomat each choosing 3 continents. After the continents are selected, the game play begins.<br><br>The General 'attacks' a continent during each turn. The Diplomat 'negotiates' with a continent for each turn. A player can attack or negotiate with any continent, regardless of location. Each turn means taking a risk. If a player is successful during a turn, that player takes control of a new continent. Failure means that the player loses a continent.<br><br>A player wins by controlling all 6 continents. If the General controls all of the continents, the world will be at war. If the Diplomat controls all of the continents, the world will be at peace.";
};

// Phase One: Continent Selection

  // Side narrative:

  // Alternating turns
  //   Random whether general or diplomat starts
  //   Each player selects 3 continents

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
