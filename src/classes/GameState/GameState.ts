import { GameStatus, Position, Projectile, Size } from "../../types/types";
import Player from "../Player/Player";
import { createProjectileShape } from "../weapons/helpers/createProjectileShape";
import Enemy from "../enemies/Enemy";
import { generateEnemiesInInterval } from "../../generators/generateEnemiesInInterval";
import { filterEnemies } from "../../filters/filterEnemies";
import { detectCollisions } from "./helpers/detectCollisions";

export default class GameState {
  gameStatus: GameStatus = GameStatus.RUNNING;
  lastTimePlayerShot = 0;
  level = 1;

  playerProjectiles: Projectile[] = [];
  enemies: Enemy[] = [];
  lastTimeEnemiesGenerated = 0;

  private notEnoughTimePassedSinceLastShot: (player: Player) => boolean = ({
    activeWeapon,
  }) => {
    const timeForOneShot = 1000 / activeWeapon.fireRatePerSecond;
    return Date.now() - this.lastTimePlayerShot < timeForOneShot;
  };

  updateGenerationTime = () => {
    this.lastTimeEnemiesGenerated = Date.now();
  };

  generateEnemies = (windowSize: Size) => {
    generateEnemiesInInterval(
      this.enemies,
      this.lastTimeEnemiesGenerated,
      this.updateGenerationTime,
      { active: true, interval: 5000 },
      windowSize
    );
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
        createShape: createProjectileShape(
          player.position,
          mousePosition,
          player.activeWeapon.projectileSize,
          player.activeWeapon.projectileColor
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

  detectCollisions = () =>
    detectCollisions(this.enemies, this.playerProjectiles, this.updateEnemies);

  updateEnemies = (enemies: Enemy[]) => {
    this.enemies = enemies;
  };

  moveEnemies = () => {
    this.enemies = this.enemies.map((enemy) => {
      const { position, speed } = enemy;
      return { ...enemy, position: { x: position.x + speed, y: position.y } };
    });
  };

  removeDeadEnemies = () => {
    this.enemies = this.enemies.filter(filterEnemies);
    console.log(this.enemies, "po filtrze");
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
