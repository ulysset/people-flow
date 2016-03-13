import PIXI from 'pixi.js';
import { PARTICULE_SPEED } from 'config';

export type Particule = {
  anchor: { x: number, y: number },
  position: { x: number, y: number },
  destination: { x: number, y: number },
  translate: { x: number, y: number },
  needBeDeleted: boolean
}
export type Particules = Array<Particule>;



/*
 * Create particule Texture
 * width canvas
 */
export const createParticuleTexture = (size: number, color: string): any => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const particule = canvas.getContext('2d');
  particule.beginPath();
  particule.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI, false);
  particule.fillStyle = color;
  particule.fill();

  return new PIXI.Texture.fromCanvas(canvas);
}



/*
 * Create particule from Sprite PIXI.
 * (extends of PIXI. DisplayObject)
 * > see: https://pixijs.github.io/docs/PIXI.Sprite.html
 */

export const PARTICULE_SIZE = 6;
export const PARTICULE_COLOR = 'grey';
export const PARTICULE_TEXTURE = createParticuleTexture(PARTICULE_SIZE, PARTICULE_COLOR);

export const createParticule = (options: {
  destination: { x: number, y: number },
  origin: { x: number, y: number }
}): Particule => {
  const { origin, destination } = options;

  // Add texture
  const particule = new PIXI.Sprite(PARTICULE_TEXTURE);
  particule.anchor = { x: .5, y: .5 };
  particule.width = PARTICULE_SIZE / 2;
  particule.height = PARTICULE_SIZE / 2;
  particule.needBeDeleted = false;

  // Set position
  particule.position.x = origin.x;
  particule.position.y = origin.y;
  particule.destination = destination;

  // Define future movment
  const alpha = Math.atan(Math.abs(destination.y - origin.y) / Math.abs(destination.x - origin.x));
  const x = Math.cos(alpha) * PARTICULE_SPEED * (origin.x > destination.x ? -1 : 1);
  const y = Math.sqrt(Math.pow(PARTICULE_SPEED, 2) - Math.pow(x, 2)) * (origin.y > destination.y ? -1 : 1);
  particule.translate = { x, y };

  return particule;
};



/*
 * Each intervall defined, initialyze new
 * particules thanks to createParticule()
 */
export const createParticules = (item: { from:any, to: any }, selectedYear: number, coordinates: any, callback: Function): any => (
  setInterval(() => {
    const { from, to } = item;
    const particule = createParticule({
      origin: coordinates[from],
      destination: coordinates[to]
    });
    callback(particule);
  }, Math.random() * 2500)
);



/*
 * Render particule each frame
 * by setting new position
 * for each particule created
 */
export const renderParticules = (particules: Particules): Particules => {
  return particules.map(particule => {
    const { position, destination, translate } = particule;

    // Set position
    position.x += translate.x;
    position.y += translate.y;

    // Test if the particle has reached its destination
    if(Math.abs(destination.x - position.x) <= 1.25 || Math.abs(destination.y - position.y) <= 1.25) {
      particule.needBeDeleted = true,
      particule.position = position;
      return particule;
    }

    return { ...particule, position };
  });
}
