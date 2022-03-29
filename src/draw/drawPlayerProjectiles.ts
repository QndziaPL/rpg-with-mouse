import { Projectile } from "../types/types";

export const drawPlayerProjectiles = (
  ctx: CanvasRenderingContext2D,
  projectiles: Projectile[]
) => {
  projectiles.forEach(({ damage, speed, position }) => {
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(position.x, position.y, 10, 0, 2 * Math.PI);
    ctx.stroke();
  });
};
