<template>
	<div>
		<img :src="imageUrlFor(asset._ref).url()" class="img-fluid">
	</div>
</template>

<script>
	import sanity from '@/client'
	import imageUrlBuilder from '@sanity/image-url'
	const imageBuilder = imageUrlBuilder(sanity)

	export default {
		props: ['asset'],

		methods: {
			imageUrlFor(source){
				return imageBuilder.image(source)
			}
		}
	}
</script>