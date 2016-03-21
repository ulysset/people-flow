<template>
	<app-header></app-header>
	<div class="country-container">
    <h1 class="title">{{ title }}</h1>
		<div class="ratio-chart-container">
			<ratio-chart></ratio-chart>
		</div>
		<div class="continent-chart">
			<continent-chart></continent-chart>
		</div>
	</div>
</template>

<script>

	import Vue from 'vue';
	import countries from 'assets/data/countries';

	Vue.component('continent-chart', require('./continent-chart'));
	Vue.component('ratio-chart', require('./ratio-chart.vue'));
	Vue.component('input-country', require('./input-country.vue'));
  Vue.component('app-header', require('./../header'));

	export default {

    props: ['data'],

		data() {
			return {
				countries,
				title: countries.filter(
						country => country.slug === this.$route.params.key
					)[0].name.toUpperCase()
			};
		},

		ready() {
      if(this.data) {
        this.$broadcast('getData', this.data)
      }
		},

		events: {
			selectIndex(index) {
				this.$broadcast('selectIndex', index);
			}
		}
	}

</script>

<style lang="sass" scoped>

	body {
	}

	.title {
		margin-bottom: 0;
	}

	.country-container {
		position: absolute;
		top: 60px;
		left: 50%;
		width: 1000px;
    transform: translateX(-50%);
	}

	.continent-chart {
		display: inline-block;
		position: relative;
		vertical-align: top;
		width: 498px;
		height: calc(100vh - 54px);
	}

	.ratio-chart-container {
		display: inline-block;
		position: relative;
		vertical-align: top;
		margin: 0;
		width: 498px;
		padding: 0;

		.ratio-chart .selectors {
			width : 100%;
			height : 200px;
		}
	}

</style>
