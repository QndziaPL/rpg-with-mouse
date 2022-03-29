import Weapon from "../Weapon";

export default class SniperRifle extends Weapon {
  fireRatePerSecond = 0.6;
  speed = 20;
  name = "Sniper rifle";
  projectileSize = { width: 15, height: 25 };
  projectileColor = "#919191";
}
