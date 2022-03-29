import { Position, Size } from "../types/types";

export default abstract class Weapon {
  abstract fireRatePerSecond: number;
  abstract speed: number;
  abstract name: string;
  abstract projectileSize: Size;
  abstract projectileColor: string;
  createProjectileShape = (
    ctx: CanvasRenderingContext2D,
    projectilePosition: Position,
    mousePosition: Position
  ) => {
    const topLeftX = projectilePosition.x - this.projectileSize.width / 2;
    const topLeftY = projectilePosition.y - this.projectileSize.height / 2;
    ctx.save();
    ctx.fillStyle = this.projectileColor;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.rect(
      topLeftX,
      topLeftY,
      this.projectileSize.width,
      this.projectileSize.height
    );
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(topLeftX, topLeftY);
    ctx.lineTo(
      topLeftX + this.projectileSize.width / 2,
      topLeftY - this.projectileSize.height / 2
    );
    ctx.lineTo(topLeftX + this.projectileSize.width, topLeftY);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };
}
