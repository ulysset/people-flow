<template>
    <div v-for="continent in continents" v-on:mouseOver="onHover(this, continent.name)" >
        <span v-bind:class="{'enabled': activeContinent == continent.name}">{{ continent.name }}</span>
        <div v-for="continentItem in continent.count" class="item" v-bind:class="continent.name">
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
                    migrants  : 2345,
                    count : new Array()
                }, {
                    name: 'america',
                    migrants : 4899,
                    count : new Array()
                }]
            }
    },
    ready() {
        const total = this.continents
            .map(item => item.migrants)
            .reduce((a, b) => a + b)

        this.continents.forEach((item) => {
            let proportion = Math.ceil((item.migrants / total) * 20)
            item.count = new Array(proportion)
            console.log('**')
            console.log(proportion)
            console.log(item.count)
        })

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
