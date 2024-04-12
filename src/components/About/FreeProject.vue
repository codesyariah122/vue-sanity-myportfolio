<template>
	<div class="container">
		<div class="row justify-content-center no-gutters">
			<div class="col-md-12 col-sm-12 mt-5 col__header-about">
				<h2>Free Project</h2>
				<blockquote>Free project adalah list project yang saya kerjakan di luar project formal saya, dan ini biasanya saya lakukan dengan tujuan untuk belajar tools-tools atau teknik-teknik baru dalam dunia pemrogramman.</blockquote>
			</div>

			<div v-for="(indie, idx) in indies" class="col-md-4 col__project">
				<br>
				<div class="game" 
				@mouseenter="hover = true"
				@mouseleave="hover = false">
				<div class="rank">{{idx+=1}}</div>
				<div class="front">
					<img :src="`${imageUrlFor(indie.mainImage.asset)}`" alt="game">

					<h3 v-if="hover"  class="name text-capitalize">
						{{indie.title}}
					</h3>

					<div v-else v-for="cat in indie.categories">
						<div v-for="category in categories">
							<h3 class="name" v-if="cat._ref === category._id">
								{{category.title}}
							</h3>
						</div>
					</div>

					<div v-if="indie.members !== null" class="status">
						<p class="viewers">Members</p>
						<div class="streamers">
							<br>
							<div v-for="person in persons">
								<div v-for="member in indie.members">
									<img v-if="member.person._ref === person._id" :src="`${imageUrlFor(person.image)}`">
								</div>
							</div>
						</div>
					</div>

					<div v-else class="status">
						<p class="viewers">Members</p>
						<div class="streamers">
							<br>
							<div>
								<img :src="`${imageUrlFor(persons[3].aboutImage.asset)}`">
							</div>
						</div>
					</div>
				</div>
				<div class="back">
					<div v-for="excerpt in indie.excerpt" class="streaming-info">
						<p class="game-stat truncate">
							{{excerpt.children[0].text}}
						</p>
					</div>

					<button @click="$router.push({path: `/project/${indie.slug.current}`})" class="btn">See Detail</button>

					<div class="streamers">
						<div class="streamer">
							<img :src="`${imageUrlFor(persons[3].aboutImage.asset)}`">
							<p class="name">{{persons[3].image.alt === "Puji" ? "Me" : person.image.alt}}</p>
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
		props: ['indies',  'persons'],
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