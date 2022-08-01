<template>
	<div class="blog__view-detail">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-12 col-sm-12">
					<div class="content">
						<HeaderBlogDetail :detail="detail" :artwork="imageUrlFor(detail.mainImage.asset)"/>
					</div>
					<div class="card__blog-detail">
						<div class="block">
							<SanityBlocks :blocks="blocks" :serializers="serializers"/>
						</div>

						<div v-for="author in authors">
							<div v-if="author._id === detail.author._ref" class="container author__content">
								<div class="d-flex justify-content-beetween">
									<div class="col-md-3 col-sm-3">
										<img :src="imageUrlFor(author.image.asset)" class="author__image"/>
									</div>
									<div class="col-md-6 col-sm-6">
										<h5> {{author.name}} </h5>
										<h6> {{date(author.publishedAt)}} </h6>
									</div>
								</div>
								<div class="row justify-content-center mt-3">
									<div class="col-md-12">
										<a href="/blog" class="btn btn-link btn-md">
											<i class="fas fa-arrow-left"></i> Kembali ke blog
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {HeaderBlogDetail, InlineImage} from '@/components'
	import sanity from '@/client'
	import imageUrlBuilder from '@sanity/image-url'
	const imageBuilder = imageUrlBuilder(sanity)
	import { SanityBlocks } from "sanity-blocks-vue-component"
	import moment from 'moment'

	const author = `*[_type == "author"] {
		_id,
		name,
		slug,
		image,
		bio
	}`

	const post = `*[slug.current == $slug] {
		_id,
		title,
		slug,
		author,
		excerpt,
		mainImage,
		categories,
		publishedAt,
		body
	}[0]`

	export default {
		name: 'blog-detail',
		components:{
			HeaderBlogDetail,
			InlineImage,
			SanityBlocks
		},
		data(){
			return {
				slug: this.$route.params.slug,
				detail: {},
				blocks: [],
				authors: [],
				error: null,
				loading: true,
				serializers: {
					types: {
						image: InlineImage
					}
				}
			}
		},

		created(){
			this.authorData(),
			this.detailPost()
		},

		methods: {
			date(val){
				return moment(val).format("LL")
			},

			imageUrlFor(source){
				return imageBuilder.image(source)
			},

			authorData() {
				this.loading = true
				this.error = this.authors = null
				sanity.fetch(author)
				.then((authors) => {
					this.authors = authors
					setTimeout(() => {
						this.loading = false
					}, 1000)
				}, (error) => {
					this.error = error
				})
			},
			detailPost(){
				this.loading = true
				this.error = this.detail = null
				sanity.fetch(post, { slug: this.slug })
				.then((detail) => {
					this.detail = detail
					this.blocks = detail.body
					setTimeout(() => {
						this.loading = false
					}, 2500)
				}, (error) => {
					this.error = error
				})
			}
		}
	}
</script>