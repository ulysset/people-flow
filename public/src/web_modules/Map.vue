<template>
  <div class="container" transition="expand">
    <div class="header">
      <h2 class="title">MAP</h2>
      <a class="link --back" v-link="'/'">Back to home</a>
    </div>
    <div class="map">

    </div>
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
    data() {
      return {
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
       * When a user select a new year,
       * remove old particultes and create
       * some one.
       */
      select('.timeline li')::on('click', el => {

        // Get next year
        const nextYear = select(el)::getData('year');
        if(selectedYear === nextYear) return; // Do nothing
        selectedYear = nextYear;

        // Remove parcticulesCreators
        parcticulesCreators.forEach(parcticulesCreator => (
          clearInterval(parcticulesCreator)
        ))
        parcticulesCreators = [];

        // Add parcticulesCreators for the new year selected
        this.data.forEach((item, i) => {
          parcticulesCreators[i] = createParticules(item, selectedYear, particule => {
            particulesContainer.addChild(particule)
          });
        });

        // Update UI
        select(el)::parent()::find('.active')::removeClass('active');
        select(el)::addClass('active');

      })



      /*
       * Render everything
       */
      const render = () => {
        requestAnimationFrame(render);

        renderParticules(particulesContainer.children)
          .filter(particule => particule.needBeDeleted)
          .forEach(particule => (
              particulesContainer.removeChild(particule)
          ));

        select('.count strong')::text(particulesContainer.children.length);

        scene.render(container);
      }

      render();
    }
  }

</script>

<style lang="sass" scoped>

  .container {
    margin: auto;
    text-align: center;
  }

  .title {
    padding-bottom:30px;
    margin:auto;
    font-size: 19px;
    color: black;
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
