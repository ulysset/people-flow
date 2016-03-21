<template>
  <div class="container">
    <div class="ratio" v-bind:style="{ left: ratio + 'px' }"></div>
    <div class="pause" v-bind:class="{
      isPlaying: !isPlaying
    }" v-on:click="play()"></div>
    <ul class="years">
      <li
        v-bind:style="{ width: yearWidth + 'px' }"
        v-for="_year in years"
        v-on:click="changeYear(_year)"
        v-bind:class="{ 'is-active': _year === year }"
        class="year">
        {{ _year }}
      </li>
    </ul>
  </div>
</template>

<script>

  import { DEFAULT_YEAR, YEAR_DURATION } from 'config';

  export default {

    props: ['year'],

    data() {
      return {
        years: [1960, 1970, 1980, 1990, 2000],
        ratio: 0,
        yearWidth: 130,
        isPlaying: true
      };
    },

    ready() {
      this.getRatio(this.years.indexOf(DEFAULT_YEAR));
      setInterval(() => {
        if(this.isPlaying && this.year !== this.years[this.years.length - 1]) {
          const nextYear = this.years[this.years.indexOf(this.year) + 1];
          this.changeYear(nextYear);
        }
      }, YEAR_DURATION)
    },

    methods: {
      getRatio(index) {
        const totalWidth = this.yearWidth * this.years.length;
        const windowWidth = window.innerWidth;

        this.ratio =
          (windowWidth - totalWidth) / 2 -
          (windowWidth / 2) + this.yearWidth / 2 +
          index * this.yearWidth;
      },

      changeYear(year) {
        this.year = year;
        this.$dispatch('changeYear', this.year);
        this.getRatio(this.years.indexOf(this.year));
      },

      play() {
        this.isPlaying = !this.isPlaying;
      }
    }

  }

</script>

<style lang="sass" scoped>

  @import "../theme";

  .container {
    position: absolute;
    margin: 0;
    bottom: 0;
    z-index: 1;
    width: 100%;
    background-color: white;
    border-top: 1px solid mix($primaryColor, white, 25%);
  }

  .ratio {
    display: block;
    position: relative;
    top: -2px;
    width: 50%;
    height: 3px;
    background: linear-gradient(to left, $secondaryColor 0%, transparent 100%);
    transition: left .2s ease;

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: -2px;
      right: -3px;
      width: 7px;
      height: 7px;
      background-color: $secondaryColor;
      border-radius: 50%;
      z-index: 2;
    }
  }

  .pause {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 14px;
    width: 14px;
    height: 14px;
    background-image: url('../../assets/img/icon-pause.svg');
    background-size: 100%;
    transform: translateY(-50%);
    opacity: .25;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    &.isPlaying {
      opacity: 1;

      &:hover {
        opacity: .75;
      }
    }
  }

  .years {
    display: block;
    text-align: center;
    padding: 10px 0 13px;
    margin: 0;
  }

  .year {
    display: inline-block;
    cursor: pointer;
    font-size: 14px;
    color: rgba($secondaryColor, .25);
    text-align: center;
    transition: color ease .15s, transform ease .15s;

    &.is-active,
    &:hover {
      font-weight: 500;
      color: rgba($secondaryColor, 1);
    }
  }

</style>
