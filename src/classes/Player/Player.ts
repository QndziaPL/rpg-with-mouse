import { PlayerMovementKeys, Position, Size } from "../../types/types";
import Weapon from "../weapons/Weapon";
import Pistol from "../weapons/Pistol";
import Ak47 from "../weapons/Ak47";
import SniperRifle from "../weapons/SniperRifle";

export default class Player {
  position: Position = { x: 0, y: 0 };
  size: Size = { height: 100, width: 100 };
  speed: number = 10;
  weapons: Weapon[] = [new Ak47(), new Pistol(), new SniperRifle()];
  activeWeaponIndex = 1;
  activeWeapon: Weapon = this.weapons[this.activeWeaponIndex];

  movePlayerTo = (position: Position) => {
    this.position = position;
  };

  movePlayer = (movementKeys: PlayerMovementKeys, windowSize: Size) => {
    if (movementKeys.up && this.position.y - this.size.height / 2 > 0) {
      this.position.y -= this.speed;
    }
    if (
      movementKeys.down &&
      this.position.y + this.size.height / 2 < windowSize.height
    ) {
      this.position.y += this.speed;
    }
    if (movementKeys.left && this.position.x - this.size.width / 2 > 0) {
      this.position.x -= this.speed;
    }
    if (
      movementKeys.right &&
      this.position.x + this.size.width / 2 < windowSize.width
    ) {
      this.position.x += this.speed;
    }
  };

  pickNextWeapon = () => {
    if (this.activeWeaponIndex === this.weapons.length - 1) {
      this.activeWeaponIndex = 0;
      this.activeWeapon = this.weapons[0];
    } else {
      this.activeWeapon = this.weapons[this.activeWeaponIndex + 1];
      this.activeWeaponIndex += 1;
    }
  };
}
