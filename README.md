# snake-canvas-ts

<img src="https://images.unsplash.com/photo-1531386151447-fd76ad50012f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"></img>

# Snake Game

This project is a rendition of the classic game Snake, implemented using Tailwind, React, and TypeScript. The game is designed to be played on desktops using either WASD or directional keys for movement.

## Game Description

The game follows the classic Snake mechanics and includes the following features:

- **Looping Logic:** The snake moves within a grid, wrapping around when reaching the borders based on the set policy.
- **User Input:** Utilizes directional keys (WASD or arrow keys) for controlling the snake's movement.
- **Illegal Move Logic:** Handles illegal moves by preventing the snake from moving through itself.
- **Tail Update Logic:** Manages the snake's body as it moves, updating its segments based on movement and growth.
- **Food & Growth Logic:** Includes food elements that the snake can consume to grow longer.
- **Death Logic:** Implements game over scenarios when the snake collides with itself or specific trap elements.

## How to Play

- Use the WASD or arrow keys to navigate the snake.
- Avoid colliding with the snake's body or traps.
- Eat the apples to grow longer and increase your score.

## Project Structure

The project contains the following key components:

- `drawWithRotate`: Function responsible for drawing different game elements with rotation.
- `types.ts`: File containing various types and constants used in the game.
- `input.ts`: Handles user input and last directional movements.

## Setup and Execution

1. **Installation:** Clone the repository and install dependencies using `npm install`.
2. **Run:** Start the game using `npm start`.
3. **Play:** Open the game in a web browser and begin playing.

## Contributing

Contributions to enhance the game or add new features are welcome! Feel free to submit issues or pull requests.

---

Feel free to explore the codebase, provide feedback, and enjoy playing the game!

:snake::snake::snake:
