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
  size: Size;
  color: string;
  createShape: RenderProjectileFromSavedRotation;
}

export type FunctionWithSavedRotationOfProjectile = (
  projectilePosition: Position,
  mousePosition: Position,
  projectileSize: Size,
  projectileColor: string
) => RenderProjectileFromSavedRotation;

export type RenderProjectileFromSavedRotation = (
  ctx: CanvasRenderingContext2D,
  projectilePosition: Position
) => void;
