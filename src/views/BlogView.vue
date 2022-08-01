<template>
	<div class="blog__view">
		<div class="container">
			<div class="card__blog">
				<BlogCard :posts="posts" :authors="authors" :persons="persons"/>
			</div>
		</div>
	</div>
</template>

<script>
	import {BlogCard} from '@/components'

	import sanity from '@/client'

	const person = `*[_type == "person"] {
		_id,
		name,
		slug,
		jobdesk,
		contactInfo,
		image,
		aboutImage,
		excerpt,
		bio
	}[3]`

	const author = `*[_type == "author"] {
		_id,
		name,
		slug,
		image,
		bio
	}`

	const post = `*[_type == "post"] {
		_id,
		title,
		slug,
		author,
		excerpt,
		mainImage,
		categories,
		publishedAt,
		body
	}`

	export default{
		name: 'blog',
		components: {
			BlogCard
		},

		data(){
			return {
				error: null,
				posts: [],
				authors: [],
				persons: [],
				loading: null
			}
		},

		mounted(){
			this.authorData(),
			this.listBlog(),
			this.personData()
		},

		methods: {
			personData() {
				this.loading = true
				this.error = this.persons = null
				sanity.fetch(person)
				.then((persons) => {
					this.persons = persons
					setTimeout(() => {
						this.loading = false
					}, 1000)
				}, (error) => {
					this.error = error
				})
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
			listBlog(){
				this.loading = true
				this.error = this.posts = null
				sanity.fetch(post)
				.then((posts) => {
					this.posts = posts
					setTimeout(() => {
						this.loading = false
					}, 1500)
				}, (err) => {
					this.error = err
				})
			}
		}
	}
</script>	