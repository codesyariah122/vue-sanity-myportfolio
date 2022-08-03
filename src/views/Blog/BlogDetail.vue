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
								<Comment :comments="comments" :_id="_id" @update-comment="updateComment" :config="config"/>
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
	import {onMounted,reactive, ref} from 'vue'
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
			let _id = ref('')
			let loading = ref(null)
			
			let config = reactive({
				loading: null,
				error: null
			})

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
					'comments': *[_type == "comment" && post._ref == ^._id && approved == true] | order(_createdAt desc){
						_id, 
						name,
						approved,
						email, 
						comment, 
						_createdAt,
						post
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

			const listen = {
				comment: `*[slug.current == $slug] {
					_id,
					title,
					slug,
					author,
					excerpt,
					mainImage,
					categories,
					publishedAt,
					body,
					'comments': *[_type == "comment" && post._ref == ^._id] | order(_createdAt desc){
						_id, 
						name,
						approved,
						email, 
						comment, 
						_createdAt,
						post
					}
				}[0]`
			}

			function fetchPost(){
				config.loading = true
				config.error = post.value = [] 
				config.error = comments.value = []
				sanity.fetch(query.post, { slug: slug })
				.then((data) => {
					post.value = data
					blocks.value = data.body
					authors.value = data.author
					mainImage.value = imageUrlFor(data.mainImage.asset)
					_id.value = data._id
					comments.value = data.comments

					setTimeout(() => {
						config.loading = false
					}, 2500)

				}, (error) => {
					config.error = error
				})
			}

			function updateComment(){
				config.loading = true
				config.error = comments.value = null
				sanity.fetch(listen.comment, { slug: slug })
				.then(update => {
					setTimeout(() => {
						comments.value = update.comments
						config.loading = false
					}, 5500)
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
				_id,
				date,
				updateComment
			}
		}
	}
</script>