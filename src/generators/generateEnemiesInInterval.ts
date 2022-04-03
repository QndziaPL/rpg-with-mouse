import Enemy from "../classes/enemies/Enemy";
import Rat from "../classes/enemies/Rat";
import { Size } from "../types/types";

export const generateEnemiesInInterval = (
  enemies: Enemy[],
  lastTimeGenerated: number,
  updateGenerationTime: () => void,
  constantGeneration: { active: boolean; interval: number },
  windowSize: Size
) => {
  if (
    constantGeneration.active &&
    Date.now() - lastTimeGenerated >= constantGeneration.interval
  ) {
    const numberOfEnemiesToPush = 20;
    for (let i = 0; i < numberOfEnemiesToPush; i++) {
      const enemy: Enemy = new Rat(windowSize);
      enemies.push(enemy);
    }
    updateGenerationTime();
  }
};
