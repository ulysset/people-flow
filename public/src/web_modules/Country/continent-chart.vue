<template>
  <div class="navStats">
    <h2>CLASSEMENTS / STATISTIQUES</h2>
  </div>
  <div class="statScroll">
    <div v-for="(indexYear, year) in years">
      <div class="yearStats" v-bind:class="{'yearStatsActive': activeIndex == indexYear}" v-on:click="selectIndex(indexYear)">
          <div class="statsContinents">
            <h3>{{years[indexYear]}}</h3>
            <div v-for="(indexContinent, continent) in continents">
              <div class="continent" v-bind:class="{'enabled': activeContinent == continent.name}">
                <p>{{ continent.name.toUpperCase() }} : {{ continent.migrants[years[indexYear]]}}</p>
              </div>
            </div>
          </div>
        <div class="barGroup">
          <div v-for="continent in continents" v-on:mouseOver="onHover(this, continent.name)">
              <div v-for="continentItem in continent.count[indexYear]" class="item" v-bind:class="continent.name"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        data: null,
        selectedCountry: 'FRA',
        activeIndex: 0, // year
        activeContinent: '',
        years: [1960, 1970, 1980, 1990, 2000],
        continents: [{
          name: 'africa',
          migrants: {
            1960: 0,
            1970: 0,
            1980: 0,
            1990: 0,
            2000: 0
          },
          count: []
        }, {
          name: 'america',
          migrants: {
            1960: 0,
            1970: 0,
            1980: 0,
            1990: 0,
            2000: 0
          },
          count: []
        }, {
          name: 'oceania',
          migrants: {
            1960: 0,
            1970: 0,
            1980: 0,
            1990: 0,
            2000: 0
          },
          count: []
        }, {
          name: 'europa',
          migrants: {
            1960: 0,
            1970: 0,
            1980: 0,
            1990: 0,
            2000: 0
          },
          count: []
        }, {
          name: 'asia',
          migrants: {
            1960: 0,
            1970: 0,
            1980: 0,
            1990: 0,
            2000: 0
          },
          count: []
        }]
      };
   },

   ready() {
      setTimeout(() => {
        this.$dispatch('selectIndex', this.activeIndex + 1);
      }, 4000);
    },

    methods: {
      onHover: (ctx, name) => {
        ctx.activeContinent = name.toLowerCase();
      },
      selectIndex(index) {
        this.$dispatch('selectIndex', index);
      }
    },

    events: {
      selectIndex(index) {
        this.activeIndex = index
      },
      getData(value) {

        // Get data
        this.data = value;
        const data = this.data['reduceDataMigration'][this.selectedCountry].data;
        const response = this.continents.map(continent => {
          const continentKey = continent.name;
          const migrants = {};
          Object.keys(data[continentKey]).forEach(year => {
            migrants[year] = data[continentKey][year].departures
          })
          return {
            ...continent,
            migrants
          };
        });

        // Get total
        const total = this.years.map(year => (
          response
            .map(continent => continent.migrants[year])
            .reduce((a, b) => a + b)
          ));

        // Return this.continents
        this.continents = response.map(continent => ({
          ...continent,
          count: this.years.map((year, index) => (
            Math.ceil((continent.migrants[year] / total[index]) * 30)
          ))
        }));

      }
    }
  }

</script>
<style scoped>

  .navStats{
    width: 100%;
    height: 40px;
    position: relative;
    background: #FEFEFE;
  }
  .navStats h2{
    color: #215078;
    text-align: center;
    font-size: 14px;
  }

  .navStats h3{
    display: inline-block;
    width: 49%;
    font-size: 13px;
    color: #898989;
    text-align: center;
  }
  .statScroll{
    width: 100%;
    height: calc(100vh - 54px - 115px);
    overflow-y: scroll;
  }
  .yearStats{
    position: relative;
    width: 450px;
    height: 100px;
    margin: 20px auto;
    border-radius: 5px;
        border: 2px solid #F3F0E4;
    background-color: white;
  }
  .yearStatsActive{
    border: 2px solid #2F6B97;
  }
  .item {
    width: 3px;
    height: 44px;
    border-radius: 1px;
    margin: 0px 3px;
    transform: rotate(-30deg);
  }

  .barGroup {
    position: absolute;
    left: 110px;
    top: 40%;
    transform: translateY(-50%);
  }
  .barGroup div {
      display: inline-block;
  }

  .africa {
    background-color: #457B9D;
  }
  .america {
    background-color: #00A896;
  }
  .oceania {
    background-color: #A8DADC;
  }
  .europa {
    background-color: #EC4168;
  }
  .asia {
    background-color: #1D3557;
  }




  .statsContinents{
    position: absolute;
    width: 25%;
    top: 0;
    left: 20px;
    height: 100px;

  }
  .statsContinents h3 {
    color: #2F6B97;
    font-weight: 700;
    font-size: 14px;
  }
  .statsContinents .continent p{
    color: #BCBCBC;
    font-size: 14px;
    margin: 0;
  }


  .statsContinents .continent{
    position: absolute;
    opacity: 0;
    top: 66%;
    left: 200px;
    width: 170px;
  }

  .statsContinents .enabled {
    opacity: 1;
  }
</style>
