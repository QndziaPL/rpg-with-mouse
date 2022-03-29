import { Projectile } from "../types/types";

export const drawPlayerProjectiles = (
  ctx: CanvasRenderingContext2D,
  projectiles: Projectile[]
) => {
  projectiles.forEach(
    ({ damage, speed, position, size, color, createShape }) => {
      // ctx.fillStyle = color;
      // ctx.beginPath();
      // ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
      // ctx.fill();
      // ctx.stroke();sd
      createShape(ctx, position);
    }
  );
};
