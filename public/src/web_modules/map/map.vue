<template>
  <div class="container">
    <svg class="countries" v-el:svg  x="0px" y="0px" viewBox="405 215 230 230" xml:space="preserve">
      <path
        class="land"
        v-for="country in countries"
        v-bind:class="country.name"
        v-on:mouseOut="hoverCountry(null)"
        v-on:mouseOver="hoverCountry(country.name)"
        v-on:click="clickCountry(country.name)"
        v-bind:d="country.path"/>
    </svg>
  </div>
</template>

<script>

  import countries from 'assets/data/map';
  import { DEFAULT_YEAR } from 'config';
  import dynamics from 'dynamics.js';

  export default {

    props: ['filters'],

    data() {
      return {
        countries,
        selectedCountry: null,
        coordinatates: [],
        netMigration: {},
        year: DEFAULT_YEAR,
      };
    },

    ready() {
      const $svg = this.$els.svg;
      const height = window.innerHeight + 120 + window.innerHeight * .0175;
      $svg.style.height = height + 'px';

      [].slice
        .call($svg.querySelectorAll('path'))
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
      hoverCountry(value) {
        this.selectedCountry = value;
        this.$dispatch('getSelectedCountry', this.selectedCountry);
      },

      clickCountry(value) {
        this.$router.go({ path: '/country/' + 'FRA' });
      },

      renderMapColor() {
        const defaultColor = 'rgba(21, 57, 94, 0.25';
        this.countries.forEach(country => {
          const key = country.name;

          if(this.netMigration[0][key] !== undefined && this.netMigration[1][key] !== undefined) {
            let netMigration = 0;

            if(this.filters && this.filters.length !== 0) {
              if(this.filters[0].isActive) {
                const response = this.netMigration[0][key];
                netMigration += response.data.arrivals[this.year] - response.data.departures[this.year];
              }
              if(this.filters[1].isActive) {
                const response = this.netMigration[1][key];
                netMigration += response.data.arrivals[this.year] - response.data.departures[this.year];
              }
            }

            let alpha = 0.25 + netMigration * .0000001;
            if(alpha < .05 ) {
              alpha = .05;
            }
            else if(alpha > .9) {
              alpha = .9;
            }
            const color = 'rgba(21, 57, 94,' + alpha + ')';
            dynamics.animate(this.$els.svg.querySelector(`.${key}`), {
              fill: color,
            }, {
              duration: 300
            })
          }
        });
      }
    },

    events: {
      changeYear(value) {
        this.year = value;
        this.renderMapColor();
      },
      getData(value) {
        this.data = value;
        this.netMigration = this.data['netMigration'];
        this.renderMapColor();
      },
      changeFilters(value) {
        this.filters = value;
        this.renderMapColor();
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
    position: absolute;
    width: 1500px;
    height: 800px;
  }

  .land {
    fill: rgba(21, 57, 94, 0.25);
    stroke-width: .25;
    stroke: #eee;
    cursor: pointer;
  }

</style>
