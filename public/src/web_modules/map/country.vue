<template>
  <div class="country" v-bind:style="{
    opacity: country === null ?  0 : 1
  }">
    <span class="title">{{ country === null ? '-' : country.name }}</span>
    <div class="input">
      <div class="lineGraph-container">
        <div class="lineGraph --departures" v-el:departures></div>
      </div>
      <span class="legend">départs: <strong>{{ departures == 0 ? 'x' : departures }}</strong></span>
    </div>
    <div class="input">
      <div class="lineGraph-container">
        <div class="lineGraph --arrivals" v-el:arrivals></div>
      </div>
      <span class="legend">arrivés: <strong>{{ arrivals == 0 ? 'x' : arrivals }}</strong></span>
    </div>
  </div>
</template>

<script>

  import countries from 'assets/data/countries';
  import dynamics from 'dynamics.js';

  export default {

    props: ['filters', 'year'],

    data() {
      return {
        countries,
        country: null,
        departures: 0,
        arrivals: 0,
        netMigration: null
      };
    },

    methods: {
      render() {
        if(this.netMigration && this.country) {
          if(this.filters[0].isActive || this.filters[1].isActive) {
            this.departures = this.filters.map(
              (filter, index) => {
                if(filter.isActive) {
                  return this.netMigration[index][this.country.slug].data.departures[this.year];
                }
                else {
                  return 0;
                }
              }
            ).reduce((a, b) => a + b);
            this.arrivals = this.filters.map(
              (filter, index) => {
                if(filter.isActive) {
                  return this.netMigration[index][this.country.slug].data.arrivals[this.year];
                }
                else {
                  return 0;
                }
              }
            ).reduce((a, b) => a + b);

            const departures = this.departures * 0.000016;
            const arrivals = this.arrivals * 0.000016;

            dynamics.animate(this.$els.departures, {
              width: (departures < 2 ? 2 : departures) + 'px',
            }, {
              duration: 300
            });
            dynamics.animate(this.$els.arrivals, {
              width: (arrivals < 2 ? 2 : arrivals) + 'px'
            }, {
              duration: 300
            });
          }
        }
      }
    },

    events: {
      changeYear(value) {
        this.year = value;
        this.render();
      },
      getData(value) {
        this.data = value;
        this.netMigration = this.data['netMigration'];
      },
      getSelectedCountry(country) {
        if(country) {
          const response = {
            name: countries.filter(
                _country => _country.slug === country
              )[0].name.toUpperCase(),
            slug: country
          };

          const countriesKey = [
            'ALB', 'AND', 'AUT', 'BLR', 'BEL', 'BIH',
            'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST',
            'FRO', 'FIN', 'FRA', 'GEO', 'DEU', 'GIB',
            'GRC', 'GRL', 'HUN', 'ISL', 'IRL', 'ITA',
            'LVA', 'LIE', 'LTU', 'LUX', 'MKD', 'MDA',
            'MCO', 'MNE', 'NLD', 'NOR', 'POL', 'PRT',
            'ROM', 'RUS', 'SMR', 'SRB', 'SCG', 'SVK',
            'SVN', 'ESP', 'SWE', 'CHE', 'UKR', 'GBR'
          ];

          this.country = countriesKey.includes(response.slug) ? response : null;
        }
        else {
          this.country = null;
        }
        this.render();
      },
      changeFilters(value) {
        this.filters = value;
        this.render();
      }
    }
  }

</script>

<style lang="sass" scoped>

  @import "../theme";

  .country {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 50px;
    z-index: 5;
    transition: opacity .2s ease;
  }

  .title {
    display: block;
    margin-bottom: 4px;
    color: rgba($primaryColor, .33);
    font-size: 20px;
    font-weight: 700;
    letter-spacing: .005em;
  }

  .input {
    & + & {
      margin-top: -5px;
    }
  }

  .lineGraph-container {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    width: 140px;
  }

  .lineGraph {
    background-color: green;
    width: 115px;
    height: 11px;

    &:before {
      content: '';
      display: block;
      position: relative;
      top: 5px;
      width: 130px;
      height: 1px;
      background-color: rgba(black, .25);
    }

    &.--departures {
      background-color: rgba($primaryColor, .75);
    }

    &.--arrivals {
      background-color: rgba($secondaryColor, .75);
    }
  }

  .legend {
    display: inline-block;
    vertical-align: middle;
    text-transform: uppercase;
    font-size: 11px;
    color: rgba($primaryColor, .5);

    strong {
      color: rgba($primaryColor, .75);
    }
  }

</style>
