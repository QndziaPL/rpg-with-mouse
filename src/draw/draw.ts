import { Position } from "../types/types";
import Player from "../classes/Player";
import GameState from "../classes/GameState";
import { drawPlayer } from "./drawPlayer";

export interface DrawProps {
  ctx: CanvasRenderingContext2D;
  mousePosition: Position;
  player: Player;
  mouseDown: boolean;
  gameState: GameState;
}

export const draw: (props: DrawProps) => void = ({
  gameState,
  ctx,
  player,
  mousePosition,
  mouseDown,
}) => {
  if (mouseDown) {
    gameState.setCircleSize(gameState.circleSize + 1);
  } else {
    gameState.setCircleSize(0);
  }
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clears canvas before new frame render
  ctx.fillStyle = "#002d9a";
  ctx.beginPath();
  ctx.arc(
    mousePosition.x,
    mousePosition.y,
    gameState.circleSize / 5,
    0,
    2 * Math.PI
  );
  ctx.fill();
  drawPlayer(ctx, player);
};
