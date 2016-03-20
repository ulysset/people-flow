<template>
<div class="navStats">
  <h2>CLASSEMENTS / STATISTIQUES</h2>
  <h3>CONTINENTS D’ORIGINE</h3>
  <div class="splitter"></div>
  <h3>PAYS D’ORIGINE</h3>
</div>
<div class="statScroll">
  <div v-for="(indexYear, year) in years">
    <div class="yearStats" v-bind:class="{'yearStatsActive': activeIndex == indexYear}" v-on:click="selectIndex($index)">
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
      <div class="topCountries" >
        <div class="country" v-for="topCountry in topCountries">
          <p>{{topCountry.name}}</p>
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
        activeIndex: 0,
        activeContinent : '',
        years : [1960, 1970, 1980, 1990, 2000],
        topCountries : [{
          name : 'Congo',
        }, {
          name : 'Venezuela',
        }, {
          name : 'Birmania',
        }],
        continents: [{
          name: 'africa',
          migrants: {
            1960 : 2596,
            1970 : 2506,
            1980 : 32637,
            1990 : 20963,
            2000 : 2666
          },
          count: []
        }, {
          name: 'america',
          migrants: {
            1960 : 37073,
            1970 : 8990,
            1980 : 26066,
            1990 : 366,
            2000 : 2686
          },
          count: []
        }, {
          name: 'oceania',
          migrants: {
            1960 : 20887,
            1970 : 38990,
            1980 : 2666,
            1990 : 2676,
            2000 : 333
          },
          count: []
        }, {
          name: 'europe',
          migrants: {
            1960 : 3638,
            1970 : 36663,
            1980 : 35666,
            1990 : 3553,
            2000 : 3636
          },
          count: []
        }, {
          name: 'asia',
          migrants: {
            1960 : 2340,
            1970 : 8990,
            1980 : 498,
            1990 : 4899,
            2000 : 890
          },
          count: []
        }]
      };
   },

   ready() {
     const total = this.years
      .map(year => (
        this.continents
          .map(continent => continent.migrants[year])
          .reduce((a, b) => a + b)
      ));
      this.continents = this.continents.map(continent => {
        const count = this.years.map((year, index) => (
          Math.ceil((continent.migrants[year] / total[index]) * 10)
        ));
        return {
          ...continent,
          count
        }
      });
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
        console.log(value);
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
    height: 200px;
    margin: 20px auto;
    border-radius: 5px;
    border: 4px solid transparent;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.15);
    background-color: #FEFEFE;
  }
  .yearStatsActive{
    border: 4px solid #2F6B97;
  }
  .item {
      display: block;
      width: 60px;
      height: 10px;
      border-radius: 10px;
      margin: 3px 0;
  }

  .barGroup {
    position: absolute;
    left: 150px;
    top: 10px;
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

  .europe {
      background-color: #2E9598;
  }
  .spliter{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 70%;
    background-color: #B3B3B3;
  }

  .statsContinents{
    position: absolute;
    width: 25%;
    top: 0;
    left: 20px;
    height: 100px;

  }
  .statsContinents .continent h2, .statsContinents .continent p{
    color: #BCBCBC;
    font-size: 18px;
  }


  .statsContinents .continent{
    position: absolute;
    opacity: 0;
  }

  .statsContinents .enabled {
    opacity: 1;
  }
  .topCountries{
    position: absolute;
    right: 0;
    width: 50%;
    height: 80%;
    top: 50%;
    transform: translateY(-50%);
  }
  .topCountries .country{
    position: relative;
    margin: 10px;
    width: 140px;
    height: 30px;
    border-radius: 30px;
  }
  .topCountries .country:nth-child(1){
    background-color: #EC1B4B;
  }
  .topCountries .country:nth-child(2){
    background-color: #F7DB69;
  }
  .topCountries .country:nth-child(3){
    background-color: #2E9598;
  }
  .topCountries .country p{
    margin: 0;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
  }

</style>
