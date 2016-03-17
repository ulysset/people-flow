<style scoped>


</style>

<template>

<div>
    <canvas id="ratio"></canvas>
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
    data['FRA:ITA'].migrants['1970'] = 25636
    data['FRA:ITA'].migrants['1980'] = 12030
    data['FRA:ITA'].migrants['1990'] = 12300
    data['FRA:ITA'].migrants['2000'] = 12000

    data['ITA:FRA'].migrants['1960'] = 2522
    data['ITA:FRA'].migrants['1970'] = 2535
    data['ITA:FRA'].migrants['1980'] = 2566
    data['ITA:FRA'].migrants['1990'] = 2677
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
    let context = canvas.getContext('2d')
    const WIDTH = 600
    const HEIGHT = 100
    canvas.width = WIDTH
    canvas.height = HEIGHT
    let arrival = [],
        departure = [],
        pointX = []
    for(let i = 0; i < 5; i++){
      pointX.push((WIDTH/4)*i)
    }
    const index1 = this.selectedCountries.one
    const index2 = this.selectedCountries.two

    this.data[index1].migrants.forEach(item => {
      arrival.push(item);
    })
    this.data[index2].migrants.forEach(item => {
      departure.push(item);
    })

    console.log(arrival);
    console.log(departure);

    context.fillStyle = "red"
    context.beginPath()
    context.rect(0,0,WIDTH, HEIGHT)
    context.fill()

    context.fillStyle = "coral"

    context.beginPath()
    for (let i = 0; i < 5; i++){
      let pointY = arrival[i]/(arrival[i]+departure[i])* HEIGHT
      context.lineTo(pointX[i],pointY)
    }
    context.lineTo(WIDTH, HEIGHT)
    context.lineTo(0, HEIGHT)
    context.fill()
  },
  method: {

  }
}

</script>
