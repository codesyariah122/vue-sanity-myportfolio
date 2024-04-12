<template>
	<div class="container">
		<div class="row justify-content-center no-gutters">
			<div class="col-md-12 col-sm-12 mt-5 col__header-about">
				<h2>Formal Project</h2>
				<blockquote>Berikut beberapa project yang saya kerjakan di periode 2020 s/d 2022</blockquote>
			</div>
			
			<div v-for="(project, idx) in projects" class="col-md-4 col__project">
				<br>
				<div class="game" 
					@mouseenter="hover = true"
					@mouseleave="hover = false">
				<div class="rank">{{idx+=1}}</div>
				<div class="front">
					<img :src="`${imageUrlFor(project.mainImage.asset)}`" alt="game">

					<h3 v-if="hover"  class="name text-capitalize">
						{{project.title}}
					</h3>

					<div v-else v-for="cat in project.categories">
						<div v-for="category in categories">
							<h3 class="name" v-if="cat._ref === category._id">
								{{category.title}}
							</h3>
						</div>
					</div>

					<div v-if="project.members !== null" class="status">
						<p class="viewers">Members</p>
						<div class="streamers">
							<br>
							<div v-for="person in persons">
								<div v-for="member in project.members">
									<img v-if="member.person._ref === person._id" :src="`${imageUrlFor(person.image)}`">
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="back">
					<div v-for="excerpt in project.excerpt" class="streaming-info">
						<p class="game-stat truncate">
							{{excerpt.children[0].text}}
						</p>
					</div>

					<button @click="$router.push({path: `/project/${project.slug.current}`})" class="btn">See Detail</button>

					<div v-if="project.members !== null" class="streamers">
						<div v-for="person in persons" class="streamer">
							<div v-for="member in project.members">
								<img v-if="member.person._ref === person._id" :src="`${imageUrlFor(person.image)}`">
								<p v-if="member.person._ref === person._id" class="name">{{person.image.alt === "Puji" ? "Me" : person.image.alt}}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="backgroundWrapper"></div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import sanity from '@/client'

	import imageUrlBuilder from '@sanity/image-url'

	const imageBuilder = imageUrlBuilder(sanity)

	import moment from 'moment'

	const category = `*[_type == "category"]{
		_id,
		title,
		description
	}[0...50]`


	export default{
		props: ['projects',  'persons'],
		data(){
			return{
				detail: {},
				img: '',
				error: null,
				categories: [],
				categoryTitle: '',
				hover: false
			}
		},

		mounted(){
			this.setupCategory(),
			this.gsapSetting()
		},

		methods: {
			imageUrlFor(source){
				return imageBuilder.image(source)
			},

			showDetail(data, img){
				this.detail = data
				this.img = this.imageUrlFor(img)
			},

			date(val){
				return moment(val).format("LL")
			},

			setupCategory() {
				this.error = this.categories = null
				sanity.fetch(category)
				.then((categories) => {
					this.categories = categories
				}, (err) => {
					this.error = err
				})
			},

			gsapSetting() {
				let tl = gsap.timeline();

				console.log("Puji Was Here");
				setTimeout(() => {
					tl.from(".col__header-about", {
						stagger: 0.2,
						opacity: 0,
						x: -20,
					})

					tl.from(".col__project", {
						stagger: 0.2,
						opacity: 0,
						x: -50
					})
				}, 3000)
			}
		}
	}
</script>