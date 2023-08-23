// looping logic
// user input
// illegal move logic
// tail update logic
// food -> grow logic
// die logic

import {
  Direction,
  SnakeSegment,
  SnakeColors,
  BorderPolicy,
  GridItem,
  GridPosition,
  GridItemType,
} from "./types";

import { lastDirectionMovedBySnake, lastInputByUser } from "./input";

const cellCount = 10;
const tileSize = 50;

const borderPolicy = BorderPolicy.Wrap;
const sceneElements: GridItem[] = [
  // {
  //   type: GridItemType.Apple,
  //   pos: { x: 0, y: 0 },
  // },
  // {
  //   type: GridItemType.Bolt,
  //   pos: { x: 1, y: 1 },
  // },
];
const snake: SnakeSegment[] = [
  { x: 4, y: 4 }, // snake head
  { x: 3, y: 4 },
  { x: 3, y: 3 }, // snake tail
  { x: 3, y: 2 }, // snake tail
  { x: 3, y: 1 }, // snake tail
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveSnake();
  detectCollision();
  drawSnake();
  // drawDebugGrid();
  populateScene();
  fruitFunction();
  drawSceneElements();
}, 200);

function fruitFunction() {
  // ctx.fillStyle = "red";
  // ctx.fillRect(0, 0, tileSize, tileSize);
}
function populateScene() {
  if (
    sceneElements.filter((element) => element.type === GridItemType.Apple)
      .length < 1
  ) {
    sceneElements.push({
      type: GridItemType.Apple,
      pos: {
        x: Math.floor(Math.random() * cellCount),
        y: Math.floor(Math.random() * cellCount),
      },
    });
  }
  if (
    sceneElements.filter((element) => element.type === GridItemType.Bolt)
      .length < 1
  ) {
    sceneElements.push({
      type: GridItemType.Bolt,
      pos: {
        x: Math.floor(Math.random() * cellCount),
        y: Math.floor(Math.random() * cellCount),
      },
    });
  }
  console.log(sceneElements);
}
function drawSceneElements() {
  sceneElements.forEach((element) => {
    switch (element.type) {
      case GridItemType.Apple:
        ctx.fillStyle = "red";
        ctx.fillRect(
          element.pos.x * tileSize,
          element.pos.y * tileSize,
          tileSize,
          tileSize
        );
        break;
      case GridItemType.Bolt:
        ctx.fillStyle = "blue";
        ctx.fillRect(
          element.pos.x * tileSize,
          element.pos.y * tileSize,
          tileSize,
          tileSize
        );
        break;
    }
  });
}
function moveSnake() {
  let newHead = { ...snake[0] }; // copy the head

  switch (lastInputByUser.val) {
    case Direction.Up:
      lastDirectionMovedBySnake.val = Direction.Up;
      newHead.y--;
      if (newHead.y < 0) {
        newHead.y =
          borderPolicy === BorderPolicy.Wrap ? cellCount - 1 : newHead.y;
        // handle die if not wrap
      }
      break;
    case Direction.Down:
      lastDirectionMovedBySnake.val = Direction.Down;
      newHead.y++;
      if (newHead.y === cellCount) {
        newHead.y = borderPolicy === BorderPolicy.Wrap ? 0 : newHead.y;
        // handle die if not wrap
      }
      break;
    case Direction.Left:
      lastDirectionMovedBySnake.val = Direction.Left;
      newHead.x--;
      if (newHead.x < 0) {
        newHead.x =
          borderPolicy === BorderPolicy.Wrap ? cellCount - 1 : newHead.x;
        // handle die if not wrap
      }
      break;
    case Direction.Right:
      lastDirectionMovedBySnake.val = Direction.Right;
      newHead.x++;
      if (newHead.x === cellCount) {
        newHead.x = borderPolicy === BorderPolicy.Wrap ? 0 : newHead.x;
        // handle die if not wrap
      }
      break;
  }

  // Insert the new head at the beginning
  snake.unshift(newHead);

  // Check if snake has eaten food
  // If not, remove the tail
  // If yes, don't pop the tail and add logic to handle food consumption
  snake.pop();
}

function detectCollision() {
  // if the head is in the same place as a body segment
  // if the head is in the same place as an apple
  // if the head is in the same place as trap
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      die();
    }
  }

  for (let i = 0; i < sceneElements.length; i++) {
    if (
      snake[0].x === sceneElements[i].pos.x &&
      snake[0].y === sceneElements[i].pos.y
    ) {
      switch (sceneElements[i].type) {
        case GridItemType.Apple:
          sceneElements.splice(i, 1);
          snake.push({
            x: snake[snake.length - 1].x,
            y: snake[snake.length - 1].y,
          });
          break;
        case GridItemType.Bolt:
          die();
          break;
      }
    }
  }
}

function die() {
  clearInterval(tick);
  alert("you died");
}

function drawSnake() {
  // clear the canvas
  // draw the snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "black";
    ctx.fillRect(
      snake[i].x * tileSize,
      snake[i].y * tileSize,
      tileSize,
      tileSize
    );
  }
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
  ctx.font = "6px sans-serif";
  for (let x = 0; x < cellCount; x++) {
    for (let y = 0; y < cellCount; y++) {
      ctx.fillText(`${x},${y}`, x * tileSize + 0, y * tileSize + 20);
    }
  }
}
