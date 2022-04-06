import { Position } from "../../../types/types";

export const calculateDirectionMoveFactor: (
  mousePosition: Position,
  playerPosition: Position,
  speed: number
) => Position = (mousePosition, playerPosition, speed) => {
  const factorX = mousePosition.x - playerPosition.x;
  const factorY = mousePosition.y - playerPosition.y;
  const magnitude = Math.sqrt(factorX * factorX + factorY * factorY);
  const x = (factorX / magnitude) * speed;
  const y = (factorY / magnitude) * speed;
  return { x, y };
};
