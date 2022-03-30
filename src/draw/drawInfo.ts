export const drawInfo = (ctx: CanvasRenderingContext2D) => {
  ctx.save();
  ctx.font = "15px Arial";
  ctx.fillText("Use W,S,A and D or Arrow Keys to move", 10, 20);
  ctx.fillText("Press X to change weapon", 10, 40);
  ctx.fillText("Click mouse to shoot", 10, 60);
  ctx.fillText("(Yes, there are no enemies so far :P )", 10, 80);
  ctx.restore();
};
