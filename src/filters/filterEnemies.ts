import Enemy from "../classes/enemies/Enemy";

export const filterEnemies: (enemy: Enemy) => boolean = (enemy) =>
  filterDeadEnemies(enemy);

const filterDeadEnemies = (enemy: Enemy) => enemy.hp > 0;
