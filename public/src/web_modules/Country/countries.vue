<template>
	<div>
		<div v-for='country in countries'>
			<canvas v-bind:class="country.name" width='600' height='50'></canvas>
		</div>
	</div>
</template>

<style>
	
</style>

<script>
	
	import Chart from 'chart.js';

	export default {

		data() {
			return {
				countries: [{
					name: 'FR',
					data: [20000, 25000, 49080, 80000, 51000, 96000]
				}, {
					name: 'ES',
					data: [20000, 25000, 49080, 160000, 51000, 0]
				}]
			};
		},

		ready() {
			this.countries.map(function(country) {
				const ctx = document.querySelector('.' + country.name).getContext('2d');
				const data = {
				    labels: ['1960', '1970', '1980', '1990', '2000', '2010'],
				    datasets: [{
			            label: 'My First dataset',
			            fillColor: 'rgba(220,220,220,0.2)',
			            strokeColor: 'rgba(220,220,220,1)',
			            pointColor: 'rgba(220,220,220,1)',
			            pointStrokeColor: '#fff',
			            pointHighlightFill: '#fff',
			            pointHighlightStroke: 'rgba(220,220,220,1)',
			            data: country.data
				    }]
				};

				const chart = new Chart(ctx).Line(data, {
				    scaleShowLabels: false,
				    scaleShowGridLines: false,
				    showScale: true,
				    tooltipCaretSize: 2,
				    pointDot: false,
				    scaleFontColor: '#eeeeee',
				    bezierCurve: true,
				    scaleLineColor: 'rgba(219,219,220,1)',
				    datasetFill: true,
				    showTooltips: false,
				    // tooltipFillColor: 'rgba(140,32,220,0.8)',
				    // tooltipFontSize: 10,
				}); 
			})
		}

	}



</script>