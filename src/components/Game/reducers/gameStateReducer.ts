import { Enemy, GameState, GameStatus, Projectile } from "../../../types/types";
import { Ak47 } from "../../../weapons/Ak47";
import { Pistol } from "../../../weapons/Pistol";
import { enoughTimePassedSinceLastShot } from "../helpers/enoughTimePassedSinceLastShot";
import { createProjectileShape } from "../../../weapons/helpers/createProjectileShape";
import { RPG } from "../../../weapons/RPG";
import { generateRandomEnemyPosition } from "../../../generators/generateRandomEnemyPosition";
import { Uzi } from "../../../weapons/Uzi";
import { isProjectileInGameArea } from "../helpers/isProjectileInGameArea";
import {
  calculateEnemyDirectionMoveFactor,
  calculateProjectileDirectionMoveFactor,
} from "../helpers/calculateProjectileDirectionMoveFactor";
import { Minigun } from "../../../weapons/Minigun";
import { SniperRifle } from "../../../weapons/SniperRifle";

export const INITIAL_GAME_STATE: GameState = {
  status: GameStatus.RUNNING,
  player: {
    activeWeaponIndex: 0,
    hp: 10,
    level: 1,
    speed: 3,
    size: { width: 20, height: 20 },
    position: { x: 0, y: 0 },
    weapons: [Ak47, Pistol, RPG, Uzi, Minigun, SniperRifle],
    exp: 0,
  },
  enemies: [],
  lastTimePlayerShot: 0,
  playerProjectiles: [],
  lastTimeEnemiesGenerated: 0,
  enemiesGeneratingInterval: 2000,
};

export enum GameStateActionType {
  MOVE_PLAYER_TO = 1,
  CHANGE_TO_NEXT_WEAPON = 2,
  MOVE_PLAYER_USING_KEYBOARD = 3,
  PLAYER_SHOOT = 4,
  MOVE_PLAYER_PROJECTILES = 5,
  GENERATE_ENEMIES = 6,
  MOVE_ENEMIES = 7,
  DETECT_COLLISIONS = 8,
}

export interface GameStateAction {
  type: GameStateActionType;
  payload?: any;
}
export const gameStateReducer: (
  state: GameState,
  action: GameStateAction
) => GameState = (state, { payload, type }) => {
  switch (type) {
    case GameStateActionType.MOVE_PLAYER_TO: {
      return { ...state, player: { ...state.player, position: payload } };
    }
    case GameStateActionType.CHANGE_TO_NEXT_WEAPON: {
      if (state.player.activeWeaponIndex === state.player.weapons.length - 1) {
        return { ...state, player: { ...state.player, activeWeaponIndex: 0 } };
      } else {
        return {
          ...state,
          player: {
            ...state.player,
            activeWeaponIndex: state.player.activeWeaponIndex + 1,
          },
        };
      }
    }
    case GameStateActionType.MOVE_PLAYER_USING_KEYBOARD: {
      const { x, y } = state.player.position;
      const {
        speed,
        size: { width, height },
      } = state.player;
      const { up, down, left, right } = payload.movementKeys;
      const newPosition = { x, y };
      //TODO: fix quicker moving diagonally
      if (up && y - height / 2 > 0) {
        newPosition.y -= speed;
      }
      if (down && y + height / 2 < payload.windowSize.height) {
        newPosition.y += speed;
      }
      if (left && x - width / 2 > 0) {
        newPosition.x -= speed;
      }
      if (right && x + width / 2 < payload.windowSize.width) {
        newPosition.x += speed;
      }

      return {
        ...state,
        player: {
          ...state.player,
          position: { x: newPosition.x, y: newPosition.y },
        },
      };
    }
    case GameStateActionType.PLAYER_SHOOT: {
      const { player } = state;
      const { weapons, activeWeaponIndex } = state.player;
      const activeWeapon = weapons[activeWeaponIndex];
      if (
        state.status === GameStatus.RUNNING &&
        enoughTimePassedSinceLastShot(
          activeWeapon.fireRatePerSecond,
          state.lastTimePlayerShot
        )
      ) {
        const projectile: Projectile = {
          damage: activeWeapon.damage,
          speed: activeWeapon.speed,
          position: player.position,
          size: activeWeapon.projectileSize,
          directionMoveFactor: calculateProjectileDirectionMoveFactor(
            payload.mousePosition,
            player.position,
            activeWeapon.speed
          ),
          color: activeWeapon.projectileColor,
          createShape: createProjectileShape(
            player.position,
            payload.mousePosition,
            activeWeapon.projectileSize,
            activeWeapon.projectileColor
          ),
          durability: activeWeapon.projectileDurability,
        };
        const newProjectiles = [...state.playerProjectiles, projectile];
        return {
          ...state,
          lastTimePlayerShot: Date.now(),
          playerProjectiles: newProjectiles,
        };
      }
      return state;
    }
    case GameStateActionType.MOVE_PLAYER_PROJECTILES: {
      const newProjectiles: Projectile[] = [];
      state.playerProjectiles.forEach((projectile) => {
        const { position, size, directionMoveFactor } = projectile;
        if (isProjectileInGameArea(position, payload.windowSize, size)) {
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
      return { ...state, playerProjectiles: newProjectiles };
    }
    case GameStateActionType.GENERATE_ENEMIES: {
      const { enemies, lastTimeEnemiesGenerated, enemiesGeneratingInterval } =
        state;
      if (Date.now() - lastTimeEnemiesGenerated >= enemiesGeneratingInterval) {
        const numberOfEnemiesToGenerate = 10;
        const newEnemies = [...enemies];
        for (let i = 0; i < numberOfEnemiesToGenerate; i++) {
          const enemy: Enemy = {
            name: "test enemy",
            size: { width: 30, height: 30 },
            hp: 1,
            speed: 2,
            damage: 1,
            position: generateRandomEnemyPosition(payload.windowSize),
            exp: 5,
          };
          newEnemies.push(enemy);
        }
        return {
          ...state,
          enemies: newEnemies,
          lastTimeEnemiesGenerated: Date.now(),
        };
      }
      return state;
    }
    case GameStateActionType.MOVE_ENEMIES: {
      const newEnemies = state.enemies.map((enemy) => {
        const { position, speed } = enemy;
        const moveFactor = calculateEnemyDirectionMoveFactor(
          state.player.position,
          position,
          speed
        );
        return {
          ...enemy,
          position: {
            x: position.x + moveFactor.x,
            y: position.y + moveFactor.y,
          },
        };
      });
      return { ...state, enemies: newEnemies };
    }
    case GameStateActionType.DETECT_COLLISIONS: {
      const { enemies, playerProjectiles } = state;
      const newEnemies: Enemy[] = [];
      const newProjectiles: Projectile[] = [...playerProjectiles];
      let earnedExp = 0;
      enemies.forEach((enemy) => {
        const newEnemy = { ...enemy };
        const {
          position: { x, y },
          size: { width, height },
        } = newEnemy;
        const projectileHitEnemyIndex: number = newProjectiles.findIndex(
          (projectile, index) => {
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
        if (projectileHitEnemyIndex !== -1) {
          newEnemy.hp =
            newEnemy.hp - newProjectiles[projectileHitEnemyIndex].damage;
          newProjectiles[projectileHitEnemyIndex].durability -= 1;
          if (newProjectiles[projectileHitEnemyIndex].durability < 1) {
            newProjectiles.splice(projectileHitEnemyIndex, 1);
          }
        }
        if (newEnemy.hp < 1) {
          earnedExp += newEnemy.exp;
        } else {
          newEnemies.push(newEnemy);
        }
      });
      return {
        ...state,
        enemies: newEnemies,
        player: { ...state.player, exp: state.player.exp + earnedExp },
        playerProjectiles: newProjectiles,
      };
    }

    default:
      return state;
  }
};
