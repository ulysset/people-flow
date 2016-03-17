import PIXI from 'pixi.js';

export const DEFAULT_LANDMARK_COLOR = 0x15395E;
export const DEFAULT_LANDMARK_SIZE = 2;

type Data = Array<{ x: number, y: number }>
type LandmarkSize = number;
type LandmarkColor = any;


/*
 * Create landmarks
 */
export const createLandmarks = (data: Data, landmarkSize: LandmarkSize, landmarkColor: LandmarkColor): any => {
  const landmarksContainer = new PIXI.Container();
  const landmarks = [];

  for(const item in data) {
    const landmark = createLandmark(
      data[item],
      landmarkSize || DEFAULT_LANDMARK_SIZE,
      landmarkColor || DEFAULT_LANDMARK_COLOR
    );
    landmarksContainer.addChild(landmark);
  }

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
