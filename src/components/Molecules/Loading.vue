<template>
	<div>
		<div class="d-flex justify-content-center">
			<div class="spinner-grow text-primary" role="status" :style="`${$isMobile ? 'width: 7rem; height: 7rem;' : 'width: 3rem; height: 3rem;'}`">
				<span class="visually-hidden">Loading...</span> <br>
			</div>
		</div>

		<div class="row justify-content-center mt-3">
			<div class="col-lg-12 col-sm-12">      
				<h3 class="text-white"> 
					{{persons[3].image.caption}} ☕
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