<template>
  <div class="header" transition="expand">
    <h2 class="title">Map</h2>
    <a v-link="'/'">Back to home</a>
    <br>
    <br>
    <br>
    <a v-link="'event'">Event</a>
    <br>
    <br>
    <a v-link="'stat'">Stats</a>
    <br>
    <br>
    <a v-link="'source'">Sources</a>
  </div>
</template>

<script>

  import Vue from 'vue';

  Vue.transition('expand', {
    beforeEnter: () => {
      console.log('before enter');
    },
    enter: function () {
      console.log('enter');
    },
    afterEnter: () => {
      console.log('after enter');
    },
    beforeLeave: () => {
      console.log('before leave');
    },
    leave: () => {
      console.log('leave');
    },
    afterLeave: () => {
      console.log('after leave');
    }
  });

  export default {
    // ...
  }

</script>

<style scoped>

  *{
  text-align:center;
  }

  .title {
      font-family: "Brandon";
      font-size: 19px;
      color: green;
      margin:auto;
      padding-bottom:30px;
    }

    a{
      text-decoration: none;
    }

    a:hover{
      text-decoration: underline;
    }



  /* Animations */

  .expand-transition {
    transition: all .3s ease;
    height: 300px;
    padding: 10px;
    background-color: #eee;
    overflow: hidden;
  }

  .expand-enter, .expand-leave {
    height: 0;
    padding: 0 10px;
    opacity: 0;
  }
</style>
