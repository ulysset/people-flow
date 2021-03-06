/*
 * Create PIXI.WebGLRenderer
 * scene
 * > see: https://pixijs.github.io/docs/PIXI.WebGLRenderer.html
 */
export const createScene = (selector: string): any => {
  const renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, {
    retina: 2,
    transparent: true,
    backgroundColor: '#b8c1ca', // Need for alpha color
    antialias: true,
    view: selector
  });
  return renderer;
}
