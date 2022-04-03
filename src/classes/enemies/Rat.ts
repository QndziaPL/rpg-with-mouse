import Enemy from "./Enemy";
import { Size } from "../../types/types";

export default class Rat extends Enemy {
  damage: number = 1;
  hp: number = 2;
  name: string = "Rat";
  speed: number = 1;
  size: Size = { height: 50, width: 50 };
}
