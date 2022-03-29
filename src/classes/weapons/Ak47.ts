import Weapon from "../Weapon";

export default class Ak47 extends Weapon {
  fireRatePerSecond = 7;
  speed = 1;
  name = "Ak47";
  projectileSize = { width: 5, height: 10 };
  projectileColor = "#b05c07";
}
