import dotenvExpand from 'dotenv-expand'
import sanityClient from '@sanity/client'


export default sanityClient({
	projectId: process.env.VUE_APP_PROJECTID,
	dataset: process.env.VUE_APP_DATASET,
	useCdn: true,
	token: process.env.VUE_APP_SANITY_API_TOKEN,
	apiVersion: "2022-05-08"
})