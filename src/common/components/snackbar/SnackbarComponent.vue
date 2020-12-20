<template>
	<div class="text-center">
		<v-snackbar
			v-model="snackbar"
			:timeout="timeout"
		>
			{{this.message}}
		</v-snackbar>
	</div>	
</template>

<script>
	import Vue from "vue";

	export default Vue.extend({
		name: 'SnackbarComponent',
		props: ['message'],
		data: () => ({
			snackbar: true,
			timeout: 1500,
		}),
	})
</script>
