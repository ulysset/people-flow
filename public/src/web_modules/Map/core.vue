<template>
  <canvas class="core" v-el:container></canvas>
</template>

<script>

  import PIXI from 'pixi.js';
  import { createParticules, renderParticules } from 'helpers/particules';
  import { createScene } from 'helpers/scene';
  import { createLandmarks } from 'helpers/landmarks';
  import 'whatwg-fetch';

  export default {

    // Defined props
    props: ['year', 'coordinates'],

    // Get data
    data() {
      return {
        isFetching: true,
        data: []
      }
    },

    // Create scene
    ready() {
      this.scene = createScene(this.$els.container);
      this.container = new PIXI.Container();
      this.scene.render(this.container);

      fetch('http://localhost:8000/data')
        .then(response => response.json())
        .then(data => {
          this.isFetching = false;
          this.data = data;
          this.render();
        })
    },

    events: {

      // Get countries coordinates
      getCountriesCoordinates(value) {
        this.coordinatesCountries = value;
        this.render(value);
      },

      // Change year
      changeYear(value) {

        // Remove parcticulesCreators
        this.parcticulesCreators.forEach(parcticulesCreator => (
          clearInterval(parcticulesCreator)
        ))
        this.parcticulesCreators = [];

        // Add parcticulesCreators for the new year selected
        this.data.forEach((item, i) => {
          this.parcticulesCreators[i] = createParticules(item, this.year, this.coordinatesCountries, particule => (
            this.particulesContainer.addChild(particule)
          ));
        });
      }

    },

    // Methods
    methods: {

      // Render scene
      render() {


        // Initialyze particules
        this.parcticulesCreators = [];
        this.particulesContainer = new PIXI.ParticleContainer();
        this.data.forEach((item, i) => {
          this.parcticulesCreators[i] = createParticules(item, this.year, this.coordinatesCountries, particule => (
            this.particulesContainer.addChild(particule)
          ));
        });
        this.container.addChild(this.particulesContainer);

        // Landmarks
        this.container.addChild(
          createLandmarks(this.coordinatesCountries)
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
