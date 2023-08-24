export interface SnakeSegment {
  x: number;
  y: number;
  direction: Direction;
}

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export enum SnakeColors {
  Head = "red",
  Body = "green",
  Tail = "blue",
}
export const headImage = new Image();
headImage.src = "../public/sprites/snake-head.png";

export const bodyImage = new Image();
bodyImage.src = "../public/sprites/snake-body.png";

export const tailImage = new Image();
tailImage.src = "../public/sprites/snake-tail.png";

export enum BorderPolicy {
  Wrap,
  Die,
}

export interface GridItem {
  type: GridItemType;
  pos: GridPosition;
}
export interface GridPosition {
  x: number;
  y: number;
}

export enum GridItemType {
  Apple = "apple",
  Trap = "trap",
}
