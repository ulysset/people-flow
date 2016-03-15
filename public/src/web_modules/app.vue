<template>
  <div>
    <router-view class="container"></router-view>
  </div>
</template>

<style>

  @font-face {
    font-family: 'Brandon';
    src: url('../assets/fonts/Brandon-Regular.otf');
  }

    @font-face {
      font-family: 'Brandon_thin';
      src: url('../assets/fonts/Brandon_thin.otf');
    }

  body {
    margin: auto;
    font-family: "Brandon";
  }

  .app {
    position: relative;
    width: 100vw; height: 100vh;
    overflow: hidden;
    background-color: #eee;
  }

</style>
