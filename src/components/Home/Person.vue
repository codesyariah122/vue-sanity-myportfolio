<template>
	<div class="container">
		<div v-for="person in persons" class="card">
			<div class="card-header">
				<div class="avatar">
					<div class="user-online-indicator"></div>
					<picture>
						<source :srcset="imageUrlFor(person.image)" media="(min-width:1000px)">
						<source :srcset="imageUrlFor(person.image)" media="(min-width:750px)">
							<a :href="imageUrlFor(person.image)" target="_blank">
								<img :src="imageUrlFor(person.image)" :alt="person.name" class="image__profile">
							</a>
					</picture>
				</div>
				<div class="profile-name"><h1>{{person.name}}</h1></div>
				<div class="profile-role">{{person.image.caption}}</div>
			</div>

			<div class="card-footer">
				<div class="social-buttons">
					<button>
						<i class="fab fa-instagram"></i>
					</button>

					<button>
						<i class="fab fa-linkedin"></i>
					</button>

					<button>
						<i class="fab fa-fw fa-lg fa-github"></i> 
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import sanity from '@/client'

	import imageUrlBuilder from '@sanity/image-url'

	const imageBuilder = imageUrlBuilder(sanity)

	export default{
		props: ['persons', 'image'],

		data(){
			return {
				avatar: ''
			}
		},

		mounted(){
			this.ProfileAvatar(),
			this.gsapSetting()
		},

		methods: {
			imageUrlFor(source){
				return imageBuilder.image(source)
			},


			ProfileAvatar(){
				this.persons.map(d => {
					this.avatar = this.imageUrlFor(d.image)
				})
			},

			gsapSetting(){
				let tl = gsap.timeline();

				console.log("New");

				tl.from(".card", {
					stagger: 0.2,
					opacity: 0,
					x: -20,
				});

				tl.from(".avatar img", {
					stagger: 0.2,
					opacity: 0,
					y: 20,
				});

				tl.from(".user-online-indicator",{
					stagger: 0.2,
					opacity: 0,
					y: 20,
				})
				tl.from(".profile-name",{
					stagger: 0.2,
					opacity: 0,
					y: 20,
				})
				tl.from(".profile-role",{
					stagger: 0.2,
					opacity: 0,
					y: 20,
				})

				tl.from(".social-buttons",{
					stagger: 0.2,
					opacity: 0,
				})
			}
		}
	}
</script>

