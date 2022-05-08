<template>
	<div>
		<div class="row justify-content-center mt-5">
			<div class="col-lg-12">

				<div class="row">
					<div v-for="project in projects" class="col-md-4">
						<div class="card" style="width: 18rem;">
							<img :src="imageUrlFor(project.mainImage)" class="card-img-top" alt="...">
							<div class="card-body">
								<h5 class="card-title">
									{{project.title}}
								</h5>
								<p class="card-text truncate">
									{{project.excerpt[0].children[0].text}} ...
								</p>
								<div class="d-grid gap-2 mt-2">
									<a href="#" class="btn btn-primary btn-block rounded-pill">Detail</a>
								</div>
							</div>
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

	export default {
		props: ['projects'],
		methods: {
			imageUrlFor(source){
				return imageBuilder.image(source)
			}
		}
	}
</script>