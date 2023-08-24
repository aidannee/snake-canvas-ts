import { Direction } from "./types";
export default function drawWithRotate(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  direction: Direction,
  x: number,
  y: number,
  width: number,
  height: number
) {
  ctx.save();
  ctx.translate(x + width / 2, y + height / 2);
  switch (direction) {
    case Direction.Up:
      ctx.rotate((0 * Math.PI) / 180);
      break;
    case Direction.Down:
      ctx.rotate((180 * Math.PI) / 180);
      break;
    case Direction.Left:
      ctx.rotate((270 * Math.PI) / 180);
      break;
    case Direction.Right:
      ctx.rotate((90 * Math.PI) / 180);
      break;
  }
  ctx.drawImage(image, -width / 2, -height / 2, width, height);

  ctx.restore();
}
