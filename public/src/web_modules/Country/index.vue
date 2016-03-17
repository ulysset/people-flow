<template>
	<div>
		<countries></countries>
		<continent-chart></continent-chart>
		<ratio-chart></ratio-chart>
	</div>
</template>


<script>
	import Vue from 'vue';
	Vue.component('countries', require('./countries'));
	Vue.component('continent-chart', require('./continent-chart'));
	Vue.component('ratio-chart', require('./ratio-chart.vue'));
</script>
