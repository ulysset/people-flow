<template>
  <app-header></app-header>
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
  import { WEBAPI, DEFAULT_YEAR } from 'config';
  import fetch from 'helpers/fetch';

  Vue.component('timeline', require('./timeline'));
  Vue.component('core', require('./core'));
  Vue.component('map', require('./map'));
  Vue.component('app-header', require('./../header'));

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
        data: null,
        coordinatesCountries: null
      };
    },

    ready() {
      fetch(WEBAPI + '/data')
        .then(response => JSON.parse(response))
        .then(data => {
          console.log(data);
          this.data = data['INSIDE_EUROPA'];
          this.$broadcast('getData', data)
        })
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
