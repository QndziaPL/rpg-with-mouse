import { MapObject, MapSquare } from "../map/types";

//TODO: this is super not efficient now
export const drawMapObjects = (
  ctx: CanvasRenderingContext2D,
  mapSquares: MapSquare[]
) => {
  const mapObjects: MapObject[] = [];
  mapSquares.forEach(({ objects }) => {
    objects.forEach((object) => {
      mapObjects.push(object);
    });
  });
  mapObjects.forEach(({ render }) => {
    render(ctx);
  });
};
