<template>
	<div class="container card__profile-home">
		<div v-for="person in persons" class="row no-gutters">
			<div class="col-md-4 col-lg-4">
				<picture>
					<source :srcset="imageUrlFor(person.image)" media="(min-width:1000px)">
					<source :srcset="imageUrlFor(person.image)" media="(min-width:750px)">
						<a :href="imageUrlFor(person.image)" target="_blank">
							<img :src="imageUrlFor(person.image)" :alt="person.name" class="image__profile">
						</a>
				</picture>
			</div>
			<div class="col-md-8 col-lg-8">
				<div class="d-flex flex-column">
					<div class="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
						<h3 class="display-5">
							{{person.name}}
						</h3>
						<div class="social__link">
							<ul class="list-group list-group-horizontal">
								<li class="list-group-item">
									<a :href="`mailto:${person.contactInfo.email}`" target="_blank">
										<i class="far fa-fw fa-lg fa-envelope-open text-warning"></i>
									</a>
								</li>
								<li class="list-group-item">
									<a :href="`https://www.linkedin.com/in/${person.contactInfo.linkedin}`" target="_blank">
										<i class="fab fa-fw fa-lg fa-linkedin text-primary"></i>
									</a>
								</li>
								<li class="list-group-item">
									<a :href="`https://twitter.com/${person.contactInfo.linkedin}`" target="_blank">
										<i class="fab fa-fw fa-lg fa-twitter text-info"></i>
									</a>
								</li>
								<li class="list-group-item">
									<a :href="`https://web.whatsapp.com/send?phone=${person.contactInfo.phone}&text&app_absent=0`" target="_blank">
										<i class="fab fa-fw fa-lg fa-whatsapp text-success"></i>
									</a>
								</li>
								<li class="list-group-item">
									<a :href="`https://github.com/${person.contactInfo.github}`">
										<i class="fab fa-fw fa-lg fa-github text-white"></i>
									</a>
								</li>
							</ul>
						</div>
					</div>
					
					<div class="p-3 bg-black text-white">
						<h6>{{person.jobdesk}}</h6>
					</div>

					<div class="d-flex flex-row text-white">
						<div class="p-4 bg-primary text-center skill-block">
							<h4>90%</h4>
							<h6>Bootstrap</h6>
						</div>
						<div class="p-3 bg-success text-center skill-block">
							<h4>70%</h4>
							<h6>Jquery</h6>
						</div>
						<div class="p-3 bg-warning text-center skill-block">
							<h4>80%</h4>
							<h6>HTML</h6>
						</div>
						<div class="p-3 bg-danger text-center skill-block">
							<h4>75%</h4>
							<h6>PHP</h6>
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

	export default{
		props: ['persons', 'image', 'skills'],

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

