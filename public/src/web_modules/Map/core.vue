<template>
  <canvas class="core" v-el:container></canvas>
</template>

<script>

  import PIXI from 'pixi.js';
  import { COUNTRIES } from 'config';
  import { createParticules, renderParticules } from 'helpers/particules';
  import { createScene } from 'helpers/scene';
  import { createLandmarks } from 'helpers/landmarks';

  export default {

    // Defined props
    props: ['year', 'coordinates'],

    // Get data
    data() {
      return {
        data: [
          { from: 'IT', to: 'FR' },
          { from: 'FR', to: 'ES' },
          { from: 'ES', to: 'IT' }
        ]
      }
    },

    // Create scene
    ready() {
      this.scene = createScene(this.$els.container);
      this.container = new PIXI.Container();
      this.scene.render(this.container);
    },

    // Watch events
    events: {
      getCountriesCoordinates(value) {
        this.render(value);
      }
    },

    // Methods
    methods: {

      // Render scene
      render(coordinates) {

        // Initialyze particules
        let parcticulesCreators = [];
        this.particulesContainer = new PIXI.ParticleContainer();
        this.data.forEach((item, i) => {
          parcticulesCreators[i] = createParticules(item, this.year, coordinates, particule => (
            this.particulesContainer.addChild(particule)
          ));
        });
        this.container.addChild(this.particulesContainer);

        // Landmarks
        this.container.addChild(
          createLandmarks(coordinates)
        );

        // Add countries
        this.countriesContainer = new PIXI.Container();
        this.container.addChild(this.countriesContainer);

        // Render view
        const render = () => {
          requestAnimationFrame(render);
          renderParticules(this.particulesContainer.children)
            .filter(particule => particule.needBeDeleted)
            .forEach(particule => (
                this.particulesContainer.removeChild(particule)
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

  }

</script>

<style scoped>

  .core {
    position: absolute;
    z-index: 1;
    pointer-events: none;
  }

</style>
