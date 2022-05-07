import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "im2a1zdi", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  useCdn: true,
  apiVersion: "2022-05-08"
});