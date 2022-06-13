import sanityClient from '@sanity/client'

export default sanityClient({
	projectId: "im2a1zdi",
	dataset: "production",
	useCdn: true,
	apiVersion: "2022-05-08"
})