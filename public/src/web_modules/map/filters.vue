<template>
  <div class="filter">
    <ul class="list">
      <li v-for="filter in filters" class="item" v-bind:class="{
        'is-active': filter.isActive
      }" v-on:click="onClick($index)">
        <div class="select"></div>
        {{ filter.name }}
      </li>
    </ul>
  </div>
</template>

<script>

  export default {

    props: ['filters'],

    methods: {
      onClick(index) {
        this.filters[index].isActive = !this.filters[index].isActive;
        this.$dispatch('changeFilters', this.filters);
      }
    }
  }

</script>

<style lang="sass" scoped>

  @import "../theme";

  .filter {
    position: absolute;
    left: 50px;
    bottom: 90px;
    z-index: 5;
  }

  .list {
    margin: 4px 0 0;
    padding-left: 0;
  }

  .item {
    list-style: none;
    text-transform: uppercase;
    font-size: 11px;
    color: rgba($primaryColor, .5);
    cursor: pointer;
    transition: color ease .2s;

    & + & {
      margin-top: 2px;
    }
  }

  .select {
    display: inline-block;
    position: relative;
    top: 2px;
    margin-right: 4px;
    width: 8px;
    height: 8px;
    background-color: white;
    border: 2px solid rgba($primaryColor, .33);
    border-radius: 50%;
    transition: border ease .2s;
  }

  .item.is-active {
    color: rgba($primaryColor, 1);

    .select {
      border-color: rgba($primaryColor, 1);
    }
  }

  .item.is-active:hover {
    .select {
      border-color: rgba($primaryColor, .66);
    }
  }

</style>
