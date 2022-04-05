import { Projectile } from "../../../types/types";
import Enemy from "../../enemies/Enemy";

export const detectCollisions: (
  enemies: Enemy[],
  playerProjectiles: Projectile[],
  updateEnemies: (enemies: Enemy[]) => void
) => void = (enemies, playerProjectiles, updateEnemies) => {
  const newEnemies: Enemy[] = [];
  enemies.forEach((enemy) => {
    const newEnemy = { ...enemy };
    const {
      position: { x, y },
      size: { width, height },
    } = newEnemy;
    const projectileHitEnemy: Projectile | undefined = playerProjectiles.find(
      (projectile) => {
        const {
          position: { x: projX, y: projY },
          size: { width: projWidth, height: projHeight },
        } = projectile;
        const projectileHitboxFactor = projWidth / 2;
        const enemyHitboxFactor = width / 2;
        const horizontalCheck =
          (projX - projectileHitboxFactor <= x + enemyHitboxFactor &&
            projX - projectileHitboxFactor >= x - enemyHitboxFactor) ||
          (projX + projectileHitboxFactor >= x - enemyHitboxFactor &&
            projX + projectileHitboxFactor <= x + enemyHitboxFactor);
        const verticalCheck =
          (projY - projectileHitboxFactor <= y + enemyHitboxFactor &&
            projY - projectileHitboxFactor >= y - enemyHitboxFactor) ||
          (projY + projectileHitboxFactor >= y - enemyHitboxFactor &&
            projY + projectileHitboxFactor <= y + enemyHitboxFactor);

        return horizontalCheck && verticalCheck;
      }
    );
    if (projectileHitEnemy) {
      newEnemy.hp = newEnemy.hp - projectileHitEnemy.damage;
      console.log(newEnemy);
    }
    newEnemies.push(newEnemy);
  });
  updateEnemies(newEnemies);
};
