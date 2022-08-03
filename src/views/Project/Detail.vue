<template>
	<div class="detail__project-view">
		<div v-if="loading" class="container loader__page">
			<Loading :persons="persons"/>
		</div>

		<div v-else class="container">
			<!-- For Blocks -->
			<div class="card__project-detail">
				<Detail :detail="detail" :blocks="blocks" :serializers="serializers"/>
			</div>
		</div>
	</div>
</template>

<script>
	import sanity from '@/client'
	import {Loading, Detail, InlineImage} from '@/components'

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

	const project = `*[slug.current == $slug] {
		_id,
		title,
		slug,
		categories,
		members,
		startedAt,
		endedAt,
		mainImage,
		imagesGallery,
		excerpt,
		body
	}[0]`

	export default{
		name: 'detail-project',
		components:{
			Loading,
			Detail,
			InlineImage
		},
		data(){
			return {
				slug: this.$route.params.slug,
				persons: [],
				detail: [],
				blocks: [],
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
			this.personData(),
			this.detailProject()
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
					}, 2500)
				}, (error) => {
					this.error = error
				})
			},
			detailProject(){
				this.loading = true
				this.error = this.detail = null
				sanity.fetch(project, { slug: this.slug })
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