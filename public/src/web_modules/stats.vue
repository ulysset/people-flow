<template>
  <div class="container">
    <h2 class="title">Stats</h2>
    <a class="back" v-link="'/map'">Back</a>
  </div>
  <div>
    <input v-model="search" type="text" />
    <ul>
      <li v-for="country in countries | filterBy search in 'name'">{{ country.name }}</li>
    </ul>
  </div>

</template>

<style lang="sass" scoped>

  .container {
    margin: auto;
    text-align: center;
  }

  .title {
    margin-bottom:10px;
    font-size: 22px;
    color: black;
  }

  .back {
    color: grey;

    &:hover {
      color: black;
    }
  }

</style>


<script>
  import Vue from 'vue';
  Vue.component('app-header', require('./header'));
  export default {
    data() {
      return {
        search: '',
        countries: [
          { name: 'France' },
          { name: 'Italie' },
          { name: 'Espagne' }
        ],
      };
    },

    ready() {
      const $timeline = this.$els.timeline;
      window.onscroll = function(e) {
        const scrollY = window.scrollY;
        if (scrollY > 250) $timeline.style.top = (window.innerHeight/2-220) + "px";
        else $timeline.style.top = "360px";
      };
    }
  }

</script>
