<template>
  <div class="container">
    <svg class="countries" v-el:svg  x="0px" y="0px" viewBox="400 218 218 218" xml:space="preserve">
      <path
        class="land"
        v-bind:style="{ fill: country.color }"
        v-for="country in countries"
        v-bind:class="country.name"
        v-on:mouseOut="clickCountry(null)"
        v-on:mouseOver="clickCountry(country.name)"
        v-bind:d="country.path"/>
    </svg>
  </div>
</template>

<script>

  import countries from 'assets/data/map';

  export default {

    data() {
      return {
        countries: countries.map(country => ({
          ...country,
          color: 'rgba(21, 57, 94, 0.25)'
        })),
        selectedCountry: null,
        coordinatates: [],
        data: []
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
      },
    },

    events: {
      getData(value) {
        this.data = value;
        this.countries = this.countries.map(country => ({
          ...country,
          color: 'rgba(21, 57, 94, ' + (Math.random() * (0.05 - 0.4) + 0.4).toFixed(3) + ')'
        }));
      }
    }

  }

</script>

<style lang="sass" scoped>

  @import "../theme";

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
    stroke-width: .5;
    stroke: #eee;
  }

</style>
