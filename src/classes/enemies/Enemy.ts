import Player from "../Player/Player";
import { Position, Size } from "../../types/types";
import { generateRandomEnemyPosition } from "../../generators/generateRandomEnemyPosition";

export default abstract class Enemy {
  readonly windowSize: Size;
  position: Position;
  constructor(windowSize: Size) {
    this.windowSize = windowSize;
    this.position = generateRandomEnemyPosition(this.windowSize);
  }
  abstract name: string;
  abstract speed: number;
  abstract hp: number;
  abstract damage: number;
  abstract size: Size;

  dealDamage = (player: Player) => {
    player.loseHp(this.damage);
    this.dies();
  };

  loseHp = (damage: number) => {
    this.hp -= damage;
    console.log(this, "enemy hit");
  };

  dies = () => {
    this.hp = 0;
  };
}
