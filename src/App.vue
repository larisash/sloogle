<template>
	<!-- Don't drop "q-app" class -->
	<div id="q-app">
		<router-view></router-view>
	</div>
</template>

<script>
	/*
	 * Root component
	 */
	export default {
		data(){
			return {
				sides: {
					left: true,
					right: false
				}
			}
		}
	}
</script>

<style>

</style>
