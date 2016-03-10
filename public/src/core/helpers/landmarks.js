import PIXI from 'pixi';

export const DEFAULT_LANDMARK_COLOR = 0x9966FF;
export const DEFAULT_LANDMARK_SIZE = 2;

type Data = {
  [key: string]: {
    x: number, y: number
  }
};
type LandmarkSize = number;
type LandmarkColor = any;


/*
 * Create landmark provided
 * by COUNTRIES on the map
 */
export const createLandmarks = (data: Data, landmarkSize: LandmarkSize, landmarkColor: LandmarkColor): any => {
  return Object.keys(data).map(key => {
    const item = data[key];
    const landmark = new PIXI.Graphics();
    landmark.beginFill(landmarkColor || DEFAULT_LANDMARK_COLOR);
    landmark.drawCircle(item.x, item.y, landmarkSize || DEFAULT_LANDMARK_SIZE);
    landmark.endFill();
    return landmark;
  });
}
