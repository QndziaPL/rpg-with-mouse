import { Position, Size } from "../types/types";

export const generateRandomEnemyPosition: (windowSize: Size) => Position = (
  windowSize
) => {
  const randomHeight = Math.floor(
    Math.random() * Math.floor(windowSize.height)
  );
  return { x: 0, y: randomHeight };
};
