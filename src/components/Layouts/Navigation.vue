<template>
	<div>
		<nav class="navbar navbar-expand-lg fixed-top navbar-dark nav-bg">
			<div class="container-fluid">

				<router-link v-if="show" to="/" class="navbar-brand">
					<img :src="require('@/assets/logo.png')" height="50" alt="CoolBrand">
				</router-link>
				<button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarCollapse">
					<ul class="navbar-nav me-auto mb-2 mb-md-0 mx-auto">
						<li class="nav-item">
							<router-link to="/">Home</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/about">About</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/blog">Blog</router-link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</div>
</template>


<script>
	export default{
		data(){
			return {
				show: null
			}
		},

		mounted(){
			this.bodyScroll()
		},

		methods: {
			bodyScroll(){
				if(this.$isMobile()){
					document.addEventListener('scroll', (e) => {
						const scroll = window.scrollY
						if(scroll > 100){
							this.show = true
							document.querySelector('.navbar').classList.add("scrolled", "bg-second")
						}else{
							this.show = false
							document.querySelector('.navbar').classList.remove("scrolled", "bg-second")
						}
					})
				}else{
					document.addEventListener('scroll', (e) => {
						const scroll = window.scrollY
						if(scroll > 100){
							document.querySelector('.navbar').classList.add("scrolled", "bg-second")
						}else{
							document.querySelector('.navbar').classList.remove("scrolled", "bg-second")
						}
					})
				}
			}
		}
	}
</script>