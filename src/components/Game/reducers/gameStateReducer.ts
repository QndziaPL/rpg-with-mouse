import { Enemy, GameState, GameStatus, Projectile } from "../../../types/types";
import { Ak47 } from "../../../classes/weapons/Ak47";
import { Pistol } from "../../../classes/weapons/Pistol";
import { notEnoughTimePassedSinceLastShot } from "../../../classes/GameState/helpers/notEnoughTimePassedSinceLastShot";
import { createProjectileShape } from "../../../classes/weapons/helpers/createProjectileShape";
import {
  calculateDirectionMoveFactor,
  isProjectileInGameArea,
} from "../../../classes/GameState/GameState";
import { RPG } from "../../../classes/weapons/RPG";
import { generateRandomEnemyPosition } from "../../../generators/generateRandomEnemyPosition";

export const INITIAL_GAME_STATE: GameState = {
  status: GameStatus.RUNNING,
  player: {
    activeWeaponIndex: 0,
    hp: 10,
    level: 1,
    speed: 1.5,
    size: { width: 20, height: 20 },
    position: { x: 0, y: 0 },
    weapons: [Ak47, Pistol, RPG],
  },
  enemies: [],
  lastTimePlayerShot: 0,
  playerProjectiles: [],
  lastTimeEnemiesGenerated: 0,
  enemiesGeneratingInterval: 5000,
};

export enum GameStateActionType {
  MOVE_PLAYER_TO = 1,
  CHANGE_TO_NEXT_WEAPON = 2,
  MOVE_PLAYER_USING_KEYBOARD = 3,
  PLAYER_SHOOT = 4,
  MOVE_PLAYER_PROJECTILES = 5,
  GENERATE_ENEMIES = 6,
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
        !notEnoughTimePassedSinceLastShot(
          activeWeapon.fireRatePerSecond,
          state.lastTimePlayerShot
        )
      ) {
        const projectile: Projectile = {
          damage: 1,
          speed: 20,
          position: player.position,
          size: activeWeapon.projectileSize,
          directionMoveFactor: calculateDirectionMoveFactor(
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
        const numberOfEnemiesToGenerate = 20;
        const newEnemies = [...enemies];
        for (let i = 0; i < numberOfEnemiesToGenerate; i++) {
          const enemy: Enemy = {
            name: "test enemy",
            size: { width: 10, height: 10 },
            hp: 1,
            speed: 3,
            damage: 1,
            position: generateRandomEnemyPosition(payload.windowSize),
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

    default:
      return state;
  }
};
