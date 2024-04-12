<template>
	<div class="container">

		<div class="row justify-content-center">
			<div class="col-lg-12 col-sm-12 col__header">
				<h3>Project Galleries :</h3>
				<blockquote class="mt-2 blockquote-footer">
					Sedikit dokumentasi hasil kerja saya sebagai : <strong class="text-capitalize"> {{detail.title}} </strong>
				</blockquote>
			</div>

			<div class="col-lg-12 col-sm-12 gallery__content text-white">
				<div class="container">
					<div class="grid-container">
						<div v-for="image in detail.imagesGallery" class="grid-wrapper">
							<img class='grid-item grid-item-1' :src='`${imageUrlFor(image.asset)}`' alt=''>
							<h5>{{image.caption}}</h5>
							<p>"{{image.alt}}"</p>
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
	import VueGallerySlideshow from 'vue-gallery-slideshow';

	export default{
		props: ['detail'],

		components: {
			VueGallerySlideshow
		},

		data(){
			return {
				detail_img: null,
				open: null,
				index: null,
				gallery_url: process.env.VUE_GALLERY_URL,
				images: []
			}
		},

		beforeMounted(){
			this.setUpGallery()
		},

		methods: {
			imageUrlFor(source){
				return imageBuilder.image(source);
			},

			setUpGallery(){
				this.detail.imagesGallery.map(d => {
					this.images.push({
						url: `${this.gallery_url}${d.asset}`,
						alt: d.caption
					})
				})
			}

		}
	}
</script>