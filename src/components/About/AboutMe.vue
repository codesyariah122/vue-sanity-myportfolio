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
							<div v-for="bio in person.bio" class="card__profiles">
								<article v-html="bio.children[0].text">
								</article>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="card__project-about">
			<div v-for="project in projects" class="row no-gutters">
				<div class="col-lg-12 col-sm-12 col__profile">
					<div class="card__project">
						<div class="card__image-container">
							<img class="card__image" src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2126&q=80" alt="">
						</div>

						<svg class="card__svg" viewBox="0 0 800 500">

							<path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333"/>
							<path class="card__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent"/>
						</svg>

						<div class="card__content">
							<h1 class="card__title">Lorem ipsum</h1>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta dolor praesentium at quod autem omnis, amet eaque unde perspiciatis adipisci possimus quam facere illo et quisquam quia earum nesciunt porro.</p>
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
		z-index:-1;
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
		z-index: 1;
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

	.card .details{
		position: absolute;
		left: 10px;
		right: 10px;
		bottom: 10px;
		height: 60px;
		text-align: center;
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
</style>