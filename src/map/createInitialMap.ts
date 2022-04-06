import { GameMap, MapObject, MapSquare, Obstacle } from "./types";
import { Position, Size } from "../types/types";
import { MAP_SIZE } from "../consts/map";
import { randomNumberBetween } from "../helpers/helpers";
import { Tree } from "./objects/obstacles/tree";

/**
 * Single "MapSquare" refers to one square piece of map
 * initially we'll have something like:
 * [][][]
 * [][][]
 * [][][]
 * 3x3 map square pieces
 * ----------------------------
 * Game map will contain many MapSquares generated
 * when player will come close to previous MapSquare border
 * */

export const createInitialMap: () => GameMap = () => {
  const squares = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ].map((position) => generateSquareMap(position));

  console.log(squares);
  return { squares };
};

export const generateSquareMap: (squarePosition: Position) => MapSquare = (
  squarePosition
) => {
  return {
    size: MAP_SIZE,
    objects: generateMapObjects(MAP_SIZE),
    position: squarePosition,
  };
};

export const generateMapObjects: (squareSize: Size) => MapObject[] = (
  squareSize
) => {
  const numberOfObstacles = randomNumberBetween(3, 2);
  const obstacles: Obstacle[] = [];
  for (let i = 0; i < numberOfObstacles; i++) {
    const randomPosition: Position = {
      x: randomNumberBetween(squareSize.width),
      y: randomNumberBetween(squareSize.height),
    };
    obstacles.push(Tree(randomPosition));
  }
  return obstacles;
};
