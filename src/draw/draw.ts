import { Position } from "../types/types";
import Player from "../classes/Player";
import GameState from "../classes/GameState";
import { drawPlayer } from "./drawPlayer";
import { drawPlayerProjectiles } from "./drawPlayerProjectiles";

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
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clears canvas before new frame render
  drawPlayer(ctx, player);
  drawPlayerProjectiles(ctx, gameState.playerProjectiles);
};
