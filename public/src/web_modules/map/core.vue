<template>
  <canvas class="core" v-el:container></canvas>
</template>

<script>

  import PIXI from 'pixi.js';
  import { createParticules, renderParticules } from 'helpers/particules';
  import { createScene } from 'helpers/scene';
  import { createLandmarks } from 'helpers/landmarks';

  export default {

    props: ['year', 'coordinates'],

    data() {
      return {
        errors: [],
        parcticulesCreators: [],
        data: null,
        coordinatesCountries: null,
        selectedCountry: null
      }
    },

    ready() {
      this.scene = createScene(this.$els.container);
      this.container = new PIXI.Container();
      this.scene.render(this.container);
    },

    events: {

      // Get countries coordinates
      getCountriesCoordinates(value) {
        this.coordinatesCountries = value;
        this.render(value);
      },

      // Change year
      changeYear(value) {
        this.year = value;
        this.renderParticules();
      },

      // Change country selected
      getSelectedCountry(country) {
          this.selectedCountry = country;
      },

      // Get data from server
      getData(value) {
        this.data = value;
        this.render();
      }

    },

    methods: {

      /*
       * Render particules
       */
      renderParticules() {

        // Create particules container
        if(!this.parcticulesCreators.length) {
          this.particulesContainer = new PIXI.ParticleContainer();
          this.container.addChild(this.particulesContainer);
        }

        // Rerender
        else {
          this.parcticulesCreators.forEach(parcticulesCreator => (
            clearInterval(parcticulesCreator)
          ))
          this.parcticulesCreators = [];
        }

        // Initialyze parcticules creators
        Object.keys(this.data).forEach((key, index) => {
          const item = this.data[key];
          const { from, to, data } = item;
          const origin = this.coordinatesCountries[from];
          const destination = this.coordinatesCountries[to];

          if(__DEV__) {
            if(!origin) this.errors.push(from);
            if(!destination) this.errors.push(to);
          }

          this.parcticulesCreators[index] = createParticules(item, this.year, this.coordinatesCountries, particule => (
            this.particulesContainer.addChild(particule)
          ));
        });

        if(__DEV__) {
          this.errors = this.errors.filter(
            (error, i, tab) => tab.indexOf(error) === i
          );
          console.log(this.errors);
        }

      },



      /*
       * Render scene
       */
      render() {
        if(this.data && this.coordinatesCountries) {

          // Rehder particules
          this.renderParticules()

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
            renderParticules(this.particulesContainer.children, this.selectedCountry)
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

  }

</script>

<style scoped>

  .core {
    position: absolute;
    z-index: 1;
    pointer-events: none;
  }

</style>
