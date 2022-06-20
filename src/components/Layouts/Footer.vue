<template>
	<div>
		<div class="footer">
			<div class="bubbles">
				<div v-for="n in 128" class="bubble" :style="`--size:${2+Math.random()*4}rem; --distance:${6+Math.random()*4}rem; --position:${-5+Math.random()*110}%; --time:${2+Math.random()*2}s; --delay:${-1*(2+Math.random()*2)}s;`"></div>
			</div>
			<div class="content">
				<div>
					<div><b>Codesyariah122</b><a href="https://github.com/codesyariah122">Github</a><a href="https://codesyariah122.github.io">Blog</a><a href="#">Youtube</a></div>
				</div>
				<div :style="`${$isMobile() ? 'margin-top: 8rem;' : ''}`">
					<a class="image" href="@/assets/logo.png" target="_blank">
						<img src="@/assets/logo.png" width="70">
					</a>
					<p>©{{year}} codesyariah122</p>
				</div>
			</div>
		</div>
		<svg style="position:fixed; top:100vh">
			<defs>
				<filter id="blob">
					<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
					<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="blob"></feColorMatrix>
					<!--feComposite(in="SourceGraphic" in2="blob" operator="atop") //After reviewing this after years I can't remember why I added this but it isn't necessary for the blob effect-->
				</filter>
			</defs>
		</svg>
	</div>
</template>

<script>
	import moment from 'moment'
	import Logo from '@/assets/logo.png'

	export default{
		data(){
			return {
				year: null
			}
		},
		mounted(){
			this.getYear()
		},
		methods: {
			getYear(){
				const d = new Date()
				this.year = d.getFullYear()
				// console.log(moment.format("LLLL"))
			}
		}
	}
</script>

<style lang="scss">
	.footer {
		margin-top: 1rem;
		z-index: 1;
		--footer-background:crimson;
		display:grid;
		position: relative;
		grid-area: footer;
		min-height:11rem;
		.bubbles {
			position: absolute;
			top:0;
			left:0;
			right:0;
			height:1rem;
			background:var(--footer-background);
			filter:url("#blob");
			.bubble {
				position: absolute;
				left:var(--position, 50%);
				background:var(--footer-background);
				border-radius:100%;
				animation:bubble-size var(--time, 4s) ease-in infinite var(--delay, 0s),
				bubble-move var(--time, 4s) ease-in infinite var(--delay, 0s);
				transform:translate(-50%, 100%);
				margin-left: -6rem;
			}
		}
		.content {
			width: 100%!important;
			z-index: 2;
			display:grid;
			grid-template-columns: 1fr auto;
			grid-gap: 1rem;
			padding: 1rem;
			background:var(--footer-background);
			a, p {
				color:#F5F7FA;
				text-decoration:none;
			}
			b {
				color:white;
			}
			p {
				margin:0;
				font-size:.75rem;
			}
			>div {
				display:flex;
				flex-direction: column;
				justify-content: center;
				>div {
					flex-direction:column;
					justify-content: center;
					width: 120px;
					margin:0.25rem 0;
					>* {
						padding: 8px;
						margin-right:.5rem;
					}
				}
				.image {
					align-self: center;
					width:4rem;
					height:4rem;
					margin:0.25rem 0;
					background-size: cover;
					background-position: center;
				}
			}
		}
	}

	@keyframes bubble-size {
		0%, 75% {
			width:var(--size, 4rem);
			height:var(--size, 4rem);
		}
		100% {
			width:0rem;
			height:0rem;
		}
	}
	@keyframes bubble-move {
		0% {
			bottom:-4rem;
		}
		100% {
			bottom:var(--distance, 10rem);
		}
	}
	@media (min-width: 1200px) {
		.footer {
			margin-top: 1rem;
			z-index: 1;
			--footer-background:crimson;
			display:grid;
			position: relative;
			grid-area: footer;
			min-height:12rem;
			.bubbles {
				position: absolute;
				top:0;
				left:0;
				right:0;
				height:1rem;
				background:var(--footer-background);
				filter:url("#blob");
				.bubble {
					position: absolute;
					left:var(--position, 50%);
					background:var(--footer-background);
					border-radius:100%;
					animation:bubble-size var(--time, 4s) ease-in infinite var(--delay, 0s),
					bubble-move var(--time, 4s) ease-in infinite var(--delay, 0s);
					transform:translate(-50%, 100%);
				}
			}
			.content {
				z-index: 2;
				display:grid;
				grid-template-columns: 1fr auto;
				grid-gap: 4rem;
				padding:2rem;
				background:var(--footer-background);
				a, p {
					color:#F5F7FA;
					text-decoration:none;
				}
				b {
					color:white;
				}
				p {
					margin:0;
					font-size:.75rem;
				}
				>div {
					display:flex;
					flex-direction:column;
					justify-content: center;
					>div {
						margin:0.25rem 0;
						>* {
							margin-right:.5rem;
						}
					}
					.image {
						align-self: center;
						width:4rem;
						height:4rem;
						margin:0.25rem 0;
						background-size: cover;
						background-position: center;
					}
				}
			}
		}

		@keyframes bubble-size {
			0%, 75% {
				width:var(--size, 4rem);
				height:var(--size, 4rem);
			}
			100% {
				width:0rem;
				height:0rem;
			}
		}
		@keyframes bubble-move {
			0% {
				bottom:-4rem;
			}
			100% {
				bottom:var(--distance, 10rem);
			}
		}

	}
</style>