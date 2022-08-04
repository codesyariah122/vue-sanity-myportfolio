<template>
	<div class="row justify-content-center">
		<div class="col-md-8 col-sm-12">
			<div class="fond"> 
				<span class="s1">blog </span>
				<span class="s2">page</span>
			</div>

			<div v-for="post in posts" class="card__blog-content">
				<div class="thumbnail">
					<img class="left" :src="imageUrlFor(post.mainImage.asset)" />
				</div>
				<div class="right">
					<h1> {{post.title}} </h1>
					<div v-for="author in authors" class="author">
						<img v-if="post.author._id === author._ref" :src="imageUrlFor(author.image.asset)" />
						<h2>{{author.name}}</h2>
					</div>
					<div class="separator"></div>
					<p>
						{{post.excerpt[0].children[0].text}}
					</p>
				</div>
				<div class="links">	
					<router-link :to="`/blog/${post.slug.current}`">
						<i class="fas fa-arrow-right"></i>
					</router-link>
				</div>
				<h5>
					{{date(post.createdAt)}}
				</h5>
				<h6>{{month(post.createdAt)}}</h6>
			</div>

		</div>

		<div class="col-md-12 col-sm-12 footer__blog">
			<blockquote class="blockquote-footer">
				Selamat datang di blog {{persons.name}}, halaman blog ini akan berisi tulisan-tulisan dari saya yang akan saya tulis sendiri dengan mandiri, yang inshaallah akan saya isi dengan berbagai rubrik  menarik secara random dengan harapan dapat berbagi informasi menarik bagi kalian yang membutuhkan informasi/artikel, baik itu berupa rubrik informasi ilmiah, tips dan trik, tutorial, berita dan atau tulisan dengan rubrik apapun.
			</blockquote>

			<h4>Salaam ..</h4>
		</div>

	</div>
</template>

<script>
	import sanity from '@/client'

	import imageUrlBuilder from '@sanity/image-url'

	const imageBuilder = imageUrlBuilder(sanity)

	import moment from 'moment'


	export default {
		props: ['posts', 'authors', 'persons'],

		methods: {
			imageUrlFor(source){
				return imageBuilder.image(source)
			},

			date(val){
				const date = moment(val).format("L")
				
				// split string
				val = date.split('')
				
				return val[1]
			},

			month(val){
				const month = moment(val).format("LL")
				// split string
				const month_split = month.split(' ')

				return month_split[0]
			}
		}
	}
</script>

<style lang="scss" scoped>
	span.s1 {
		position: absolute;
		top: 51px;
		font-size: 6rem;
		font-weight: 800;
		text-transform: uppercase;
		color: $cardHoverBg;
		z-index: 1;
	}
	span.s2 {
		font-weight: 800;
		position: absolute;
		right: -.1px;
		font-size: 6rem;
		text-transform: uppercase;
		color: $cardBackground;
	}
	.card__blog-content {
		position: relative;
		margin: 115px auto;
		height: 55vh;
		background-color: $primaryBackground;
		-webkit-box-shadow: 10px 10px 93px 0px rgba(0,0,0,0.75);
		-moz-box-shadow: 10px 10px 93px 0px rgba(0,0,0,0.75);
		box-shadow: 10px 10px 93px 0px rgba(0,0,0,0.75);
		margin-left: -15px;

		.thumbnail {
			float: left;
			position: relative;
			left: 80px;
			top: -25px;
			height: 150px;
			width: 230px;
			-webkit-box-shadow: 10px 10px 60px 0px rgba(0,0,0,0.75);
			-moz-box-shadow: 10px 10px 60px 0px rgba(0,0,0,0.75);
			box-shadow: 10px 10px 60px 0px rgba(0,0,0,0.75);
			overflow: hidden;
		}
		img.left {
			position: absolute;
			left: 50%;
			top: 50%;
			height: auto;
			width: 100%;
			-webkit-transform: translate(-50%,-50%);
			-ms-transform: translate(-50%,-50%);
			transform: translate(-50%,-50%);
		}

		.right {
			margin-left: 90px;
			margin-right: 5px;

			h1 {
				padding-top: 0px;
				font-size: 1rem;
				color: $cardBackground;
				width: 100%;
				margin-left: .8rem;
				font-weight: 700;
			}
			.author {
				background-color: $secondNavBg;
				height: 35px;
				width: 165px;
				border-radius: 20px;
				margin-left: .5rem;

				img {
					padding-top: 5px;
					margin-left: 7px;
					float: left;
					height: 30px;
					width: 25px;
					border-radius: 50%;
				}

				h2 {
					padding-top: 8px;
					margin-right: 3px;
					text-align: center;
					font-size: 1rem;
					color: $black;
					font-weight: 600;
				}
			}

			.separator {
				margin-top: 10px;
				border: 1px solid $secondNavBg;;
			}
			p {
				text-align: justify;
				padding-top: 10px;
				font-size: 0.95rem;
				line-height: 150%;
				color: $cardBackground;
				width: 230px;
				margin-left:-4.5rem;
				display: -webkit-box;
				-webkit-line-clamp: var(--line-clamp, 2);
				-webkit-box-orient: vertical;
				word-break: var(--word-break, "none");
				overflow: hidden;
				hyphens: auto;
				text-align: var(--align, left);
				--is-single-line: 1 - Clamp(0, Calc(var(--line-clamp) - 1), var(--line-clamp));
				--delay: Calc(-1s * (var(--is-single-line, 1) - 1));
				animation: states 1s var(--delay) paused;
				@keyframes states {
					0% {
						word-break: break-all;
					}
				}
			}
		}

		h5 {
			position: absolute;
			left: 15px;
			bottom: 170px;
			font-size: 3rem;
			color: $secondNavBg;;
		}
		h6 {
			position: absolute;
			left: 18px;
			bottom: 160px;
			font-size: 1.3rem;
			color: $secondNavBg;;
		}

		ul {
			margin-left: 250px;
		}
		li {
			display: inline;
			list-style: none;
			padding-right: 40px;
			color: #7B7B7B;
		}
		.links{
			position: absolute;
			right: 50px;
			bottom: -35px;
			box-sizing: border-box;
			padding-top: 10px;
			background-color: #1875D0;
			width: 60px;
			height: 60px;
			text-align: center;
			border-radius: 50%;
			-webkit-box-shadow: 10px 10px 50px 0px rgba(0,0,0,0.75);
			-moz-box-shadow: 10px 10px 50px 0px rgba(0,0,0,0.75);
			box-shadow: 10px 10px 50px 0px rgba(0,0,0,0.75);
			a{
				color: $white;
				font-size: 2rem;
			}
		}
	}

	@media (min-width: 992px) {
		span.s1 {
			position: absolute;
			top: 51px;
			font-size: 14rem;
			font-weight: 800;
			text-transform: uppercase;
			color: $cardHoverBg;
			z-index: 1;
		}
		span.s2 {
			font-weight: 800;
			position: absolute;
			bottom: 0;
			right: 10px;
			font-size: 15rem;
			text-transform: uppercase;
			color: $cardBackground;
		}
		.card__blog-content {
			position: relative;
			margin: 289px 30px;
			height: 38vh;
			width: 100%;
			background-color: $primaryBackground;
			-webkit-box-shadow: 10px 10px 93px 0px rgba(0,0,0,0.75);
			-moz-box-shadow: 10px 10px 93px 0px rgba(0,0,0,0.75);
			box-shadow: 10px 10px 93px 0px rgba(0,0,0,0.75);
			margin-bottom: -10rem;

			.thumbnail {
				float: left;
				position: relative;
				left: 30px;
				top: -30px;
				height: 140px;
				width: 230px;
				-webkit-box-shadow: 10px 10px 60px 0px rgba(0,0,0,0.75);
				-moz-box-shadow: 10px 10px 60px 0px rgba(0,0,0,0.75);
				box-shadow: 10px 10px 60px 0px rgba(0,0,0,0.75);
				overflow: hidden;
			}
			img.left {
				position: absolute;
				left: 50%;
				top: 50%;
				height: auto;
				width: 100%;
				-webkit-transform: translate(-50%,-50%);
				-ms-transform: translate(-50%,-50%);
				transform: translate(-50%,-50%);
			}

			.right {
				margin-left: 90px;
				margin-right: 5px;

				h1 {
					padding-top: 15px;
					font-size: 1rem;
					color: $cardBackground;
					width: 50%;
					margin-left: 13rem;
					font-weight: 700;
				}
				.author {
					background-color: $secondNavBg;
					height: 35px;
					width: 155px;
					border-radius: 20px;
					margin-left: 13rem;

					img {
						padding-top: 5px;
						margin-left: 15px;
						float: left;
						height: 30px;
						width: 25px;
						border-radius: 50%;
					}

					h2 {
						padding-top: 8px;
						margin-right: 6px;
						text-align: center;
						font-size: 1rem;
						color: $white;
						font-weight: 500;
					}
				}

				.separator {
					margin-top: 10px;
					border: 1px solid $secondNavBg;
				}
				p {
					text-align: justify;
					padding-top: 21px;
					font-size: 0.95rem;
					line-height: 150%;
					color: $cardBackground;
					width: 300px;
					margin-left:8.5rem;
					text-indent: 3rem;
					display: -webkit-box;
					-webkit-line-clamp: var(--line-clamp, 4);
					-webkit-box-orient: vertical;
					word-break: var(--word-break, "none");
					overflow: hidden;
					hyphens: auto;
					text-align: var(--align, left);
					--is-single-line: 1 - Clamp(0, Calc(var(--line-clamp) - 1), var(--line-clamp));
					--delay: Calc(-1s * (var(--is-single-line, 1) - 1));
					animation: states 1s var(--delay) paused;
					@keyframes states {
						0% {
							word-break: break-all;
						}
					}
				}
			}

			h5 {
				position: absolute;
				left: 30px;
				bottom: 61px;
				font-size: 3rem;
				color: $secondNavBg;
			}
			h6 {
				position: absolute;
				left: 30px;
				bottom: 55px;
				font-size: 1rem;
				color: $secondNavBg;
			}

			ul {
				margin-left: 250px;
			}
			li {
				display: inline;
				list-style: none;
				padding-right: 40px;
				color: #7B7B7B;
			}
			.links{
				position: absolute;
				right: 50px;
				bottom: -40px;
				box-sizing: border-box;
				padding-top: 10px;
				background-color: #1875D0;
				width: 80px;
				height: 80px;
				text-align: center;
				border-radius: 50%;
				-webkit-box-shadow: 10px 10px 50px 0px rgba(0,0,0,0.75);
				-moz-box-shadow: 10px 10px 50px 0px rgba(0,0,0,0.75);
				box-shadow: 10px 10px 50px 0px rgba(0,0,0,0.75);
				a{
					color: $white;
					font-size: 3rem;
				}
			}
		}

		.footer__blog{
			margin-top: 17rem;
		}
	}
</style>