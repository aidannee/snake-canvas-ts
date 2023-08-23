import { Direction } from "./types";
// let lastInputDirection = { val: Direction.Right };

export const lastDirectionMovedBySnake = { val: Direction.Right };
export const lastInputByUser = { val: Direction.Right };

// store the current movement direction of the snake head

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
    case "W":
    case "ArrowUp":
      console.log("ArrowUp (or W)");
      if (lastDirectionMovedBySnake.val === Direction.Down) {
        break;
      }
      lastInputByUser.val = Direction.Up;
      break;
    case "s":
    case "S":
    case "ArrowDown":
      console.log("ArrowDown (or S)");
      if (lastDirectionMovedBySnake.val === Direction.Up) {
        break;
      }
      lastInputByUser.val = Direction.Down;
      break;
    case "a":
    case "A":
    case "ArrowLeft":
      console.log("ArrowLeft (or A)");
      if (lastDirectionMovedBySnake.val === Direction.Right) {
        break;
      }
      lastInputByUser.val = Direction.Left;

      break;
    case "d":
    case "D":
    case "ArrowRight":
      console.log("ArrowRight (or D)");
      if (lastDirectionMovedBySnake.val === Direction.Left) {
        break;
      }
      lastInputByUser.val = Direction.Right;
      break;
  }
});
