<template>
  <ul class="container">
    <li
      v-for="_year in years"
      v-on:click="onClick(_year)"
      v-bind:class="{ 'is-active': _year === year }"
      class="item">
      {{ _year }}
    </li>
  </ul>
</template>

<script>

  export default {

    props: ['year'],

    data() {
      return {
        years: [1970, 1980, 1990, 2000, 2010]
      }
    },

    methods: {
      onClick(year) {
        this.$dispatch('changeYear', year);
      }
    }

  }

</script>

<style lang="sass" scoped>

  .container {
    position: absolute;
    margin: 0;
    bottom: 0;
    z-index: 1;
    width: 100%;
    padding: 12px 0;
    background-color: white;
    border-top: #ccc solid 1px;
    text-align: center;
  }

  .item {
    display: inline-block;
    color: #ccc;
    cursor: pointer;

    &.is-active {
      font-weight: bold;
      color: black;
      cursor: default;
    }

    & + & {
      margin-left: 80px;
    }
  }

</style>
