<template>
  <router-view v-bind:data="data"></router-view>
</template>

<style>

  @font-face {
    font-family: 'Brandon_thin';
    font-weight: 200;
    src: url('../assets/fonts/Brandon_thin.otf');
  }

  @font-face {
    font-family: 'Brandon';
    font-weight: 400;
    src: url('../assets/fonts/Brandon-Regular.otf');
  }

  @font-face {
    font-family: 'Brandon_medium';
    font-weight: 500;
    src: url('../assets/fonts/Brandon-Medium.otf');
  }

  @font-face {
    font-family: 'Brandon_black';
    font-weight: 700;
    src: url('../assets/fonts/Brandon_blk.otf');
  }

  @font-face {
    font-family: 'Minion';
    font-weight: 400;
    src: url('../assets/fonts/MinionPro-Regular.ttf');
  }

  body {
    margin: auto;
    font-family: "Brandon";
    font-weight: 400;
    color: #a8a8a8;
  }

</style>

<script>

  import { WEBAPI } from 'config';
  import fetch from 'helpers/fetch';

  export default {
    data() {
      return {
        data: null
      };
    },

    ready() {
      fetch(WEBAPI + '/data')
        .then(response => JSON.parse(response))
        .then(data => {
          this.data = data;
          this.$broadcast('getData', this.data)
        });
    }
  }

</script>
