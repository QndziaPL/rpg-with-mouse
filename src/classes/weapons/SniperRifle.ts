import Weapon from "../Weapon";

export default class SniperRifle extends Weapon {
  fireRatePerSecond = 0.6;
  speed = 25;
  name = "Sniper rifle";
  projectileSize = 9;
}
