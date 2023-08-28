// looping logic
// user input
// illegal move logic
// tail update logic
// food -> grow logic
// die logic
import drawWithRotate from "./drawWithRotate";
import {
  Direction,
  SnakeSegment,
  BorderPolicy,
  GridItem,
  GridItemType,
  headImage,
  bodyImage,
  tailImage,
} from "./types";

import { lastDirectionMovedBySnake, lastInputByUser } from "./input";

const cellCount = 10;
const tileSize = 50;
let score = 0;

const borderPolicy = BorderPolicy.Wrap;
const sceneElements: GridItem[] = [];
const snake: SnakeSegment[] = [
  { x: 4, y: 4, direction: Direction.Right }, // snake head
  { x: 3, y: 4, direction: Direction.Right }, // snake body
  { x: 3, y: 1, direction: Direction.Down }, // snake tail
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
ctx.imageSmoothingEnabled = false;
const tick = setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveSnake();
  detectCollision();
  drawScore();
  drawSnake();
  // drawDebugGrid();
  populateScene();

  drawSceneElements();
  // console.log(snake);
}, 200);

// ! DRAWING FUNCTIONS
function drawSnake() {
  // draw the snake

  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      drawWithRotate(
        ctx,
        headImage,
        snake[i].direction,

        snake[i].x * tileSize,
        snake[i].y * tileSize,
        tileSize,
        tileSize
      );
    } else if (i === snake.length - 1) {
      // Draw tailImage for the tail segment
      drawWithRotate(
        ctx,
        tailImage,
        snake[i - 1].direction,

        snake[i].x * tileSize,
        snake[i].y * tileSize,
        tileSize,
        tileSize
      );
    } else {
      // Draw bodyImage for the body segments
      drawWithRotate(
        ctx,
        bodyImage,
        snake[i].direction,

        snake[i].x * tileSize,
        snake[i].y * tileSize,
        tileSize,
        tileSize
      );
    }
  }
}

function drawSceneElements() {
  sceneElements.forEach((element) => {
    switch (element.type) {
      case GridItemType.Apple:
        const appleImg = new Image();
        appleImg.src = "../public/sprites/apple.png";
        const posXApple = element.pos.x * tileSize;
        const posYApple = element.pos.y * tileSize;
        appleImg.onload = () => {
          // Draw the image onto the canvas
          ctx.drawImage(appleImg, posXApple, posYApple, tileSize, tileSize);
        };
        // ctx.fillStyle = "red";
        // ctx.fillRect(
        //   element.pos.x * tileSize,
        //   element.pos.y * tileSize,
        //   tileSize,
        //   tileSize
        // );

        break;
      case GridItemType.Trap:
        const trapImg = new Image();
        trapImg.src = "../public/sprites/trap.png";
        const posXTrap = element.pos.x * tileSize;
        const posYTrap = element.pos.y * tileSize;
        trapImg.onload = () => {
          // Draw the image onto the canvas
          ctx.drawImage(trapImg, posXTrap, posYTrap, tileSize, tileSize);
        };
        // ctx.fillStyle = "blue";
        // ctx.fillRect(
        //   element.pos.x * tileSize,
        //   element.pos.y * tileSize,
        //   tileSize,
        //   tileSize
        // );
        break;
    }
  });
}
// function populateScene() {
//   if (
//     sceneElements.filter((element) => element.type === GridItemType.Apple)
//       .length < 1
//   ) {
//     sceneElements.push({
//       type: GridItemType.Apple,
//       pos: {
//         x: Math.floor(Math.random() * cellCount),
//         y: Math.floor(Math.random() * cellCount),
//       },
//     });
//   }
//   if (
//     sceneElements.filter((element) => element.type === GridItemType.Trap)
//       .length < 1
//   ) {
//     sceneElements.push({
//       type: GridItemType.Trap,
//       pos: {
//         x: Math.floor(Math.random() * cellCount),
//         y: Math.floor(Math.random() * cellCount),
//       },
//     });
//   }
//   // console.log(sceneElements);
// }
function isPositionOccupied(posX: number, posY: number): boolean {
  return (
    sceneElements.some(
      (element) => element.pos.x === posX && element.pos.y === posY
    ) || snake.some((segment) => segment.x === posX && segment.y === posY)
  );
}

function getRandomEmptyPosition(): { x: number; y: number } {
  let posX, posY;
  do {
    posX = Math.floor(Math.random() * cellCount);
    posY = Math.floor(Math.random() * cellCount);
  } while (isPositionOccupied(posX, posY));
  return { x: posX, y: posY };
}

function populateScene() {
  if (
    sceneElements.filter((element) => element.type === GridItemType.Apple)
      .length < 1
  ) {
    const applePosition = getRandomEmptyPosition();
    sceneElements.push({
      type: GridItemType.Apple,
      pos: applePosition,
    });
  }

  if (
    sceneElements.filter((element) => element.type === GridItemType.Trap)
      .length < 1
  ) {
    const trapPosition = getRandomEmptyPosition();
    sceneElements.push({
      type: GridItemType.Trap,
      pos: trapPosition,
    });
  }

  // console.log(sceneElements);
}

// ! SNAKE MOVEMENT & LOGIC
function moveSnake() {
  let newHead = { ...snake[0] }; // copy the head

  switch (lastInputByUser.val) {
    case Direction.Up:
      lastDirectionMovedBySnake.val = Direction.Up;
      newHead.y--;
      newHead.direction = lastDirectionMovedBySnake.val;

      if (newHead.y < 0) {
        newHead.y =
          borderPolicy === BorderPolicy.Wrap ? cellCount - 1 : newHead.y;
        // handle die if not wrap
      }
      break;
    case Direction.Down:
      lastDirectionMovedBySnake.val = Direction.Down;
      newHead.y++;
      newHead.direction = lastDirectionMovedBySnake.val;

      if (newHead.y === cellCount) {
        newHead.y = borderPolicy === BorderPolicy.Wrap ? 0 : newHead.y;
        // handle die if not wrap
      }
      break;
    case Direction.Left:
      lastDirectionMovedBySnake.val = Direction.Left;
      newHead.x--;
      newHead.direction = lastDirectionMovedBySnake.val;

      if (newHead.x < 0) {
        newHead.x =
          borderPolicy === BorderPolicy.Wrap ? cellCount - 1 : newHead.x;
        // handle die if not wrap
      }
      break;
    case Direction.Right:
      lastDirectionMovedBySnake.val = Direction.Right;
      newHead.x++;
      newHead.direction = lastDirectionMovedBySnake.val;

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
          score++;
          snake.push({
            x: snake[snake.length - 1].x,
            y: snake[snake.length - 1].y,
            direction: lastDirectionMovedBySnake.val,
          });
          break;
        case GridItemType.Trap:
          die();
          break;
      }
    }
  }
}

function die() {
  clearInterval(tick);
  alert("you died");
  // toggleGameOn();

  location.reload();
}

function drawScore() {
  // update score
  ctx.fillStyle = "black";
  ctx.font = "20px sans-serif";
  ctx.fillText(`Score: ${snake.length - 3}`, 0, 20);
}

// function drawDebugGrid() {
//   // for debugging
//   ctx.strokeStyle = "black";
//   for (let i = 0; i < cellCount + 1; i++) {
//     ctx.beginPath();
//     ctx.moveTo(0, tileSize * i);
//     ctx.lineTo(cellCount * tileSize, tileSize * i);
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.moveTo(tileSize * i, 0);
//     ctx.lineTo(tileSize * i, cellCount * tileSize);
//     ctx.stroke();
//   }

//   // put a label in each cell x,y in the top left corner
//   ctx.fillStyle = "black";
//   ctx.font = "6px sans-serif";
//   for (let x = 0; x < cellCount; x++) {
//     for (let y = 0; y < cellCount; y++) {
//       ctx.fillText(`${x},${y}`, x * tileSize + 0, y * tileSize + 20);
//     }
//   }
// }
