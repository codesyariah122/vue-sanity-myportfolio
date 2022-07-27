<template>
	<div class="container">
		<div class="row justify-content-center no-gutters">
			<div class="col-md-12 col-sm-12 mt-5 col__header">
				<h2>Project</h2>
				<blockquote>Berikut beberapa project yang saya kerjakan di periode 2020 s/d 2022</blockquote>
			</div>
			<div v-for="project in projects" class="col-md-4 col__project">

				<br>
				<div class="game">
					<div class="rank">2</div>
					<div class="front">
						<img :src="`${imageUrlFor(project.mainImage.asset._ref)}`" alt="game">
						<h3 class="name">
							<div v-for="category in project.categories">
								{{categoryData(category._ref) ? categoryTitle : false}}
							</div>
						</h3>
						<div class="status">
							<p class="viewers">132.5k</p>
							<div class="streamers">
								<img src="https://randomuser.me/api/portraits/men/32.jpg" alt="">
							</div>
						</div>
					</div>
					<div class="back">
						<div class="streaming-info">
							<p class="game-stat">174.4k <span>Watching</span></p>
							<p class="game-stat">3,172<span>Streams</span></p>
						</div>
						<button class="btn">See more streams</button>
						<div class="streamers">
							<div class="streamer">
								<div class="icon">
									<img src="https://randomuser.me/api/portraits/men/32.jpg" alt="">
								</div>
								<p class="name">gamer 1</p>
								<p class="number">18k</p>
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

	export default{
		props: ['projects', 'categories'],
		data(){
			return{
				detail: {},
				img: '',
				categoryTitle: ''
			}
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

			categoryData(ref=''){
				const find = this.categories.find(d => d._id === ref)
				if(find){
					this.categoryTitle = find.title
					return true
				}
			}
		}
	}
</script>