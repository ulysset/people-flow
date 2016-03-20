<template>
  <div class="navStats">
    <h2>CLASSEMENTS / STATISTIQUES</h2>
    <h3>CONTINENTS D’ORIGINE</h3>
    <div class="splitter"></div>
    <h3>PAYS D’ORIGINE</h3>
  </div>
  <div class="statScroll">
    <div v-for="(indexYear, year) in years">
      <div class="yearStats" v-bind:class="{'yearStatsActive': activeIndex == indexYear}" v-on:click="selectIndex(indexYear)">
          <div class="statsContinents">
            <h3>{{years[indexYear]}}</h3>
            <div v-for="(indexContinent, continent) in continents">
              <div class="continent" v-bind:class="{'enabled': activeContinent == continent.name}">
                <h2>{{ continent.name.toUpperCase() }}</h2>
                <p>{{ continent.migrants[years[indexYear]]}}</p>
              </div>
            </div>
          </div>
          <div class="spliter"></div>
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
      }, 2000);
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
            Math.ceil((continent.migrants[year] / total[index]) * 10)
          ))
        }));

      }
    }
  }

</script>
<style scoped>

  .navStats{
    width: 100%;
    height: 100px;
    position: relative;
    background: #FEFEFE;
    box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.24);
  }
  .navStats h2{
    color: #215078;
    text-align: center;
    font-size: 18px;
  }
  .navStats .splitter{
    position: absolute;
    left: 50%;
    width: 1px;
    height: 50px;
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(216,216,216,0.65) 99%,rgba(216,216,216,0.65) 100%);
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
    background-color: #F3F0E4;
  }
  .yearStats{
    position: relative;
    width: 450px;
    height: 120px;
    margin: 20px auto;
    border-radius: 5px;
    border: 2px solid transparent;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.15);
    background-color: #FEFEFE;
  }
  .yearStatsActive{
    border: 2px solid #2F6B97;
  }
  .item {
      display: inline-block;
      width: 10px;
      height: 60px;
      border-radius: 10px;
      margin: 0 3px;
  }

  .barGroup {
    position: absolute;
    left: 200px;
    top: 50%;
    transform: translateY(-50%);
  }
  .barGroup div {
      display: inline-block;
  }

  .africa {
      background-color: #A8216B;
  }

  .asia {
      background-color: #EC1B4B;
  }

  .america {
      background-color: #F26A44;
  }

  .oceania {
      background-color: #F7DB69;
  }

  .europa {
      background-color: #2E9598;
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
  }
  .statsContinents .continent h2, .statsContinents .continent p{
    color: #BCBCBC;
    font-size: 18px;
    margin: 0;
  }


  .statsContinents .continent{
    position: absolute;
    opacity: 0;
    top: 40px;
    left: 50px;
  }

  .statsContinents .enabled {
    opacity: 1;
  }
</style>
