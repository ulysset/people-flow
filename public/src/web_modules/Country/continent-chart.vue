<template>
<div class="yearStats yearStatsActive">
    <div class="statsContinents">
      <h3 >{{years[0]}}</h3>
      <div v-for="continent in continents">
        <div class="continent" v-bind:class="{'enabled': activeContinent == continent.name}">
          <h2>{{ continent.name.toUpperCase() }}</h2>
          <p>{{ continent.migrants}}</p>
        </div>
      </div>
    </div>
    <div class="spliter"></div>
  <div class="barGroup">
    <div v-for="continent in continents" v-on:mouseOver="onHover(this, continent.name)">
        <div v-for="continentItem in continent.count" class="item" v-bind:class="continent.name"></div>
    </div>
  </div>
  <div class="topCountries" >
    <div class="country" v-for="topCountry in topCountries">
      <p>{{topCountry.name}}</p>
    </div>
  </div>
</div>

</template>

<script>

export default {
    data() {
            return {

                activeContinent: '',
                years : [1960, 1970, 1980, 1990, 2000],
                topCountries : [
                  {
                    name : 'Congo',
                  },
                  {
                    name : 'Venezuela',
                  },
                  {
                    name : 'Birmania',
                  }

                ],
                continents: [{
                    name: 'africa',
                    migrants: 2345,
                    count: []
                }, {
                    name: 'america',
                    migrants: 3566,
                    count: []
                }, {
                    name: 'oceania',
                    migrants: 2359,
                    count: []
                }, {
                    name: 'europe',
                    migrants: 3869,
                    count: []
                }, {
                    name: 'asia',
                    migrants: 4899,
                    count: []
                }]
            };
         },
        ready() {
            const total = this.continents
                .map(item => item.migrants)
                .reduce((a, b) => a + b)

            this.continents = this.continents.map(item => {
                const proportion = Math.ceil((item.migrants / total) * 10);
                return {
                    ...item,
                    count: new Array(proportion)
                };
            });
        },

        methods: {
            onHover: (ctx, name) => {
                ctx.activeContinent = name.toLowerCase();
            }
        }
}

</script>
<style scoped>
.yearStats{
  width: 490px;
  height: 200px;
  border-radius: 20px;
  background-color: #F3F0E4;
  position: relative;
  margin: 40px;

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
