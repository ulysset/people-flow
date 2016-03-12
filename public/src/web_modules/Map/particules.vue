<template>
  <canvas class="particules"></canvas>
</template>

<script>

  import PIXI from 'pixi.js';
  import { COUNTRIES } from 'config';
  import { createParticules, renderParticules } from 'helpers/particules';
  import { createScene } from 'helpers/scene';
  import { createLandmarks } from 'helpers/landmarks';

  export default {

    props: ['year'],

    watch: {
      'year': (value) => {
        console.log('year', value);
      }
    },

    data() {
      return {
        data: [
          { from: 'FR', to: 'IT' },
          { from: 'FR', to: 'ES' },
          { from: 'ES', to: 'IT' },
          { from: 'ES', to: 'SY' },
          { from: 'ES', to: 'FR' },
        ]
      }
    },

    ready() {

      // Create scene
      this.scene = createScene('.particules');
      this.container = new PIXI.ParticleContainer();
      this.scene.render(this.container);

      // Initialyze particules
      let parcticulesCreators = [];
      this.data.forEach((item, i) => {
        parcticulesCreators[i] = createParticules(item, this.year, particule => (
          this.container.addChild(particule)
        ));
      });

      // Render view
      const render = () => {
        requestAnimationFrame(render);
        renderParticules(this.container.children)
          .filter(particule => particule.needBeDeleted)
          .forEach(particule => (
              this.container.removeChild(particule)
          ));
        this.scene.render(this.container);
      };
      render();

      // Resize
      let resizer;
      window.onresize = () => {
        clearTimeout(resizer);
        resizer = setTimeout(() => {
          this.scene.resize(window.innerWidth, window.innerHeight);
        }, 500);
      };

    }

  }

</script>

<style scoped>

  .particules {
    position: absolute;
    z-index: 1;
  }

</style>
