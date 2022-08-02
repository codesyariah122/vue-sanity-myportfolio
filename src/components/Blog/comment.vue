<template>
	<div class="blog__view-comment container mt-1 mb-5">
		<div class="row height d-flex justify-content-center align-items-center">
			<div class="col-md-7">
				<div class="card__comment">
					<div class="p-3 header__comment">
						<h6>Comments</h6>
					</div>
					<div class="input__coment d-flex flex-row align-items-center p-3 form-color">
						<input type="text" class="form-control" placeholder="Enter your comment..."> 
					</div>

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
</template>

<script>
	import sanity from '@/client'
	import imageUrlBuilder from '@sanity/image-url'
	const imageBuilder = imageUrlBuilder(sanity)
	import { SanityBlocks } from "sanity-blocks-vue-component"
	import moment from 'moment'

	export default {
		props: {
			comments: Object
		},

		setup(){
			function date(val){
				return moment(val).fromNow()
			}

			return {
				date
			}
		}
	}
</script>

<style lang="scss">
	.blog__view-comment{
		background-color: $card_comment;
		filter: drop-shadow(0 -6mm 4mm $secondNavBg);

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