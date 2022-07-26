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