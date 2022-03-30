import {
  FunctionWithSavedRotationOfProjectile,
  Position,
  Size,
} from "../../../types/types";

export const createProjectileShape: FunctionWithSavedRotationOfProjectile = (
  projectilePosition: Position, // when shoot these values are just center of player
  mousePosition: Position,
  projectileSize: Size,
  projectileColor: string
) => {
  const angle =
    Math.atan2(
      projectilePosition.y - mousePosition.y,
      projectilePosition.x - mousePosition.x
    ) +
    -90 * (Math.PI / 180);

  return (ctx: CanvasRenderingContext2D, projectilePosition: Position) =>
    createShapeBasedOnSavedRotation(
      angle,
      ctx,
      projectilePosition,
      projectileSize,
      projectileColor
    );
};

const createShapeBasedOnSavedRotation = (
  rotationInRadians: number,
  ctx: CanvasRenderingContext2D,
  projectilePosition: Position,
  projectileSize: Size,
  projectileColor: string
) => {
  const topLeftX = projectilePosition.x - projectileSize.width / 2;
  const topLeftY = projectilePosition.y - projectileSize.height / 2;
  ctx.save();
  ctx.translate(projectilePosition.x, projectilePosition.y);
  ctx.rotate(rotationInRadians);
  ctx.translate(-projectilePosition.x, -projectilePosition.y);
  ctx.fillStyle = projectileColor;
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.rect(topLeftX, topLeftY, projectileSize.width, projectileSize.height);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(topLeftX, topLeftY);
  ctx.lineTo(
    topLeftX + projectileSize.width / 2,
    topLeftY - projectileSize.height / 2
  );
  ctx.lineTo(topLeftX + projectileSize.width, topLeftY);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};
