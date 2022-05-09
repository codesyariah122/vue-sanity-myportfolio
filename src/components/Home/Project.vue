<template>
	<div>
		<div class="row justify-content-center mt-5">
			<div class="col-lg-12">

				<div class="row">
					<div v-for="project in projects" class="col-md-4">
						<div class="card" style="width: 18rem;">
							<img :src="imageUrlFor(project.mainImage)" class="card-img-top" :alt="project.mainImage.caption">
							<div class="card-body">
								<h5 class="card-title">
									{{project.title}}
								</h5>
								<p class="card-text truncate">
									{{project.excerpt[0].children[0].text}} ...
								</p>
								<div class="d-grid gap-2 mt-2">
									<a href="#" @click.prevent="showDetail(project, project.mainImage)" data-bs-toggle="modal" data-bs-target="#projectDetail" class="btn btn-primary btn-block rounded-pill">Detail</a>
								</div>

								<div class="modal fade" id="projectDetail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<h5 class="modal-title text-capitalize font-weight-bold" id="staticBackdropLabel">
													{{detail.title}}
												</h5>
												<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
											</div>
											<div class="modal-body">
												<img :src="img" class="card-img-top mb-3" >
												<article v-for="body in detail.body">
													<p v-for="item in body.children">
														{{item.text}}
													</p>
												</article>
											</div>
										</div>
									</div>
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
			}
		}
	}
</script>