import { MapObjectType, Obstacle } from "../../types";
import { Position, Size } from "../../../types/types";

export const renderTree = (
  ctx: CanvasRenderingContext2D,
  position: Position,
  size: Size
) => {
  ctx.rect(position.x, position.y, size.width, size.height);
  ctx.fillStyle = "green";
  ctx.fill();
};

export const Tree: (position: Position) => Obstacle = (position) => {
  const size = { width: 40, height: 40 };
  return {
    position,
    destroyable: false,
    size,
    type: MapObjectType.OBSTACLE,
    render: (ctx) => renderTree(ctx, position, size),
  };
};
