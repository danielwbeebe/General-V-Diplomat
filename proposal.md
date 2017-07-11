*** Daniel W. Beebe / Tuesday, July 11, 2017 ***

# 'General Versus Diplomat' Proposal

## What is 'General Versus Diplomat'?

'General Versus Diplomat' is a game between 2 players, a 'general' and a 'diplomat'. A player wins by controlling all 6 continents. If the general controls all of the continents, the world will be at war. If the diplomat controls all of the continents, the world will be at peace.

The game board includes 6 continents: (top row) North America, Europe, Asia; and (bottom row)  South America, Africa, Australia. Below the continents are 3 boxes: "Status", "Turn", and "World"

The game begins with the general and diplomat alternating in choosing their continents. Who chooses first is random. Each player will control 3 continents at the start.

After the continents are assigned, the game play begins. The general 'attacks' a continent for his turn. The diplomat 'negotiates' with a continent for his turn. A player can attack or negotiate with any continent, regardless of location. There is a 50% chance of success. Success means that the player now controls a new continent. Failure means that the player loses a continent. Skipping turns is not allowed. 

The "Turn" box declares whose turn it is. The "Status" box tells the players what just happened, i.e. whether the last move succeeded or failed and its consequence. The "World" box tells the players the overall phase of the game, whether they are picking continents, struggling to spread war or peace, or if the game is over.

I'm choosing to make this game because I have always enjoyed world-domination-themed games, such as Risk and Civilization. The theme itself adds to the enjoyment of the game, even if the game-play is relatively simple.

## Wireframe

At the beginning of the game, each of the 2 players choose 3 continents.
<img src="images/continent-selection-photo.JPG">

During the play, a player will click on a continent controlled by the other player to attempt to control it.
<img src="images/game-play-photo.JPG">

When a player controls all 6 continents, the game is over.
<img src="images/game-over-photo.JPG">

## Initial thoughts on game structure

The game-creation will require two different phases: continent selection and game-play. The game play will require random outcomes for every move. The primary challenge I expect to be in creating a clear, visually interesting user experience.

For a bonus, I might add a single-player option, but first I would need to create a fully-functional 2-player version.

## Phases of Completion

Step -2: Creating the board:
    Creating 9 divs in HTML, 6 for the continents, and 3 for the boxes below
    Added an images of each continents

Step -1: Creating the game logic:
    Phase One: Continent Selection
        Alternating turns
            Random whether general or diplomat starts
            Each player selects 3 continents

        The boxes under the continents:
            Turn box: says whose turn it is
            Status box: says which continent was last selected
            World box: says that players are selecting continents throughout this phase
     
    Phase Two: Game-Play
        Alternating turns

        For a move: 
            Player clicks on a continent belonging to the other player
            Random determination whether the move is a win or a loss
            If win, the player gains that continent
            If loss, the player loses a random continent

        The boxes below the continents:
            Turn box: says whose turn it is
            Status box: says which continent was last attacked and the result
            World box: says that the world is in jeopardy throughout this phase

    Phase Three: Determining Winner
        If a player controls all 6 continents, game over. 
        The surviving player wins
        World box: 
            If general wins, says that the world is at war
            If diplomat wins, says the world is at peace

Step 0: Making the game look good:

    Adding a (longer) introduction to the game and rules
    Adding a (shorter) introduction for continent selection
    Adding a (shorter) introduction for game play
    Adding a reset button

Step 1: If success in all previous steps, make 1-player version

    Adding choice of 1 or 2 player version
    If 1-player version:    
        Randomize whether general or diplomat
        Adding randomization to computer's moves

## Links and Resources

Creating a random number: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

Stanform resentation "What makes a game fun?"" https://stanford.edu/~jbboin/doc/gamedesign.pdf


