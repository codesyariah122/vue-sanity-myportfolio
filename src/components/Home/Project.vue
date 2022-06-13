<template>
	<div>
		
	</div>
</template>

<script>
	import sanity from '@/client'

	import imageUrlBuilder from '@sanity/image-url'

	const imageBuilder = imageUrlBuilder(sanity)

	import moment from 'moment'

	export default {
		props: ['projects'],
		data(){
			return{
				detail: {},
				img: ''
			}
		},
		methods: {
			imageUrlFor(source){
				return imageBuilder.image(source)
			},

			showDetail(data, img){
				this.detail = data
				this.img = this.imageUrlFor(img)
			},

			date(val){
				return moment(val).format("LL")
			}
		}
	}
</script>