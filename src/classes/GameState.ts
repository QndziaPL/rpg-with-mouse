import { Position, Projectile, Size } from "../types/types";
import Player from "./Player";

export enum GameStatus {
  RUNNING = 1,
  PAUSED = 2,
  OVER = 3,
}

export default class GameState {
  gameStatus: GameStatus = GameStatus.RUNNING;
  lastTimePlayerShot = 0;

  playerProjectiles: Projectile[] = [];

  private notEnoughTimePassedSinceLastShot: (player: Player) => boolean = ({
    activeWeapon,
  }) => {
    const timeForOneShot = 1000 / activeWeapon.fireRatePerSecond;
    return Date.now() - this.lastTimePlayerShot < timeForOneShot;
  };

  shoot = (mouseDown: boolean, player: Player, mousePosition: Position) => {
    if (mouseDown && this.gameStatus === GameStatus.RUNNING) {
      if (this.notEnoughTimePassedSinceLastShot(player)) return;
      this.lastTimePlayerShot = Date.now();
      const projectile: Projectile = {
        damage: 1,
        speed: 20,
        position: player.position,
        size: player.activeWeapon.projectileSize,
        directionMoveFactor: calculateDirectionMoveFactor(
          mousePosition,
          player.position,
          player.activeWeapon.speed
        ),
        color: player.activeWeapon.projectileColor,
        createShape: (
          ctx: CanvasRenderingContext2D,
          projectilePosition: Position
        ) =>
          player.activeWeapon.createProjectileShape(
            ctx,
            projectilePosition,
            mousePosition
          ),
      };
      this.playerProjectiles.push(projectile);
    }
  };

  movePlayerProjectiles = (windowSize: Size) => {
    const newProjectiles: Projectile[] = [];
    this.playerProjectiles.forEach((projectile) => {
      const { position, size, directionMoveFactor } = projectile;
      if (isProjectileInGameArea(position, windowSize, size)) {
        const newProjectile: Projectile = {
          ...projectile,
          position: {
            x: position.x + directionMoveFactor.x,
            y: position.y + directionMoveFactor.y,
          },
        };
        newProjectiles.push(newProjectile);
      }
    });
    this.playerProjectiles = newProjectiles;
  };
}

export const isProjectileInGameArea: (
  position: Position,
  windowSize: Size,
  projectileSize: Size
) => boolean = (position, windowSize, projectileSize) => {
  return (
    position.x - projectileSize.height / 2 > 0 &&
    position.x + projectileSize.height / 2 < windowSize.width &&
    position.y - projectileSize.height / 2 > 0 &&
    position.y + projectileSize.height / 2 < windowSize.height
  );
};

export const calculateDirectionMoveFactor: (
  mousePosition: Position,
  playerPosition: Position,
  speed: number
) => Position = (mousePosition, playerPosition, speed) => {
  const factorX = mousePosition.x - playerPosition.x;
  const factorY = mousePosition.y - playerPosition.y;
  const magnitude = Math.sqrt(factorX * factorX + factorY * factorY);
  const x = (factorX / magnitude) * speed;
  const y = (factorY / magnitude) * speed;
  return { x, y };
};
