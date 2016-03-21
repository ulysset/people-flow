<template>
	<app-header></app-header>
	<div class="country-container">
		<a v-link="'/map'" class="back">< Retour sur la map</a>
    <h1 class="title">{{ title }}</h1>
		<div>
			<div class="ratio-chart-container">
				<ratio-chart></ratio-chart>
			</div>
			<div class="continent-chart">
				<continent-chart></continent-chart>
			</div>
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
			const country = countries.filter(
				_country => _country.slug === this.$route.params.key
			)[0];

			return {
				countries,
				title: country ? country.name.toUpperCase() : ''
			};
		},

		ready() {
			const keys = [
		    'ALB', 'AND', 'AUT', 'BLR', 'BEL', 'BIH',
		    'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST',
		    'FRO', 'FIN', 'FRA', 'GEO', 'DEU', 'GIB',
		    'GRC', 'GRL', 'HUN', 'ISL', 'IRL', 'ITA',
		    'LVA', 'LIE', 'LTU', 'LUX', 'MKD', 'MDA',
		    'MCO', 'MNE', 'NLD', 'NOR', 'POL', 'PRT',
		    'ROM', 'RUS', 'SMR', 'SRB', 'SCG', 'SVK',
		    'SVN', 'ESP', 'SWE', 'CHE', 'UKR', 'GBR'
		  ];

			if(!keys.includes(this.$route.params.key)) {
				this.$router.go({ path: '/map' });
			}

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

	.title {
		display: block;
		margin: 0 0 2px 0;
	}

	.back {
		display: block;
		margin-top: 26px;
		text-transform: uppercase;
		color: #BCBCBC;
		font-size: 12px;
		text-decoration: none;
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
