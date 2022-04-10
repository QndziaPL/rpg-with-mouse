import { Player } from "../types/types";
import gunDalff from "../assets/gunDalff.png";

export const drawPlayer = (ctx: CanvasRenderingContext2D, player: Player) => {
  const { height, width } = player.size;
  const { x, y } = player.position;
  const { weapons, activeWeaponIndex } = player;
  ctx.save();
  ctx.font = "30px Arial";
  ctx.fillText(weapons[activeWeaponIndex].name, x - width / 2, y - height / 2);
  const img = new Image();
  img.src = gunDalff;
  ctx.drawImage(img, x - width / 2, y - height / 2);
  ctx.restore();
};
