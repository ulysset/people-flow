<template>
  <div v-for="continent in continents" v-on:mouseOver="onHover(this, continent.name)">
    <span v-bind:class="{
      'continentName': true,
      'enabled': activeContinent == continent.name
    }">{{ continent.name }}</span>
    <div
      v-for="continentItem in continent.count"
      class="item"
      v-bind:class="continent.name">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeContinent: '',
        continents: [{
          name: 'africa',
          count: new Array(4)
        }, {
          name: 'america',
          count: new Array(1)
        }]
      }
    },

    methods: {
      onHover: (ctx, name) => {
        ctx.activeContinent = name;
      }
    }
  }


</script>

<style scoped>

  .item {
    width: 10px;
    height: 60px;
    display: inline-block;
    border-radius: 10px;
    margin: 0 3px;
  }

  .africa {
    background-color: red;
  }

  .asia {
    background-color: blue;
  }
  .america {
    background-color: coral;
  }

  .oceania {
    background-color: purple;
  }
  .europe {
    background-color: green;
  }

  .continentName {
    opacity: 0;
  }

  .enabled {
    opacity: 1;
  }

</style>
