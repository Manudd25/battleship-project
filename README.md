# battleship-project

## Project Overview
A classic Battleship game implemented using JavaScript.
Entirely console-based, no external HTML/CSS.
Player interacts through standard grid coordinates like A4, B5 to shoot.
Randomly generated enemy ships to make each game unique.

## Features
Classic Battleship Grid:

Rows labeled A-J and columns 1-10.
Player inputs coordinates (e.g., A4) to guess ship locations.

Random Ship Placement:
Ships of various sizes are placed randomly on the enemy board.

Hit/Miss Feedback:
Console displays "Hit!" or "Miss!" after each shot.
Grid updates with 'X' for hit and 'O' for missed shots.

Victory Condition:
The game continues until all enemy ships are sunk.

## Game Flow
Initialization:
Game starts with a 10x10 grid.
Ships are placed on the enemy board.
User Interaction:
Player enters coordinates (e.g., B7) to take a shot.
The game checks if it's a hit or a miss.
Endgame:
Player wins when all enemy ships are destroyed.
Grid and result are displayed after each shot.

## Technical Features
Console-Based: No DOM manipulation, runs in the terminal.
Grid Mapping: Rows labeled with letters A-J, columns 1-10.
Input Handling: Converts user input (e.g., A4) to grid coordinates.
Random Ship Placement: Ensures a fresh layout in every game.

## Code Overview
Game Initialization:
Creates two 10x10 grids for player and enemy.
Ship Placement:
Randomized for varying difficulty.
Main Logic:
Loops through turns, checking for hits/misses and tracking game progress.


## Conclusion
It was fun to create the Battleship game, I learned a lot and managed to 
organize my project in time. 