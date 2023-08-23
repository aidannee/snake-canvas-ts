import { Direction } from "./types";
let lastInputDirection = { val: Direction.Right };

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
    case "W":
    case "ArrowUp":
      console.log("ArrowUp (or W)");
      if (lastInputDirection.val === Direction.Down) {
        break;
      }
      lastInputDirection.val = Direction.Up;
      break;
    case "s":
    case "S":
    case "ArrowDown":
      console.log("ArrowDown (or S)");
      if (lastInputDirection.val === Direction.Up) {
        break;
      }
      lastInputDirection.val = Direction.Down;
      break;
    case "a":
    case "A":
    case "ArrowLeft":
      console.log("ArrowLeft (or A)");
      if (lastInputDirection.val === Direction.Right) {
        break;
      }
      lastInputDirection.val = Direction.Left;

      break;
    case "d":
    case "D":
    case "ArrowRight":
      console.log("ArrowRight (or D)");
      if (lastInputDirection.val === Direction.Left) {
        break;
      }
      lastInputDirection.val = Direction.Right;
      break;
  }
});

export default lastInputDirection;
