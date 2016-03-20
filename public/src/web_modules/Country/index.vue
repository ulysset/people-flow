<template>
	<app-header></app-header>
	<div class="container">
		<!-- <countries></countries> -->

		<div class="continent-chart">

			<continent-chart></continent-chart>
		</div>
		<div class="ratio-chart">
			<div class="selectors"></div>
			<ratio-chart></ratio-chart>
		</div>
	</div>
</template>


<script>

	import Vue from 'vue';
	Vue.component('countries', require('./countries'));
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
<style lang="sass">

	.container {
		position: absolute;
		top: 54px;
		left: 50%;
		width: 1000px;
    height: calc(100vh - 54px);
    transform: translateX(-50%);
	}

	.continent-chart {
		display: inline-block;
		position: relative;
		float: right;
		width: 498px;
		height: calc(100vh - 54px);
	}

	.ratio-chart {
		width: 498px;
		margin: 0;
		padding: 0;
		display: inline-block;
		position: relative;
		.selectors{
			width : 100%;
			height : 200px;
		}
	}
</style>
