<template>
  <router-view></router-view>
</template>

<style>

  @font-face {
    font-family: 'Brandon';
    font-weight: 200;
    src: url('../assets/fonts/Brandon_thin.otf');
  }

  @font-face {
    font-family: 'Brandon';
    font-weight: 400;
    src: url('../assets/fonts/Brandon-Regular.otf');
  }

  @font-face {
    font-family: 'Brandon';
    font-weight: 500;
    src: url('../assets/fonts/Brandon-Medium.otf');
  }

  @font-face {
    font-family: 'Brandon_black';
    font-weight: 700;
    src: url('../assets/fonts/Brandon_blk.otf');
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
