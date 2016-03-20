<template>

    <div class="parent-ratio">
      <h2>RATIO IMMIGRANTS - IMMIGRÉS</h2>
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
    </div>

</template>
<script>

export default {
  data() {
    const data = {
      'FRA:ITA':{
        from : 'FRA',
        to:'ITA',
        migrants:[]
      },
      'ITA:FRA':{
        from:'ITA',
        to:'FRA',
        migrants:[]
      }
    };

    data['FRA:ITA'].migrants['1960'] = 12100
    data['FRA:ITA'].migrants['1970'] = 25630
    data['FRA:ITA'].migrants['1980'] = 12030
    data['FRA:ITA'].migrants['1990'] = 17300
    data['FRA:ITA'].migrants['2000'] = 12000

    data['ITA:FRA'].migrants['1960'] = 2521
    data['ITA:FRA'].migrants['1970'] = 25385
    data['ITA:FRA'].migrants['1980'] = 2566
    data['ITA:FRA'].migrants['1990'] = 26778
    data['ITA:FRA'].migrants['2000'] = 2266

    return {
      activeIndex : 0,
      arrival : [],
      departure : [],
      pointX : [],
      pointY : [],
      instantRatioScale : [],
      years : [1960, 1970, 1980, 1990, 2000],
      data,
      selectedCountries: {
        one: 'FRA:ITA',
        two: 'ITA:FRA'
      }
    }
  },

  ready() {

    const canvas = document.getElementById('chart')
    const context = canvas.getContext('2d')

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

    const index1 = this.selectedCountries.one
    const index2 = this.selectedCountries.two

    this.data[index1].migrants.forEach(item => {
      arrival.push(item)
    })
    this.data[index2].migrants.forEach(item => {
      departure.push(item)
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
    context.fillStyle = "#F3F0E4"

    context.beginPath()
    context.moveTo(pointX[0], pointY[0])
    for (let i = 1; i < 5; i++){
      context.bezierCurveTo(pointX[i-1] + roundness, pointY[i-1], pointX[i] - roundness, pointY[i], pointX[i], pointY[i])
    }
    context.lineTo(WIDTH, HEIGHT)
    context.lineTo(0, HEIGHT)
    context.fill()
  },

  methods: {
    selectIndex(index) {
      this.$dispatch('selectIndex', index);
    }
  },

  events: {
    selectIndex(index) {
      this.activeIndex = index;
    }
  }
}
</script>





<style scoped>
  .parent-ratio{
    width: 470px;
    height: 600px;
    margin: auto;
  }
  .parent-ratio h2{
    color: #215078;
    text-align: center;
    font-size: 18px;
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
    border-radius: 10px;
    border: 3px solid transparent;
    transition: all ease-in .2s;
    cursor: pointer;

  }
  .years li:hover {
    border: 3px solid #2F6B97;
  }
  .years li.selected{
    border: 3px solid #2F6B97;
    transform: scale(1.3);
  }


  .ratio{
    width : 470px;
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
    border: 2px solid #F3F0E4;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.33);
    opacity: 0;
    transition: all .3s;
  }
  .showDots{
    opacity: 1;
  }
  .directRatio{
    width: 470px;
    height: 50px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
  }
  .directRatio .baseArriving {
    position: absolute;
    left: 0;
    height: 100%;
    width: 20px;
    background-color: #2f6b96;
    z-index: 5;
    border-radius: 10px;
  }
  .directRatio .baseLeaving {
    position: absolute;
    height: 100%;
    width: 20px;
    right: 0;
    background-color: #F3F0E4 ;
    z-index: 5;
    border-radius: 10px;

  }
  .directRatio .arriving{
    transition: all ease .3s;
    position: absolute;
    background-color: #2f6b96;
    z-index: 2;
    height: 100%;
    border-radius: 10px;

  }
  .directRatio .leaving{
    position: absolute;
    background-color: #F3F0E4;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

</style>
