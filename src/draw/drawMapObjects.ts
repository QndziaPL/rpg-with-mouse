import { MapSquare } from "../map/types";

//TODO: this is super not efficient now
export const drawMapObjects = (
  ctx: CanvasRenderingContext2D,
  mapSquares: MapSquare[]
) => {
  mapSquares.forEach(({ objects }) => {
    objects.forEach((object) => {
      object.render(ctx);
    });
  });
};
