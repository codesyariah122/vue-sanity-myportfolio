<template>
	<div class="blog__view-detail">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-12 col-sm-12 mt-5">
					<div class="content text-white">
						<HeaderBlogDetail :detail="post" :artwork="mainImage"/>
						
					</div>

					<div class="card__blog-detail">
						<div class="block">
							<SanityBlocks :blocks="post.body" :serializers="serializers"/>
						</div>

						<div v-for="author in authors" class="container author__content">
							<div class="d-flex justify-content-center">
								<div class="col-md-3 col-sm-3">
									<img :src="imageUrlFor(author.image.asset)" class="author__image"/>
								</div>
								<div class="col-md-6 col-sm-6">
									<h5> {{author.name}} </h5>
									<h6> {{date(author.valuepublishedAt)}} </h6>
								</div>
							</div>
						</div>

						<div class="row justify-content-center mt-3">
							<div class="col-md-12 col-sm-12 mt-5 mb-5">
								<Comment :comments="comments"/>
							</div>

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
</template>

<script>
	import {onMounted, ref} from 'vue'
	import {useRoute} from "vue-router"
	import {HeaderBlogDetail, InlineImage, Comment} from '@/components'
	import sanity from '@/client'
	import imageUrlBuilder from '@sanity/image-url'
	const imageBuilder = imageUrlBuilder(sanity)
	import { SanityBlocks } from "sanity-blocks-vue-component"
	import moment from 'moment'

	export default {
		name: 'blog-detail',
		components:{
			HeaderBlogDetail,
			InlineImage,
			SanityBlocks,
			Comment
		},
		data(){
			return{
				serializers: {
					types: {
						image: InlineImage
					}
				},
			}
		},

		setup(){
			onMounted(() => {
				fetchPost()
			})

			let post = ref([])
			let blocks = ref([])
			let comments = ref([])
			let authors = ref([])
			let mainImage = ref('')
			
			let config = {
				loading: ref(null),
				error: ref(null)
			}

			const {
				params: {slug}
			} = useRoute()


			const query = {
				post: `*[slug.current == $slug] {
					_id,
					title,
					slug,
					author,
					excerpt,
					mainImage,
					categories,
					publishedAt,
					body,
					'comments': *[_type == "comment" && post._ref == ^._id && approved == true]{
						_id, 
						name, 
						email, 
						comment, 
						_createdAt
					},
					'author': *[_type == "author"] {
						_id,
						name,
						slug,
						image,
						bio
					}
				}[0]`
			}

			function fetchPost(){
				config.loading.value = true
				config.error.value = post.value = null 
				sanity.fetch(query.post, { slug: slug })
				.then((data) => {
					post.value = data
					blocks.value = data.body
					comments.value = data.comments
					authors.value = data.author
					mainImage.value = imageUrlFor(data.mainImage.asset)

					console.log(data.comments[0].comment)

					setTimeout(() => {
						config.loading.value = false
					}, 2500)

				}, (error) => {
					config.error.value = error
				})
			}

			function date(val){
				return moment(val).format("LL")
			}

			function imageUrlFor(source){
				return imageBuilder.image(source)
			}

			return {
				post,
				blocks,
				comments,
				authors,
				mainImage,
				config,
				imageUrlFor,
				date
			}
		}
	}
</script>