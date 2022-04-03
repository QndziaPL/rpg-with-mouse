import { Position } from "../types/types";
import Player from "../classes/Player/Player";
import GameState from "../classes/GameState/GameState";
import { drawPlayer } from "./drawPlayer";
import { drawPlayerProjectiles } from "./drawPlayerProjectiles";
import { drawInfo } from "./drawInfo";
import { drawEnemies } from "./drawEnemies";

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
  drawInfo(ctx);
  drawPlayer(ctx, player);
  drawPlayerProjectiles(ctx, gameState.playerProjectiles);
  drawEnemies(ctx, gameState.enemies);
};
