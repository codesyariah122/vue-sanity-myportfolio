<template>
	<div class="grid">
		<figure class="effect-lily">
			<img :src="artwork" alt="img12"/>
			<figcaption>
				<div>
					<h2> {{detail.title}} </h2>
					<p>
						{{date(detail.publishedAt)}}
					</p>
				</div>
				<a href="#">View more</a>
			</figcaption>
		</figure>
	</div>
</template>

<script>
	import moment from 'moment'

	export default {
		props: ['artwork', 'detail'],

		methods: {
			date(val){
				return moment(val).format("LL")
			}
		}
	}
</script>