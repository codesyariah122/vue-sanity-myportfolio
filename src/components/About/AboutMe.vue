<template>
	<div class="container">
		<div class="row no-gutters">
			<div class="col-lg-12 col-sm-12 col__profile">
				<div class="row justify-content-center">
					<div class="col-md-6 col-sm-6">
						<div class="box">
							<div class="card">
								<div class="imgBx">
									<img :src="`${imageUrlFor(persons[5].aboutImage)}`" alt="images"/>
								</div>
								<div class="details">
									<h2>{{persons[5].name}}<br>
										<span>
											{{persons[5].aboutImage.caption}}
										</span>
									</h2>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-6 col-sm-6">
						<div class="card__profiles">
							<h3> {{persons[5].bio[0].children[0].text}} </h3>
							<br>
							<blockquote class="blockquote-footer text-italic">
								{{persons[5].bio[2].children[0].text}} ...
							</blockquote>
							<blockquote v-for="text in persons[5].bio[3].children">
								<span v-if="text.text !== 'codesyariah122 Blog'">
									{{text.text}}
								</span>
								<span v-else>
									<a :href="persons[5].bio[3].markDefs[0].href" target="_blank">
										{{text.text}}
									</a>
								</span>
							</blockquote>
						</div>
						<div>
							<a href="https://github.com/codesyariah122/codesyariah122/blob/main/pujiermanto-cv.pdf" target="_blank" class="btn btn-success btn-sm rounded-pill btn-block text-white btn__detail mt-2 p-2">Download My New CV</a>
						</div>
					</div>

					<div class="col-md-12 col-sm-12" :style="`${$isMobile() ? '' :'margin-left: 21rem; margin-top: 2.5rem;'}`">
						<div class="card__profiles-col2">
							<span v-html="persons[5].bio[4].children[0].text"></span>
							<br>
							<span>
								{{persons[5].bio[6].children[0].text}}
							</span>

							<ul class="list-group mb-3">
								<div v-for="item in 11">
									<li v-if="item > 7" class="list-group-item" v-html="persons[5].bio[item].children[0].text"></li>
								</div>
							</ul>

							<br>

							<span v-html="persons[5].bio[14].children[0].text"></span>

							<ul class="list-group mb-3">
								<div v-for="item in 24">
									<li v-if="item > 15" class="list-group-item" v-html="persons[5].bio[item].children[0].text"></li>
								</div>
							</ul>



							<h5 class="mt-5">
								{{persons[5].bio[27].children[0].text}}
							</h5>

							<blockquote class="blockquote-footer mt-5">
								{{persons[5].aboutImage.alt}}
							</blockquote>
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

	import moment from 'moment'


	export default {
		props: ['persons'],
		data(){
			return{
				detail: {},
				img: ''
			}
		},

		mounted(){
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

			gsapSetting() {
				let tl = gsap.timeline();

				console.log("Puji Was Here");

				tl.from(".col__profile", {
					stagger: 0.2,
					opacity: 0,
					x: -20,
				})

				tl.from(".box", {
					stagger: 0.2,
					opacity: 0,
					x: -50
				})

				tl.from(".card", {
					stagger: 0.2,
					opacity: 0,
					x: 50
				})

				tl.from(".imgBx", {
					stagger: 0.7,
					opacity: 0,
					y: 20
				})
				tl.from(".card__profiles", {
					stagger: 0.2,
					opacity: 0,
					y: 20
				})
				tl.from(".blockquote-footer", {
					stagger: 0.2,
					opacity: 0,
					x: -25,
				})
				tl.from(".list-group", {
					stagger: 0.2,
					opacity: 0,
					y: 20,
				})
			}
		}
	}
</script>

<style lang="css">
	.box{
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		width: 100px;
		grid-gap: 15px;
		margin: 0 auto;
		margin-left: -1rem;
		margin-bottom: 2rem;
	}
	.card{
		position: relative;
		width: 200px;
		height: 250px;
		background: #fff;
		margin: 0 auto;
		border-radius: 4px;
		box-shadow:0 2px 10px rgba(0,0,0,.2);
	}
	.card:before,
	.card:after
	{
		content:"";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 4px;
		background: #fff;
		transition: 0.5s;
		z-index:0;
	}
	.card:hover:before{
		transform: rotate(20deg);
		box-shadow: 0 2px 20px rgba(0,0,0,.2);
	}
	.card:hover:after{
		transform: rotate(10deg);
		box-shadow: 0 2px 20px rgba(0,0,0,.2);
	}
	.card .imgBx{
		position: absolute;
		top: 10px;
		left: 10px;
		bottom: 10px;
		right: 10px;
		background: #222;
		transition: 0.5s;
		z-index: 9999;
	}

	.card:hover .imgBx
	{
		bottom: 80px;
	}

	.card .imgBx img{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.card:hover .details{
		margin-left: -2rem;
		transform: rotate(5deg);
	}

	.card .details{
		position: absolute;
		left: 10px;
		right: 10px;
		bottom: 10px;
		height: 60px;
		text-align: center;
		z-index: 1;
	}

	.card .details h2{
		margin: 0;
		padding: 0;
		font-weight: 600;
		font-size: 16px;
		color: #777;
		text-transform: uppercase;
	} 

	.card .details h2 span{
		font-weight: 500;
		font-size: 11px;
		display: block;
		margin-top: 5px;
		color: coral;
	}

	@media (min-width: 992px) {
		.box{
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
			width: 1200px;
			grid-gap: 15px;
			margin: 0 auto;
			margin-left: -14rem;
		}
		.card{
			position: relative;
			width: 300px;
			height: 350px;
			background: #fff;
			margin: 0 auto;
			border-radius: 4px;
			box-shadow:0 2px 10px rgba(0,0,0,.2);
		}
		.card:before,
		.card:after
		{
			content:"";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 4px;
			background: #fff;
			transition: 0.5s;
			z-index:0;
		}
		.card:hover:before{
			transform: rotate(20deg);
			box-shadow: 0 2px 20px rgba(0,0,0,.2);
		}
		.card:hover:after{
			transform: rotate(10deg);
			box-shadow: 0 2px 20px rgba(0,0,0,.2);
		}
		.card .imgBx{
			position: absolute;
			top: 10px;
			left: 10px;
			bottom: 10px;
			right: 10px;
			background: #222;
			transition: 0.5s;
			z-index: 9999;
		}

		.card:hover .imgBx
		{
			bottom: 80px;
		}

		.card .imgBx img{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.card:hover .details{
			margin-left: -2rem;
			transform: rotate(5deg);
		}

		.card .details{
			position: absolute;
			left: 10px;
			right: 10px;
			bottom: 10px;
			height: 60px;
			text-align: center;
			z-index: 1;
		}

		.card .details h2{
			margin: 0;
			padding: 0;
			font-weight: 600;
			font-size: 20px;
			color: #777;
			text-transform: uppercase;
		} 

		.card .details h2 span{
			font-weight: 500;
			font-size: 16px;
			display: block;
			margin-top: 5px;
			color: coral;
		}
	}
</style>