// looping logic
// user input
// illegal move logic
// tail update logic
// food -> grow logic
// die logic
import lastInputDirection from "./input";
import { Direction, SnakeSegment, SnakeColors } from "./types";

const cellCount = 10;
const tileSize = 50;

const snakeExample: SnakeSegment[] = [
  { x: 4, y: 4 }, // snake head
  // { x: 1, y: 0 },
  // { x: 2, y: 0 }, // snake tail
];
// make canvas of size (cellCount * tileSize) x (cellCount * tileSize)
const canvas = document.createElement("canvas");
canvas.width = cellCount * tileSize;
canvas.height = cellCount * tileSize;
document.body.appendChild(canvas);

// give it a pink background for debugging
canvas.style.backgroundColor = "pink";
// draw grid lines
const ctx = canvas.getContext("2d")!;

const tick = setInterval(() => {
  console.log("DEBUG", lastInputDirection.val);
  moveSnake();
  detectCollision();
  drawSnake();
  drawDebugGrid();
}, 1000);

function moveSnake() {
  switch (lastInputDirection.val) {
    case Direction.Up:
      snakeExample[0].y--;
      break;
    case Direction.Down:
      snakeExample[0].y++;
      break;
    case Direction.Left:
      snakeExample[0].x--;
      break;
    case Direction.Right:
      snakeExample[0].x++;
      break;
  }
}

function detectCollision() {}
function drawSnake() {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw the snake
  ctx.fillStyle = SnakeColors.Body;
  // single cell-snake snake for now.
  ctx.fillRect(
    snakeExample[0].x * tileSize,
    snakeExample[0].y * tileSize,
    tileSize,
    tileSize
  );
}

function drawDebugGrid() {
  // for debugging
  ctx.strokeStyle = "black";
  for (let i = 0; i < cellCount + 1; i++) {
    ctx.beginPath();
    ctx.moveTo(0, tileSize * i);
    ctx.lineTo(cellCount * tileSize, tileSize * i);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(tileSize * i, 0);
    ctx.lineTo(tileSize * i, cellCount * tileSize);
    ctx.stroke();
  }

  // put a label in each cell x,y in the top left corner
  ctx.fillStyle = "black";
  ctx.font = "20px sans-serif";
  for (let x = 0; x < cellCount; x++) {
    for (let y = 0; y < cellCount; y++) {
      ctx.fillText(`${x},${y}`, x * tileSize + 0, y * tileSize + 20);
    }
  }
}

export default Direction;
