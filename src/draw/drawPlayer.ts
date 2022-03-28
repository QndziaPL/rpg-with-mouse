import Player from "../classes/Player";

export const drawPlayer = (ctx: CanvasRenderingContext2D, player: Player) => {
  const { height, width } = player.size;
  const { x, y } = player.position;
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.rect(x - width / 2, y - height / 2, width, height);
  ctx.stroke();
};
