<template>
	<q-layout
			ref="layout"
			view="hHh Lpr lFf"
			v-model="sides"
			:reveal="true"
			:right-class="{'bg-grey-2': true}"
			:left-class="{'bg-grey-2': true, 'left-panel': $q.platform.is.desktop, 'left-mobile-panel': $q.platform.is.mobile}"
	>
		<q-toolbar slot="header" color="primary">
			<q-btn
					flat
					@click="$refs.layout.toggleLeft()"
			>
				<q-icon name="menu"/>
			</q-btn>

			<q-toolbar-title>
				SLoogle Mail
				<div slot="subtitle">Email Client</div>
			</q-toolbar-title>
		</q-toolbar>
		<div slot="left">
			<email-list :messages="messages" @item-click="openDetailsEmail"></email-list>
		</div>
		<q-toolbar slot="footer">
			<q-progress id="progressbar" :percentage="readMessagesCount" color="secondary" style="height: 20px;" :buffer="messages.length" />
		</q-toolbar>
		<div class="layout-padding">
			<email-details></email-details>
		</div>
		<q-fixed-position corner="bottom-right" :offset="[20, 20]">
			<q-btn round color="secondary" @click="composeModalStatus = true">
				<q-icon name="mail" />
				<q-tooltip>Compose</q-tooltip>
			</q-btn>
		</q-fixed-position>
		<q-modal v-model="composeModalStatus" ref="composeModal" :content-css="{minWidth: '50vw', minHeight: '70vh'}">
			<q-modal-layout>
				<q-toolbar slot="header">
					<q-btn flat @click="$refs.composeModal.close()">
						<q-icon name="keyboard_arrow_left" />
					</q-btn>
					<div class="q-toolbar-title">
						Compose
					</div>
				</q-toolbar>
				<q-toolbar slot="footer" color="white">
					<q-btn icon="send" @click="submitCompose" color="secondary" rounded style="padding: 0px 20px;">
						Send Email
					</q-btn>
				</q-toolbar>
				<div style="padding: 10px 20px;">
					<form action="">
						<div class="row xs-gutter">
							<div class="col-12">
								<q-field>
									<q-input float-label="To" v-model="composeData.to" />
								</q-field>
							</div>
							<div class="col-12">
								<q-field>
									<q-input float-label="Subject" v-model="composeData.subject" />
								</q-field>
							</div>
							<div class="col-12">
								<q-field>
									<q-input float-label="Content" v-model="composeData.content" type="textarea" :max-height="180" :min-rows="10" />
								</q-field>
							</div>
							<div class="col-12">
								<q-alert color="red" v-if="composeError">
									Please fill all the fields
								</q-alert>
							</div>
						</div>
					</form>
				</div>
			</q-modal-layout>
		</q-modal>
	</q-layout>
</template>


<script>
	import {Events} from 'quasar'
	import EmailDetails from './email-details'
	import EmailList from './email-list'
	import MessageService from '../MessageService'

	export default {
		data(){
			return {
				messages: [],
				searchQuery: '',
				composeError: false,
				composeData: {
					from: '',
					subject: '',
					content: '',
					read: false,
					picture: '/statics/boy-avatar.png'
				},
				composeModalStatus: false,
				sides: {
					left: true,
					right: false
				}
			}
		},
		computed: {
			readMessagesCount(){
				return this.messages.filter(msg => {return msg.read}).length
			}
		},
		methods: {
			submitCompose(){
				if(this.composeData.to.length === 0 || this.composeData.subject.length === 0 || this.composeData.content.length === 0){
					this.composeError = true
				} else {
					this.composeError = false
					this.messages.push(this.composeData)
					this.composeData = {
						from: '',
						subject: '',
						content: '',
						read: false,
						picture: '/statics/boy-avatar.png'
					}
					this.composeModalStatus = false
				}
			},
			openDetailsEmail(message){
				debugger
			}
		},
		created(){
			MessageService.getMessages().then((data) => {
				this.messages = data
			})

			let that = this
			Events.$on('open-message-details', () => {
				if(this.$q.platform.is.mobile){
					that.$refs.layout.toggleLeft()
				}
			})
		},
		components: {
			EmailDetails,
			EmailList
		}
	}
</script>

<style>
	#progressbar {
		background: #fff;
		height: 20px;
		border-radius: 10px;
	}

	.left-panel {
		width: 30%;
	}

	.left-mobile-panel {
		width: 95%;
	}
</style>