<template>
  <div class="container" transition="expand">
    <div class="header">
      <a class="link --back" v-link="'/'">Back to home</a>
    </div>
    <div class="map"></div>
    <div class="count">nombre de particules actives : <strong>{{ particulesLength }}</strong></div>
  </div>
</template>

<script scoped>

  import Vue from 'vue';
  import PIXI from 'pixi';
  import { MAX_PARTICULES, MIGRANTS_PER_PARTICULE, COUNTRIES, DEFAULT_YEAR, SPEED } from 'config';
  import { select, on, getData, addClass, removeClass, parent, find, text } from 'helpers/dom';
  import { createParticules, renderParticules } from 'helpers/particules';
  import { createScene } from 'helpers/scene';
  import { createLandmarks } from 'helpers/landmarks';

  Vue.transition('expand', {
    enter: (el, done) => {
      done();
    },
    leave: (el, done) => {
      done();
    }
  });

  export default {

    /*
     * Fetch data (fake for
     * the moment)
     */
    data() {
      return {
        particulesLength: 0,
        data: [{
          from: 'FR',
          to: 'SY',
          migrants: {
            2014: 1000
          }
        }, {
          from: 'FR',
          to: 'IT',
          migrants: {
            2014: 1000
          }
        }, {
          from: 'FR',
          to: 'ES',
          migrants: {
            2014: 1000
          }
        }]
      }
    },

    ready() {

      /*
       * Initialyze the WebGL scene
       */
      const scene = createScene({ width: 600, height: 500,  container: '.map' });
      const container = new PIXI.Container();
      let selectedYear = DEFAULT_YEAR;
      scene.render(container);



      /*
       * Initialyze particules and
       * push them to the particulesContainer
       */
      const particulesContainer = new PIXI.ParticleContainer();
      let particules = [], parcticulesCreators = [];
      container.addChild(particulesContainer);
      this.data.forEach((item, i) => {
        parcticulesCreators[i] = createParticules(item, selectedYear, particule => (
          particulesContainer.addChild(particule)
        ));
      });



      /*
       * Add landmarks to the map
       * from COUNTRIESc const
       */
      const landmarksContainer = new PIXI.Container();
      container.addChild(landmarksContainer);
      const landmarks = createLandmarks(COUNTRIES);
      landmarks.forEach(landmark => (
        landmarksContainer.addChild(landmark)
      ));




      /*
       * Render everything
       */
      const render = () => {
        requestAnimationFrame(render);

        // Render particules
        renderParticules(particulesContainer.children)
          .filter(particule => particule.needBeDeleted)
          .forEach(particule => (
              particulesContainer.removeChild(particule)
          ));

        // Count particules length
        const particulesLength = particulesContainer.children.length;
        if(Math.abs(this.particulesLength - particulesLength) > 2) {
          this.particulesLength = particulesLength;
        }

        scene.render(container);
      };

      render();
    }
  }

</script>

<style lang="sass" scoped>

  .container {
    margin: auto;
    text-align: center;
  }

  .link {
    display: block;
    color: grey;
    text-decoration: none;

    & + & {
      margin-top: 12px;
    }

    &.--back {
      margin-bottom: 50px;
    }

    &:hover {
      text-decoration: underline;
      color: black;
    }
  }

</style>
