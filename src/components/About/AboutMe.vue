<template>
	<div class="container">
		<div class="card__profile-about">
			<div v-for="person in persons" class="row no-gutters">
				<div class="col-lg-12 col-sm-12 col__profile">
					<div class="row justify-content-center">
						<div class="col-md-6 col-sm-6">
							<div class="box">
								<div class="card">
									<div class="imgBx">
										<img :src="`${imageUrlFor(person.image)}`" alt="images"/>
									</div>
									<div class="details">
										<h2>{{person.name}}<br>
											<span>
												{{
													person.image.alt}}
												</span>
											</h2>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-sm-6">
								<div class="card__profiles">
									<span v-html="person.bio[0].children[0].text"></span>
									<blockquote v-for="text in person.bio[1].children">
										<span v-if="text.text !== 'codesyariah122 Blog'">
											{{text.text}}
										</span>
										<span v-else>
											<a :href="person.bio[1].markDefs[0].href">
												{{text.text}}
											</a>
										</span>
									</blockquote>

									<span v-html="person.bio[2].children[0].text"></span>
									<br>
									<span v-html="person.bio[4].children[0].text"></span>

									<ul class="list-group mb-3">
										<div v-for="item in 9">
											<li v-if="item > 5" class="list-group-item" v-html="person.bio[item].children[0].text"></li>
										</div>
									</ul>

									<span v-html="person.bio[12].children[0].text"></span>

									<ul class="list-group mb-3">
										<div v-for="item in 21">
											<li v-if="item > 13" class="list-group-item" v-html="person.bio[item].children[0].text"></li>
										</div>
									</ul>

									<h5 class="mt-5">
										{{person.bio[24].children[0].text}}
									</h5>

									<h3 class="mt-5">
										{{person.bio[26].children[0].text}}
									</h3>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="card__project-about">
				<div v-for="project in projects" class="row no-gutters">
					<div class="col-lg-12 col-sm-12 col__profile">

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
			props: ['persons', 'projects'],
			data(){
				return{
					detail: {},
					img: ''
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
				}
			}
		}
	</script>

	<style lang="css">
		.box{
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
			width: 800px;
			grid-gap: 15px;
			margin: 0 auto;
			margin-left: -14.7rem;
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
			color: #f38695;
			display: block;
			margin-top: 5px;
		}
		@media (min-width: 992px) {
			.box{
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
				width: 1200px;
				grid-gap: 15px;
				margin: 0 auto;
				margin-left: -15rem;
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
				color: #f38695;
				display: block;
				margin-top: 5px;
			}
		}
	</style>