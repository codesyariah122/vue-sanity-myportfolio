<template>
	<div class="blog__view-comment container mt-1 mb-5">
		<div class="row height d-flex justify-content-center align-items-center">
			<div class="col-md-7">
				<div class="card__comment">
					<div class="p-3 header__comment">
						<h6>Comments</h6>
					</div>

					<form @submit.prevent="SendComment">
						<div class="input__coment d-flex flex-row align-items-center p-3 form-color">
							<input type="text" class="form-control" placeholder="Enter your name..." v-model="post.name"> 
						</div>

						<div class="input__coment d-flex flex-row align-items-center p-3 form-color">
							<input type="email" required class="form-control" placeholder="Enter your email..." v-model="post.email"> 
						</div>

						<div class="input__coment d-flex flex-row align-items-center p-3 form-color">
							<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter your comment..." v-model="post.comment"></textarea> 
						</div>

						<div class="d-grid gap-2">							
							<button type="submit" class="btn btn-md btn-block btn-primary rounded-pill">
								Send Comment
							</button> 
						</div>
					</form>
					
					<div v-if="config.loading" class="mt-5 mb-5 loading">
						<center>							
							<div class="spinner-border text-danger" role="status" style="width: 3rem; height: 3rem;">
								<span class="visually-hidden">Loading...</span>
							</div>
						</center>
					</div>

					<div v-else>
						<div v-if="comments.length > 0" class="comment__block">
							<div v-for="comment in comments" class="d-flex flex-row p-3 contents">
								<img src="https://i.imgur.com/zQZSWrt.jpg" width="40" height="40" class="rounded-circle user__avatar">
								<div class="w-100">
									<div class="d-flex justify-content-between align-items-center">
										<div class="d-flex flex-row align-items-center">
											<span class="mr-2">
												{{comment.name}}
											</span>
										</div> 
										<small class="time">
											{{date(comment._createdAt)}}
										</small>
									</div>
									<div class="email">
										{{comment.email}}
									</div>
									<p class="comments text-justify comment-text mb-0">{{comment.comment}}</p>
								</div>
							</div>
						</div>
						<div v-else class="comment__block">
							<div class="container">
								<div class="row justify-content-center">
									<div class="col-md-12 col-sm-12">
										<div class="alert alert-dark" role="alert">
											Belum ada komentar!
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
	import { reactive, ref } from 'vue'
	import { useRouter } from 'vue-router'
	import sanity from '@/client'
	import imageUrlBuilder from '@sanity/image-url'
	const imageBuilder = imageUrlBuilder(sanity)
	import { SanityBlocks } from "sanity-blocks-vue-component"
	import moment from 'moment'

	export default {
		props: {
			comments: Object,
			_id: String,
			config: Object
		},

		setup(props, {emit}){
			let post = reactive({
				name: '',
				email: '',
				comment: ''
			})

			function date(val){
				return moment(val).fromNow()
			}

			function SendComment(){
				const send = {
					_type: 'comment',
					name: post.name,
					approved: true,
					email: post.email,
					comment: post.comment,
					post: {
						_ref: props._id,
						_type: 'reference'
					}
				}

				sanity.create(send)
				.then((data) => {
					emit('update-comment')
					setTimeout(() => {
						post.name = ''
						post.email = ''
						post.comment = ''
					}, 2500)
				},(error) => {
					console.log(error.response)
				})
				
			}

			return {
				date,
				post,
				SendComment
			}
		}
	}
</script>

<style lang="scss">
	.blog__view-comment{
		background-color: $card_comment;
		filter: drop-shadow(0 -5mm 1mm $secondNavBg);

		.card__comment{
			color: $white;
			.header__comment h6{
				font-size: 31px!important;
				font-family: 'Poppins';
			}
			.form-color{
				margin-top: .1rem;
			}
			.comment__block{
				margin-top: 5rem;
				margin-bottom: 5rem;
				.contents{
					margin-top: 2rem;
					border-color: #a88734 #9c7e31 #846a29;
					border-width: 1px;
					border-style: solid;
					.user__avatar{
						margin-right: 1rem;
					}
					.comments{
						margin-top: .8rem;
						width: 90%;
					}
				}
			}
		}
	}
</style>