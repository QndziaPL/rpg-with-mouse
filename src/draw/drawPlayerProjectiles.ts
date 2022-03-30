import { Projectile } from "../types/types";

export const drawPlayerProjectiles = (
  ctx: CanvasRenderingContext2D,
  projectiles: Projectile[]
) => {
  projectiles.forEach(({ position, createShape }) => {
    createShape(ctx, position);
  });
};
