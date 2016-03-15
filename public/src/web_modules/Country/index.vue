<template>
	<div>
		<countries></countries>
		<continent-chart></continent-chart>
	</div>
</template>


<script>

	import Vue from 'vue';
	Vue.component('countries', require('./countries'));
	Vue.component('continent-chart', require('./continent-chart'));

</script>
