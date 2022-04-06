import { Position, Size } from "../types/types";

export enum MapObjectType {
  OBSTACLE = 1,
  TREASURE = 2,
}

export interface GameMap {
  squares: MapSquare[];
}

export interface MapObject {
  position: Position;
  size: Size;
  type: MapObjectType;
  render: (ctx: CanvasRenderingContext2D) => void;
}

export interface Obstacle extends MapObject {
  destroyable: boolean;
  type: MapObjectType.OBSTACLE;
}

export interface MapSquare {
  size: Size;
  objects: MapObject[];
  position: Position;
  /** initial positions of 9 MapSquares
   [-1,-1][0,-1][1,-1]
   [-1,0 ][0,0 ][1,0 ]
   [-1,1 ][0,1 ][1,1 ]
   */
}
