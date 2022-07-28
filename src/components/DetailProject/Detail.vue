<template>
	<div class="container">
		<div class="row no-gutters">
			<div class="col-lg-12 col-sm-12 col__detail-project">
				<div v-if="error" class="error">
					{{ error }}
				</div>
				<div v-else class="content__project">
					<div v-if="detail.mainImage" class="bg__project" :style="`background-image: url(${imageUrlFor(detail.mainImage.asset)})`">
						<div class="frosted-glass">
							<h1 class="title">{{detail.title}}</h1>
						</div>
					</div>

					<!-- Block contents here -->
					<div class="blocks">
						<SanityBlocks :blocks="blocks" />
					</div>

					<!-- gallery project -->
					<Gallery :detail="detail" @image-builder="imageUrlFor($event)"/>
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
	import {Gallery} from '@/components/Molecules'

	export default {
		props: ['detail', 'blocks'],
		components: {
			SanityBlocks,
			Gallery
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