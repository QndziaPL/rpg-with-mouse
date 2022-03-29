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
        size: 10,
        directionMoveFactor: calculateDirectionMoveFactor(
          mousePosition,
          player.position,
          player.activeWeapon.speed
        ),
      };
      this.playerProjectiles.push(projectile);
    }
  };

  movePlayerProjectiles = (windowSize: Size) => {
    const newProjectiles: Projectile[] = [];
    this.playerProjectiles.forEach(
      ({ damage, speed, position, directionMoveFactor, size }) => {
        if (isProjectileInGameArea(position, windowSize, size)) {
          const newProjectile: Projectile = {
            damage,
            speed,
            position: {
              x: position.x + directionMoveFactor.x,
              y: position.y + directionMoveFactor.y,
            },
            directionMoveFactor,
            size,
          };
          newProjectiles.push(newProjectile);
        }
      }
    );
    this.playerProjectiles = newProjectiles;
  };
}

export const isProjectileInGameArea: (
  position: Position,
  windowSize: Size,
  projectileSize: number
) => boolean = (position, windowSize, projectileSize) => {
  return (
    position.x - projectileSize / 2 > 0 &&
    position.x + projectileSize / 2 < windowSize.width &&
    position.y - projectileSize / 2 > 0 &&
    position.y + projectileSize / 2 < windowSize.height
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
