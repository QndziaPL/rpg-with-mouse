import { GameState, Position } from "../types/types";
import { drawPlayer } from "./drawPlayer";
import { drawPlayerProjectiles } from "./drawPlayerProjectiles";
import { drawInfo } from "./drawInfo";
import { drawEnemies } from "./drawEnemies";

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
  drawInfo(ctx);
  drawPlayer(ctx, gameState.player);
  drawPlayerProjectiles(ctx, gameState.playerProjectiles);
  drawEnemies(ctx, gameState.enemies);
};
