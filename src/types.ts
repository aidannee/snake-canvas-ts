export interface SnakeSegment {
  x: number;
  y: number;
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
  Bolt = "bolt",
}
