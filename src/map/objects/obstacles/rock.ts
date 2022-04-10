import { CreateObstacleFunction, MapObjectType } from "../../types";
import { Position, Size } from "../../../types/types";

const renderRock = (
  ctx: CanvasRenderingContext2D,
  position: Position,
  size: Size
) => {
  const topLeft = {
    x: position.x - size.width / 2,
    y: position.y - size.height / 2,
  };
  const gradient = ctx.createLinearGradient(
    topLeft.x + size.height / 2,
    topLeft.y + size.height,
    topLeft.x + size.width / 2,
    topLeft.y
  );
  gradient.addColorStop(0, "#464040");
  gradient.addColorStop(0.3, "#9b9393");
  gradient.addColorStop(1, "#ababab");

  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = gradient;
  ctx.moveTo(topLeft.x + size.width / 5, topLeft.y + size.height);
  ctx.lineTo(topLeft.x + (size.width * 4) / 5, topLeft.y + size.height);
  ctx.lineTo(topLeft.x + size.width, topLeft.y + size.height / 2);
  ctx.lineTo(topLeft.x + (size.width * 3) / 5, topLeft.y);
  ctx.lineTo(topLeft.x, topLeft.y + (size.height * 1.5) / 4);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "black";

  ctx.restore();
};

export const Rock: CreateObstacleFunction = (position) => {
  const size = { width: 50, height: 40 };
  return {
    type: MapObjectType.OBSTACLE,
    position,
    destroyable: false,
    size,
    hp: 1,
    render: (ctx) => renderRock(ctx, position, size),
  };
};
