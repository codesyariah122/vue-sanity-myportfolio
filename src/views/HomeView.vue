<template>
  <div class="home__view">
    <div v-if="loading" class="container loader__page">
      <Loading :persons="persons"/>
    </div>
    <div v-else>
      <!-- Person component -->
      <Person :persons="persons" @image-source="imageUrlFor" :skills="skills" />
    </div>
  </div>
</template>

<script>
  import {
    Person, Loading
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
      Loading
    },
    data() {
      return {
        persons: [],
        skills: [],
        error: null,
        loading: true
      }
    },

    created() {
      this.personData(),
      this.skillProgramming()
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
          }, 2500)
        }, (error) => {
          this.error = error
        })
      },

      skillProgramming() {
        this.error = this.skills = null
        sanity.fetch(skill)
        .then((skills) => {
          console.log(skills)
          this.skills = skills
        }, (err) => {
          this.error = error
        })
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