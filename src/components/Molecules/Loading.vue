<template>
	<div>
		<div class="d-flex justify-content-center">
			<div class="spinner-border text-white" role="status" :style="`${$isMobile ? 'width: 7rem; height: 7rem;' : 'width: 3rem; height: 3rem;'}`">
				<span class="visually-hidden">Loading...</span> <br>
			</div>
		</div>

		<div class="row justify-content-center mt-3">
			<div v-if="persons[3]" class="col-lg-12 col-sm-12">      
				<h3 class="text-white"> 
					{{persons[3].image.caption}} ☕
				</h3>
			</div>
			<div v-else class="col-lg-12 col-sm-12">
				<h3 class="text-white"> 
					{{persons.aboutImage.alt}} ☕
				</h3>
			</div>

		</div>
	</div>
</template>

<script>
	export default{
		props: ['persons']
	}
</script>