<template>
  <div class="wrapper" transition="expand">
    <core
      v-bind:coordinates="coordinatesCountries"
      v-bind:year="selectedYear"></core>
    <map></map>
    <timeline v-bind:year="selectedYear"></timeline>
  </div>
</template>

<script scoped>

  import Vue from 'vue';
  import { DEFAULT_YEAR } from 'config';

  Vue.component('timeline', require('./timeline'));
  Vue.component('core', require('./core'));
  Vue.component('map', require('./map'));

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
        selectedYear: DEFAULT_YEAR,
        coordinatesCountries: 'h'
      };
    },
    events: {
      changeYear(year) {
        this.selectedYear = year;
        this.$broadcast('changeYear', year)
      },

      getCountriesCoordinates(coordinatesCountries) {
        this.coordinatesCountries = coordinatesCountries;
        this.$broadcast('getCountriesCoordinates', this.coordinatesCountries);
      },

      getSelectedCountry(country) {
        this.$broadcast('getSelectedCountry', country);
      }
    }
  }


</script>

<style lang="sass" scoped>

  .wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #eee;
  }

  .informations {
    position: absolute;
    left: 0; top: 10px;
    width: 100%;
    font-size: 13px;
    color: rgba(#000, .25);
    text-align: center;

    strong {
      color: rgba(#000, .5)
    }
  }

</style>
