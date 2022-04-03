import { Projectile } from "../../../types/types";
import Enemy from "../../enemies/Enemy";

export const detectCollisions: (
  enemies: Enemy[],
  playerProjectiles: Projectile[]
) => void = (enemies, playerProjectiles) => {
  enemies.forEach((enemy) => {
    const {
      position: { x, y },
      size: { width, height },
    } = enemy;
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
      enemy.loseHp(projectileHitEnemy.damage);
    }
  });
};
