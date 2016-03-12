<template>
  <div class="wrapper" transition="expand">
    <particules v-bind:year="selectedYear"></particules>
    <timeline v-bind:year="selectedYear"></timeline>
  </div>
</template>

<script scoped>

  import Vue from 'vue';
  import { DEFAULT_YEAR } from 'config';

  Vue.component('timeline', require('./timeline'));
  Vue.component('particules', require('./particules'));

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
      return { selectedYear: DEFAULT_YEAR }
    },
    events: {
      changeYear(year) {
        this.selectedYear = year;
      }
    }
  }

</script>

<style lang="sass" scoped>

  .wrapper {
    position: relative;
    min-width: 100%;
    min-height: 100%;
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
