<template>
	<div class="container">
		<div class="row justify-content-center">
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
						<SanityBlocks :blocks="blocks" :serializers="serializers"/>
					</div>

					<!-- gallery project -->
					<Gallery v-if="detail.imagesGallery" :detail="detail" @image-builder="imageUrlFor($event)"/>

					<div v-else class="row justify-content-center no-gallery">
						<div class="col-lg-12 col-sm-12">
							<div class="text-center alert alert-primary d-flex align-items-center" role="alert">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
									<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
								</svg>
								<div>
									Gallery project belum ada !
								</div>
							</div>
						</div>
					</div>

					<div v-if="detail.linksVideo" class="row justify-content-center no-gallery">
						<div v-for="(link, idx) in detail.linksVideo" :key="idx" class="col-lg-12 col-sm-12 mb-4">
							<div class="embed-responsive embed-responsive-16by9">
								<iframe class="embed-responsive-item" :src="`${link}`" allowfullscreen></iframe>
							</div>
						</div>
					</div>
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
		props: ['detail', 'blocks', 'serializers'],
		components: {
			SanityBlocks,
			Gallery
		},

		methods: {
			imageUrlFor(source) {
				return imageBuilder.image(source);
			}
		}
	}
</script>