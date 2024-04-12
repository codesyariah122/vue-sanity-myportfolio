<template>
	<div class="container card__profile-home">
		<div class="row no-gutters">
			<div class="col-md-12 col-sm-12 repo__block">
				<div class="heading">
					<h1 class="heading__title">My Github Story <i class="fab fa-fw fa-lg fa-github-alt"></i></h1>
					<blockquote class="heading__credits blockquote-footer">
						Berjuta kisah berjuta cerita satu makna.
					</blockquote>
				</div>
				<div class="row justify-content-center github__board">
					<div v-for="(repo, idx) in repos" class="col-md-4 col-sm-4 github__story">
						<div class="cards__repo">
							<div :class="`card__repo card-${idx+=1}`">
								<div class="card__icon">
									<i class="fab fa-github"></i>
								</div>

								<p class="card__exit">
									<i class="fas fa-times"></i>
								</p>

								<h2 class="card__title">
									{{repo.name}}
								</h2>
								<p class="content truncate">
									{{repo.description}}
								</p>
								<p class="card__apply">
									<a class="card__link" :href="repo.html_url">
										Apply Now <i class="fas fa-arrow-right"></i>
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['repos'],
		data(){
			return {
				class: [1, 2, 3]
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>