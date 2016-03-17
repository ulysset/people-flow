<style scoped>

.item {
    width: 60px;
    height: 10px;
    border-radius: 10px;
    margin: 3px 0;
}

.barGroup {}

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

<template>

<div v-for="continent in continents" v-on:mouseOver="onHover(this, continent.name)" class="barGroup">
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
                    migrants: 2345,
                    count: []
                }, {
                    name: 'america',
                    migrants: 4899,
                    count: []
                }, {
                    name: 'oceania',
                    migrants: 4899,
                    count: []
                }, {
                    name: 'europe',
                    migrants: 4899,
                    count: []
                }, {
                    name: 'asia',
                    migrants: 4899,
                    count: []
                }]
            };
        },
        ready() {
            const total = this.continents
                .map(item => item.migrants)
                .reduce((a, b) => a + b)

            this.continents = this.continents.map(item => {
                const proportion = Math.ceil((item.migrants / total) * 20);
                return {
                    ...item,
                    count: new Array(proportion)
                };
            });
        },

        methods: {
            onHover: (ctx, name) => {
                ctx.activeContinent = name;
            }
        }
}

</script>
