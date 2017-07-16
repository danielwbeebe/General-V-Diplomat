# General Versus Diplomat

<img src="images/intro-screen-shot.png">

## What is 'General Versus Diplomat'?

General Versus Diplomat' is a turn-based game between 2 players, a 'General' and a 'Diplomat'. 

The game board includes 6 continents: (top row) North America, Europe, Asia; and (bottom row)  South America, Africa, Australia. To the right of the continents are 2 boxes: "Turn" and "Status".

The game begins with the General and Diplomat alternating in choosing their continents. Each player will control 3 continents at the start.

After the continents are selected, the game play begins. The General 'attacks' a continent for his turn. The Diplomat 'negotiates' with a continent for his turn. A player can attack or negotiate with any continent, regardless of location. There is a 50% chance of success. Success means that the player now controls a new continent. Failure means that the player loses a continent. Skipping turns is not allowed. 

The "Turn" box declares whose turn it is. The "Status" box tells whether the last player's move succeeded or failed.

A player wins by controlling all 6 continents. If the General controls all of the continents, the world will be at war. If the Diplomat controls all of the continents, the world will be at peace.

I chose to make this game because I have always enjoyed world-domination-themed games, such as Risk and Civilization. The theme itself adds to the enjoyment of the game, even if the game-play is relatively simple.

The game is deployed here: http://general-vs-diplomat.bitballoon.com/

## Technical Discussion

The game utilizes the following technologies:
* HTML (general framework for the game board)
* CSS (style, animations, adaptive design for web browser width)
* JavaScript (functions for the game logic, randomizer to choose first player and decide turn winner, manipulating the DOM to change the game board, create sound effects)

### Notes on Game Structure

Here is the JavaScript code for determining who gets the first move in the game:

      var randNum = Math.floor(Math.random() * 2);

      if (randNum === 0) {
        playerTurn = "General";
      } else if (randNum === 1) {
        playerTurn = "Diplomat";
      }
    };

In terms of challenges, in the JavaScript, DOM manipulation is used to replace the introduction text with the rules of the game. Initially, the typewriter effect did not display for the rules. However, I overcame that challenge by using DOM manipulation to completely remove the introduction (including its HTML tags), creating a new 'div' tag for the rules section, with the 'announceTitle' and 'announceText' classes so that the CSS animations are called again when the rules text appears.

## The Making of 'General Versus Diplomat'

I made this game over a 5-day period and enjoyed every minute of it.

Thanks to the following for providing their comments along the way: Jonathan Ahrens, John Bell, Alex Calleia, J Silverstein, and Phil Zak.

## Opportunities for Future Growth

In the future, I plan to: (a) add a strategic element to the game play so that a player must devise a strategy to increase the chances of winning; (b) make a 1-player version of the game.
