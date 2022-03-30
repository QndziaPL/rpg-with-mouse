import { Size } from "../types/types";

export default abstract class Weapon {
  abstract fireRatePerSecond: number;
  abstract speed: number;
  abstract name: string;
  abstract projectileSize: Size;
  abstract projectileColor: string;
}
