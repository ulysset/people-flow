<template>
  <div transition="expand">
    <h2 class="title">Hello</h2>
    <a v-link="'/'">Back</a>
  </div>
</template>

<script>

  import Vue from 'vue';
  Vue.transition('expand', {
    beforeEnter: () => {
      console.log('before enter');
    },
    enter: () => {
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

<style>
  .title {
    font-size: 19px;
    color: green;
  }

  .expand-transition {
    transition: all .3s ease;
    height: 100px;
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
