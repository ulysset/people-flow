<template>
  <div class="header">
    <h2>ratio départs / arrivées</h2>
  </div>
    <div class="parent-ratio">
      <ul class="years" >
        <li  class="selected" v-for="(indexYear, year) in years" v-on:click="selectIndex($index)" v-bind:class="{'selected': indexYear == activeIndex}">
          {{year}}
        </li>
      </ul>
      <div class="ratio">
        <canvas id="chart" class="chart"></canvas>
        <div v-for="(indexPoint, item) in pointX" class="circle" v-bind:style="{ top: pointY[$index]/2 + 'px', left: pointX[$index]/2 + 'px' }" v-bind:class="{'showDots' : activeIndex == indexPoint }"></div>
      </div>
      <div class="directRatio">
        <div class="baseArriving"></div>
        <div class="baseLeaving"></div>
        <div class="arriving" v-bind:style="{ width : (instantRatioScale[activeIndex] * 100) + '%' }"></div>
        <div class="leaving"></div>
      </div>
      <div class="flowNumber">
        <div class="numberArriving">{{arrival[activeIndex]}}</div>
        <div class="numberDeparture">{{departure[activeIndex]}}</div>
        <div class="numberArriving">ARRIVES</div>
        <div class="numberDeparture">DÉPARTS</div>
      </div>
    </div>
</template>
<script>

  import countries from 'assets/data/countries';
  export default {

    data() {
      return {
        activeIndex: 0,
        arrival: [],
        departure: [],
        pointX: [],
        pointY: [],
        instantRatioScale: [],
        years: [1960, 1970, 1980, 1990, 2000],
        data: null,
        selectedCountries: {
          one: 'arrivals',
          two: 'departures'
        },
        countries
      }
    },

    ready() {
      if(this.data) {
        this.render();
      }
    },

    methods: {
      selectIndex(index) {
        this.$dispatch('selectIndex', index);
      },

      render() {
        const canvas = document.getElementById('chart')
        const context = canvas.getContext('2d')
        const data = this.data.allNetMigration[this.$route.params.key].data;
        this.netMigration = {
          arrivals: data.arrivals,
          departures: data.departures
        };

        // Set size
        const WIDTH = 940
        const HEIGHT = 220
        canvas.width = WIDTH
        canvas.height = HEIGHT

        let arrival = this.arrival,
             departure = this.departure,
             pointX = this.pointX,
             pointY = this.pointY,
             roundness = 100

        Object.keys(this.netMigration['arrivals']).forEach(key => {
          arrival.push(this.netMigration['arrivals'][key])
        })
        Object.keys(this.netMigration['departures']).forEach(key => {
          departure.push(this.netMigration['departures'][key])
        })

        for(let i = 0; i < 5; i++){
          pointX.push((WIDTH/4)*i)
        }
        for(let i = 0; i<5; i++){
          this.instantRatioScale.push( arrival[i]/(arrival[i] + departure[i]));
          pointY.push( arrival[i]/(arrival[i] + departure[i])* HEIGHT )
        }
        context.fillStyle = "#2F6B97"
        context.beginPath()
        context.rect(0, 0, WIDTH, HEIGHT)
        context.fill()
        context.fillStyle = "#ececec"

        context.beginPath()
        context.moveTo(pointX[0], pointY[0])
        for (let i = 1; i < 5; i++){
          context.bezierCurveTo(pointX[i-1] + roundness, pointY[i-1], pointX[i] - roundness, pointY[i], pointX[i], pointY[i])
        }
        context.lineTo(WIDTH, HEIGHT)
        context.lineTo(0, HEIGHT)
        context.fill()
      }
    },

    events: {
      selectIndex(index) {
        this.activeIndex = index;
      },
      getData(value) {
        console.log('render !');
        this.data = value;
        this.render();
      }
    }
  }

</script>

<style scoped>

  .parent-ratio{
    width: 470px;
    height: 600px;
  }

  .header{
    position: relative;
    top: 12px;
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
  }

  .header h2{
    color: #215078;
    font-size: 16px;
    text-transform: uppercase;
  }

  .years{
    position: relative;
    width: 500px;
    transform: translateX(-20px);
    display: flex;
    margin: 0;
    padding: 0;
    padding-bottom: 20px;
    justify-content: space-between;
    list-style-type: none;
  }

  .years li {
    padding: 5px;
    border-radius: 5px;
    border: 2px solid transparent;
    transition: all ease-in .2s;
    cursor: pointer;
    font-size: 12px;
  }

  .years li:hover {
    border: 2px solid #2F6B97;
  }

  .years li.selected{
    border: 2px solid #2F6B97;
    transform: scale(1.3);
  }

  .ratio{
    width: 470px;
    height: 110px;
    position: relative;
    margin-bottom: 30px;
  }

  .chart{
    border-radius: 14px;
    transform-origin: left top;
    transform: scale(.5);
  }

  .circle{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background-color: #2F6B97;
    border: 2px solid #ececec;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.33);
    opacity: 0;
    transition: all .3s;
  }

  .showDots{
    opacity: 1;
  }

  .flowNumber{
    width: 100%;
    position: relative;
    margin-top: 20px;
    color: #2F6B97;
    font-size: 14px;
    font-weight: 600;
  }

  .flowNumber .numberArriving{
    text-align: left;
    display: inline-block;
    width: 49%;
  }

  .flowNumber .numberDeparture{
    text-align: right;
    display: inline-block;
    width: 49%;
  }

  .directRatio{
    width: 470px;
    height: 50px;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
  }

  .directRatio .baseArriving {
    position: absolute;
    left: 0;
    height: 100%;
    width: 20px;
    background-color: #2f6b96;
    z-index: 5;
    border-radius: 5px;
  }

  .directRatio .baseLeaving {
    position: absolute;
    height: 100%;
    width: 20px;
    right: 0;
    background-color: #ececec ;
    z-index: 5;
    border-radius: 5px;

  }

  .directRatio .arriving{
    transition: all ease .3s;
    position: absolute;
    background-color: #2f6b96;
    z-index: 2;
    height: 100%;
    border-radius: 5px;
  }

  .directRatio .leaving{
    position: absolute;
    background-color: #ececec;
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

</style>
