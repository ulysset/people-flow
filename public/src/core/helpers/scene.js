/*
 * Create PIXI.WebGLRenderer
 * scene
 * > see: https://pixijs.github.io/docs/PIXI.WebGLRenderer.html
 */
export const createScene = (options: {
  width: number,
  height: number,
  container: string
}) => {
  const { width, height } = options;
  const renderer = new PIXI.WebGLRenderer(width, height, {
    ...options,
    retina: 2,
    transparent: true,
    antialias: true
  });
  const el = document.querySelector(options.container);
  el.appendChild(renderer.view);
  el.style.width = width + 'px';
  el.style.height = height + 'px';
  return renderer;
}
