<template>
  <div class="container" transition="expand">
    <h2 class="title">MAP</h2>
    <a class="link --back" v-link="'/'">Back to home</a>
    <a class="link" v-link="'/event'">Event</a>
    <a class="link" v-link="'/stat'">Stats</a>
    <a class="link" v-link="'/sources'">Sources</a>
  </div>
</template>

<script scoped>

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
