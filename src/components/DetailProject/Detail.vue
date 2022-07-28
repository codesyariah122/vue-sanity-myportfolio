<template>
	<div class="container">
		<div class="row no-gutters">
			<div class="col-lg-12 col-sm-12 col__detail-project">
				<div class="content">
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import sanity from '@/client'
	import imageUrlBuilder from '@sanity/image-url'
	const imageBuilder = imageUrlBuilder(sanity)
	import { SanityBlocks } from "sanity-blocks-vue-component"

	export default {
		props: ['detail'],
		components: {
			SanityBlocks
		},

		data(){
			return {}
		},

		methods: {
			imageUrlFor(source) {
				return imageBuilder.image(source);
			}
		}
	}
</script>