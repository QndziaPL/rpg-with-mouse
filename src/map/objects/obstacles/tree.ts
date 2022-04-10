import { CreateObstacleFunction, MapObjectType } from "../../types";
import { Position, Size } from "../../../types/types";
import { randomNumberBetween } from "../../../helpers/helpers";
import { AssetImageLoaded } from "../../../assets/useGameAssets";

export const renderTree = (
  ctx: CanvasRenderingContext2D,
  position: Position,
  size: Size,
  images: AssetImageLoaded[]
) => {
  ctx.save();
  ctx.beginPath();
  ctx.rect(
    position.x + size.width / 3,
    position.y,
    size.width / 3,
    size.height
  );
  ctx.fillStyle = "#7e4d2f";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(
    position.x + size.width / 2,
    position.y,
    size.width / 2,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = "#108300";
  ctx.fill();
  ctx.closePath();

  ctx.restore();
};

export const Tree: CreateObstacleFunction = (position) => {
  const sizeFactor = randomNumberBetween(20, 4) / 10;
  const size = { width: 40 * sizeFactor, height: 40 * sizeFactor };
  return {
    position,
    destroyable: true,
    size,
    type: MapObjectType.OBSTACLE,
    render: (ctx, images) => renderTree(ctx, position, size, images),
    hp: 5,
  };
};
