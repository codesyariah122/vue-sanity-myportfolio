<template>
	<div class="row justify-content-center">
		<div v-for="person in persons" class="col-lg-6 col-sm-12">
			<div class="card mb-3" style="max-width: 540px;">
				<div class="row g-0">
					<div class="col-md-4">
						<img :src="imageUrlFor(person.image)" class="img-fluid rounded-start" :alt="person.name">
					</div>
					<div class="col-md-8">
						<div class="card-body">
							<h5 class="card-title">
								{{person.name}}
							</h5>
							<small>
								{{person.image.caption}}
							</small>
							<p class="card-text truncate">
								<strong>
									{{person.bio[0].children[0].text}}
								</strong> <br>
								{{person.bio[1].children[0].text}}
							</p>
							<div class="d-grid gap-2">
								<button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-primary btn-md rounded-pill">
									Detail
								</button>

								<!-- Modal -->
								<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
									<div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header">
												<h5 class="modal-title" id="staticBackdropLabel">
													{{person.name}}
												</h5>
												<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
											</div>
											<div class="modal-body">
												<strong>
													{{person.bio[0].children[0].text}}
												</strong> <br>
												{{person.bio[1].children[0].text}}
												<br>
												<div class="contact__info mt-5">
													<h5>Contact info : </h5>
													<ul class="list-group">
														<li class="list-group-item">
															<a :href="`mailto:${person.contactInfo.email}`" target="_blank">
																<i class="far fa-fw fa-lg fa-envelope-open"></i> {{person.contactInfo.email}}
															</a>
														</li>
														<li class="list-group-item">
															<a :href="`https://www.linkedin.com/in/${person.contactInfo.linkedIn}`" target="_blank">
																<i class="fab fa-fw fa-lg fa-linkedin"></i> {{person.name}}
															</a>
														</li>
														<li class="list-group-item">
															<a :href="`https://twitter.com/${person.contactInfo.twitter}`" target="_blank">
																<i class="fab fa-fw fa-lg fa-twitter"></i> {{person.contactInfo.twitter}}
															</a>
														</li>
														<li class="list-group-item">
															<a :href="`https://github.com/${person.contactInfo.github}`">
																<i class="fab fa-fw fa-lg fa-github"></i> {{person.contactInfo.github}}
															</a>
														</li>
														<li class="list-group-item">
															<a :href="`https://web.whatsapp.com/send?phone=${person.contactInfo.phone}&text&app_absent=0`" target="_blank">
																<i class="fab fa-fw fa-lg fa-whatsapp"></i> {{person.contactInfo.phone}}
															</a>
														</li>
													</ul>
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
	</div>
</template>

<script>
	import sanity from '@/client'

	import imageUrlBuilder from '@sanity/image-url'

	const imageBuilder = imageUrlBuilder(sanity)

	export default{
		props: ['persons', 'image'],

		methods: {
			imageUrlFor(source){
				return imageBuilder.image(source)
			}
		}
	}
</script>