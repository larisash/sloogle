<template>
	<div class="row xs-gutter" v-if="currentMessage != null">
		<div class="col-12">
			<q-card>
				<q-card-title>
					From
				</q-card-title>
				<q-card-main v-html="currentMessage.from">

				</q-card-main>
			</q-card>
			<q-card>
				<q-card-title>
					Subject
				</q-card-title>
				<q-card-main v-html="currentMessage.subject">

				</q-card-main>
			</q-card>
			<q-card>
				<q-card-title>
					Message
				</q-card-title>
				<q-card-main v-html="currentMessage.content">

				</q-card-main>
			</q-card>
		</div>
	</div>
</template>


<script>
	import { Events } from 'quasar'

	export default {
		data(){
			return {
				currentMessage: null
			}
		},
		created(){
			Events.$on('open-message-details', (message) => {
				this.currentMessage = message
			})
		}
	}
</script>