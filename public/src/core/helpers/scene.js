/*
 * Create PIXI.WebGLRenderer
 * scene
 * > see: https://pixijs.github.io/docs/PIXI.WebGLRenderer.html
 */
export const createScene = (selector: string): any => {
  const renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, {
    retina: 2,
    transparent: true,
    antialias: true,
    view: selector
  });
  return renderer;
}
