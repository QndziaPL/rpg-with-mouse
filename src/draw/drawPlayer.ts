import Player from "../classes/Player/Player";

export const drawPlayer = (ctx: CanvasRenderingContext2D, player: Player) => {
  const { height, width } = player.size;
  const { x, y } = player.position;
  ctx.save();
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.rect(x - width / 2, y - height / 2, width, height);
  ctx.font = "30px Arial";
  ctx.fillText(player.activeWeapon.name, x - width / 2, y - height / 2);
  ctx.stroke();
  ctx.restore();
};
