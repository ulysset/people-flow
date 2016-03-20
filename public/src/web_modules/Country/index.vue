<template>
	<app-header></app-header>
	<div class="country-container">
		<div class="continent-chart">
			<continent-chart></continent-chart>
		</div>
		<div class="ratio-chart-container">
			<div class="selectors"></div>
			<ratio-chart></ratio-chart>
		</div>
	</div>
</template>

<script>

	import Vue from 'vue';
	Vue.component('continent-chart', require('./continent-chart'));
	Vue.component('ratio-chart', require('./ratio-chart.vue'));
  Vue.component('app-header', require('./../header'));

	export default {
		events: {
			selectIndex(index) {
				this.$broadcast('selectIndex', index);
			}
		}
	}

</script>

<style lang="sass" scoped>

	.country-container {
		position: absolute;
		top: 54px;
		left: 50%;
		width: 1000px;
    height: calc(100vh - 54px);
    transform: translateX(-50%);
		overflow-y: hidden;
		overflow-x: visible;
	}

	.continent-chart {
		display: inline-block;
		position: relative;
		float: right;
		width: 498px;
		height: calc(100vh - 54px);
	}

	.ratio-chart-container {
		display: inline-block;
		position: relative;
		transform: scale(.95);
		margin: 0;
		width: 498px;
		padding: 0;

		.ratio-chart .selectors {
			width : 100%;
			height : 200px;
		}
	}

</style>
