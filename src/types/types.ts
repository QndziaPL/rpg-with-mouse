export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface PlayerMovementKeys {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

export interface Projectile {
  position: Position;
  speed: number;
  damage: number;
  directionMoveFactor: Position;
  size: number;
}
