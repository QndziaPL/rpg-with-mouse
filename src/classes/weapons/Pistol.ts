import Weapon from "../Weapon";

export default class Pistol extends Weapon {
  fireRatePerSecond = 2;
  speed = 5;
  name = "Pistol";
  projectileSize = { width: 4, height: 7 };
  projectileColor = "#000000";
}
