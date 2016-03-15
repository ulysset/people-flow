<template>
    <canvas v-el:chart class="chart-continent"></canvas>
    <div v-for="continent in continents" class="item" v-bind:class="continent.name"></div>
</template>

<script>

    export default {
        data() {
            return {
                continents: [],
                data: [{
                    name: 'Africa',
                    migrants: 36676,
                }, {
                    name: 'Asia',
                    migrants: 3674,
                }, {
                    name: 'Oceania',
                    migrants: 2556,
                }, {
                    name: 'America',
                    migrants: 23,
                }, {
                    name: 'Europe',
                    migrants: 255,
                }]
            }
        },

        ready() {
            const total = this.data
                .map(item => item.migrants)
                .reduce((a, b) => a + b);

            this.data.forEach((item) => {
                let proportion = (item.migrants /total)*20
                if (proportion < 0.2) {

                }
                console.log(proportion);
                this.continents.push({name : item.name.toLowerCase()})
            })






        }
    }

</script>


<style scoped>
    .chart-continent {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

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
</style>
