<template>
	<div class="detail__project-view">
		

		<div class="container">
			<!-- For Blocks -->
			<div class="card__project-detail">
				<Detail :detail="detail" :blocks="blocks"/>
			</div>
		</div>
	</div>
</template>

<script>
	import sanity from '@/client'
	import {Loading, Detail} from '@/components'

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

		data(){
			return {
				slug: this.$route.params.slug,
				persons: [],
				detail: [],
				blocks: [],
				error: null,
				loading: true
			}
		},

		components:{
			Loading,
			Detail
		},

		mounted(){
			this.personData(),
			this.DetailProject()
		},

		methods: {
			personData() {
				this.loading = true
				this.error = this.persons = null
				sanity.fetch(person)
				.then((persons) => {
					console.log(persons)
					this.persons = persons
					setTimeout(() => {
						this.loading = false
					}, 2500)
				}, (error) => {
					this.error = error
				})
			},
			DetailProject(){
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