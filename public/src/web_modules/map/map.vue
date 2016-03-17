<template>
  <div class="container">
    <svg class="countries" v-el:svg  x="0px" y="0px" viewBox="400 218 218 218" xml:space="preserve">
      <path
        class="land"
        v-for="country in countries"
        v-bind:class="country.name"
        v-on:mouseOut="clickCountry(null)"
        v-on:mouseOver="clickCountry(country.name)"
        v-bind:d="country.path"/>
    </svg>
  </div>
</template>

<script>

  import data from 'assets/data/map';

  export default {

    data() {
      return {
        countries: data,
        selectedCountry: null,
        coordinatates: []
      };
    },

    ready() {
      [].slice
        .call(this.$els.svg.querySelectorAll('path'))
        .forEach(country => {
          const { top, left, width, height } = country.getBoundingClientRect();
          this.coordinatates[country.classList[1]] = {
            x: left + width / 2,
            y: top + height / 2
          };
        });
      this.$dispatch('getCountriesCoordinates', this.coordinatates);
    },

    methods: {
      clickCountry(value) {
        this.selectedCountry = value;
        this.$dispatch('getSelectedCountry', this.selectedCountry);
      }
    },

    events: {

    }

  }

</script>

<style scoped>


  .container {
    position: absolute;
    top: 0; right: 0;
    bottom: 0; left: 0;
  }

  .countries {
    width: 1500px;
    height: 800px;
  }

  .land {
    fill: white;
    fill-opacity: 1;
  }

</style>
