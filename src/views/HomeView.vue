<template>
  <div class="home__view">
    <div v-if="loading" class="container loader__page">
      <Loading :persons="persons"/>
    </div>
    <div v-else>
      <!-- Person component -->
      <div class="container">
        <Person :persons="persons" @image-source="imageUrlFor" :skills="skills" />
      </div>

      <!-- github repo lists -->
      <div class="container">
        <RepoGithub :repos="repos" :languages_url="languages_url"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Person, RepoGithub, Loading
  } from '@/components'

  import sanity from '@/client'

  const person = `*[_type == "person"] {
    _id,
    name,
    slug,
    jobdesk,
    contactInfo,
    image,
    excerpt,
    bio
  }[0...50]`

  const skill = `*[_type == "skillProgramming"] | order(_createdAt asc) {
    _id,
    title,
    percentage,
    color,
    mainImage
  }[0...50]`


  export default {
    name: 'HomeView',
    components: {
      Person,
      RepoGithub,
      Loading
    },
    data() {
      return {
        persons: [],
        skills: [],
        error: null,
        loading: true,
        repos: []
      }
    },

    created() {
      this.personData(),
      this.skillProgramming(),
      this.githubRepo()
    },

    methods: {
      personData() {
        this.loading = true
        this.error = this.persons = null
        sanity.fetch(person)
        .then((persons) => {
          this.persons = persons
          setTimeout(() => {
            this.loading = false
          }, 1000)
        }, (error) => {
          this.error = error
        })
      },

      skillProgramming() {
        this.loading = true
        this.error = this.skills = null
        sanity.fetch(skill)
        .then((skills) => {
          this.skills = skills
          setTimeout(() => {
            this.loading = false
          }, 1000)
        }, (err) => {
          this.error = error
        })
      },

      githubRepo(){
        this.loading = true
        const config = {
          page: 1,
          per_page: 15,
          sort: 'created'
        }

        this.axios.get(`${process.env.GITHUB_API_URL}${process.env.GITHUB_USER}/repos?page=${config.page}&sort=${config.sort}&per_page=${config.per_page}`, {
          headers: {
            'Accept': 'application/vnd.github.mercy-preview+json',
            'Authorization': process.env.ACCESS_TOKEN
          }
        })
        .then(({data}) => {
          console.log(data)
          this.repos = data
          setTimeout(() => {
            this.loading = false
          }, 1000)
        })
        .catch(err => console.error(err))
      }

    }
  }
</script>

<style lang="scss">
  .loader__page{
    margin-top: 15rem!important;
    height: 100vh;
    text-align: center;
  }
</style>