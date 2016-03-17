<style scoped>
  .ratio{
    border-radius: 40px;
    transform-origin: left top;
    transform: scale(.5);
  }

</style>

<template>


    <canvas id="ratio" class="ratio"></canvas>


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
    data['FRA:ITA'].migrants['1970'] = 25636
    data['FRA:ITA'].migrants['1980'] = 12030
    data['FRA:ITA'].migrants['1990'] = 12300
    data['FRA:ITA'].migrants['2000'] = 12000

    data['ITA:FRA'].migrants['1960'] = 2521
    data['ITA:FRA'].migrants['1970'] = 25385
    data['ITA:FRA'].migrants['1980'] = 2566
    data['ITA:FRA'].migrants['1990'] = 26778
    data['ITA:FRA'].migrants['2000'] = 2266

    return {
      data,
      selectedCountries: {
        one: 'FRA:ITA',
        two: 'ITA:FRA'
      }
    }
  },

  ready() {

    const canvas = document.getElementById('ratio')
    const context = canvas.getContext('2d')

    // Set size
    const WIDTH = 1200
    const HEIGHT = 200
    canvas.width = WIDTH
    canvas.height = HEIGHT


    const arrival = [],
         departure = [],
         pointX = [],
         pointY = [],
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
  method: {

  }
}

</script>
