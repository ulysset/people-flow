<style scoped>

.item {
    width: 60px;
    height: 10px;
    border-radius: 10px;
    margin: 3px 0;
}

.barGroup {}

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

.statsContinents{
  width: 300px;
  height: 100px;
}

.statsContinents .continent{
  position: absolute;
  opacity: 0;
}

.statsContinents .enabled {
  opacity: 1;
}


</style>

<template>

  <div class="statsContinents">
    <div v-for="continent in continents">
      <div class="continent" v-bind:class="{'enabled': activeContinent == continent.name}">
        <h2>{{ continent.name.toUpperCase() }}</h2>
        <p>{{ continent.migrants}}</p>
      </div>
    </div>
  </div>
<div v-for="continent in continents" v-on:mouseOver="onHover(this, continent.name)" class="barGroup">
    <div v-for="continentItem in continent.count" class="item" v-bind:class="continent.name"></div>
</div>


</template>

<script>

export default {
    data() {
            return {
                activeContinent: '',
                years : [],
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
