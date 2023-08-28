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

export const headImage = new Image();
headImage.src = "sprites/snake-head.png";

export const bodyImage = new Image();
bodyImage.src = "sprites/snake-body.png";

export const tailImage = new Image();
tailImage.src = "sprites/snake-tail.png";

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

export const appleImage = new Image();
appleImage.src = "sprites/apple.png";
export const trapImage = new Image();
trapImage.src = "sprites/trap.png";
