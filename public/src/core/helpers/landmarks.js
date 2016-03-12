import PIXI from 'pixi.js';

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
 * Create landmarks provided
 * by COUNTRIES on the map
 */
export const createLandmarks = (data: Data, landmarkSize: LandmarkSize, landmarkColor: LandmarkColor): any => {
  const landmarksContainer = new PIXI.Container();
  const landmarks = Object.keys(data).map(key => {
    const item = data[key];
    return createLandmark(
      item,
      landmarkSize || DEFAULT_LANDMARK_SIZE,
      landmarkColor || DEFAULT_LANDMARK_COLOR
    );
  }).forEach(
    landmark => (
      landmarksContainer.addChild(landmark)
    )
  );
  return landmarksContainer;
}



/*
 * Create singular landmark
 */
export const createLandmark = (item: { x: number, y: number }, landmarkSize: LandmarkSize, landmarkColor: LandmarkColor): any => {
 const landmark = new PIXI.Graphics();
 landmark.beginFill(landmarkColor);
 landmark.drawCircle(item.x, item.y, landmarkSize);
 landmark.endFill();
 return landmark;
};
