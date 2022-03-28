import { PlayerMovementKeys, Position, Size } from "../types/types";

export default class Player {
  position: Position = { x: 0, y: 0 };
  size: Size = { height: 100, width: 100 };
  speed: number = 10;

  movePlayer = (movementKeys: PlayerMovementKeys) => {
    if (movementKeys.up) {
      this.position.y -= this.speed;
    }
    if (movementKeys.down) {
      this.position.y += this.speed;
    }
    if (movementKeys.left) {
      this.position.x -= this.speed;
    }
    if (movementKeys.right) {
      this.position.x += this.speed;
    }
  };
}
