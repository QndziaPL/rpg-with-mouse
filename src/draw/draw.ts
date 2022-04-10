import { GameState, Position } from "../types/types";
import { drawPlayer } from "./drawPlayer";
import { drawPlayerProjectiles } from "./drawPlayerProjectiles";
import { drawInfo } from "./drawInfo";
import { drawEnemies } from "./drawEnemies";
import { drawMapObjects } from "./drawMapObjects";

export interface DrawProps {
  ctx: CanvasRenderingContext2D;
  mousePosition: Position;
  mouseDown: boolean;
  gameState: GameState;
}

export const draw: (props: DrawProps) => void = ({
  gameState,
  ctx,
  mousePosition,
  mouseDown,
}) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clears canvas before new frame render
  drawInfo(ctx, gameState);
  drawPlayer(ctx, gameState.player);
  drawPlayerProjectiles(ctx, gameState.playerProjectiles);
  drawEnemies(ctx, gameState.enemies);
  drawMapObjects(ctx, gameState.map.squares); // probably need to optimize it, only render active screens
};
