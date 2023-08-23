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
  Head = "yellow",
  Body = "orange",
  Tail = "yellow",
}

export enum BorderPolicy {
  Wrap,
  Die,
}
