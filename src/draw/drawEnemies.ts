import { Enemy } from "../types/types";

export const drawEnemies = (
  ctx: CanvasRenderingContext2D,
  enemies: Enemy[]
) => {
  enemies.forEach(({ position: { x, y }, size }) => {
    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    ctx.rect(x - size.width / 2, y - size.height / 2, size.width, size.height);
    // ctx.arc(x, y, size.height, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  });
};
