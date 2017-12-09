<template>
	<div>
		<q-tabs v-model="selectedTab" align="justify">
			<q-tab default :count="messages.length" slot="title" name="all" icon="mail" label="Inbox" />
			<q-tab default :count="unreadCount" slot="title" name="unread" icon="mail" label="Unread emails" />
			<q-tab default :count="readCount" slot="title" name="read" icon="mail" label="Read emails" />
		</q-tabs>
		<q-search v-model="searchQuery" id="email-search-field" inverted />
		<q-scroll-area id="emails-list-scroller">
			<q-list highlight>
				<q-list-header>Emails</q-list-header>
				<q-item v-for="(message, index) in filterMessages" @click="onMessageClick(message)" :key="index">
					<q-item-side :avatar="message.picture" />
					<q-item-main>
						<q-item-tile label v-html="message.subject"></q-item-tile>
						<q-item-tile sublabel v-html="message.content.substring(0, 50) + '...'"></q-item-tile>
					</q-item-main>
					<q-item-side right>
						<q-item-tile icon="arrow_forward" />
					</q-item-side>
				</q-item>
			</q-list>
		</q-scroll-area>
	</div>
</template>

<script>
	import { Events } from 'quasar'
	export default {
		props: {
			messages: {
				type: Array,
				required: true
			}
		},
		data(){
			return {
				selectedTab: 'all',
				searchQuery: ''
			}
		},
		methods: {
			onMessageClick(message){
				Events.$emit('open-message-details', message)
			}
		},
		computed:{
			unreadCount(){
				return this.messages.filter(msg => { return !msg.read }).length
			},
			readCount(){
				return this.messages.filter(msg => {return msg.read}).length
			},
			unreadMessages(){
				return this.messages.filter(msg => { return !msg.read })
			},
			readMessages(){
				return this.messages.filter(msg => {return msg.read})
			},
			filterMessages(){
				return this.messages.filter(msg => {
					let searchResult = (msg.subject.indexOf(this.searchQuery) !== -1 ||
						msg.from.indexOf(this.searchQuery) !== -1	||
						msg.content.indexOf(this.searchQuery) !== -1)

					switch (this.selectedTab){
						case 'read':
							return searchResult && msg.read == true
							break;

						case 'unread':
							return searchResult && msg.read == false
							break;

						case 'all':
							return searchResult
							break;
					}
				})
			},

		}
	}
</script>

<style>
	#emails-list-scroller {
		height: calc(100vh - 180px);
	}

	#email-search-field {
		margin-top: 0px;
	}
</style>