import PIXI from 'pixi.js';
import { PARTICULE_SPEED, YEAR_DURATION, MIGRANTS_PER_PARTICULE } from 'config';

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

export const PARTICULE_SIZE = 4;
export const PARTICULE_COLOR = '#15395E';
export const PARTICULE_TEXTURE = createParticuleTexture(PARTICULE_SIZE, PARTICULE_COLOR);

export const createParticule = (options: {
  destination: { x: number, y: number },
  origin: { x: number, y: number },
  from: string,
  to: string
}): Particule => {
  const { origin, destination, from, to } = options;

  // Add texture
  const particule = new PIXI.Sprite(PARTICULE_TEXTURE);
  particule.anchor = { x: .5, y: .5 };
  particule.width = PARTICULE_SIZE / 2;
  particule.height = PARTICULE_SIZE / 2;
  particule.needBeDeleted = false;
  particule.alpha = 1;

  // Set position
  particule.position.x = origin.x;
  particule.position.y = origin.y;
  particule.destination = destination;
  particule.from = from;
  particule.to = to;

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
export const createParticules = (item: { from:any, to: any }, selectedYear: number, coordinates: any, callback: Function): any => {

  // Extract data
  const { from, to, data } = item;
  const origin = coordinates[from];
  const destination = coordinates[to];

  if(origin && destination) { // Be sure the country exist :)
    if(data[selectedYear] !== 'x') { // And the the data exist

      // Set flow
      const migrants = data[selectedYear];
      const migrantsGroup = Math.floor(migrants ? migrants / MIGRANTS_PER_PARTICULE : 0);
      if(migrantsGroup === 0) return;
      const interval = migrantsGroup ? YEAR_DURATION / migrantsGroup : null;

      // Render
      const render = () => {
        const particule = createParticule({ origin, destination, from, to });
        if(interval) {
          callback(particule);
        } else {
          return setTimeout(() => {
            callback(particule);
          }, Math.floor(Math.random() * YEAR_DURATION));
        }
      };

      // Run
      if(interval) {
        return setInterval(() => {
          render();
        }, interval < 200 ? 200 : interval);
      }
      else {
        render();
        return setInterval(() => {
          render();
        }, YEAR_DURATION);
      }

    }
  }

};



/*
 * Render particule each frame
 * by setting new position
 * for each particule created
 */
export const renderParticules = (particules: Particules, selectedCountry: string): Particules => {
  return particules.map(particule => {
    const {
      position,
      destination,
      translate,
      to,
      from
    } = particule;

    // Change alpha
    if(from === selectedCountry || to === selectedCountry || selectedCountry === null) {
      if(particule.alpha !== 1) {
        particule.alpha += .1;
      }
    }
    else {
      if(particule.alpha !== .1) {
        particule.alpha -= .1;
      }
    }

    // Set position
    position.x += translate.x;
    position.y += translate.y;

    // Test if the particle has reached its destination
    if(Math.abs(destination.x - position.x) <= .5 || Math.abs(destination.y - position.y) <= .5) {
      particule.needBeDeleted = true,
      particule.position = position;
      return particule;
    }

    return { ...particule, position };
  });
}
