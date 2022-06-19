<template>
  <div>
    <div v-if="loading" class="container loader__page">
      <div class="d-flex justify-content-center">
        <div class="spinner-grow text-primary" role="status" :style="`${$isMobile ? 'width: 7rem; height: 7rem;' : 'width: 3rem; height: 3rem;'}`">
          <span class="visually-hidden">Loading...</span> <br>
        </div>
      </div>

      <div class="row justify-content-center mt-3">
        <div class="col-lg-12 col-sm-12">          
          <h3 class="text-white"> 
            I Love ☕
          </h3>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- Person component -->
      <Person :persons="persons" @image-source="imageUrlFor" :skills="skills" />

      <!-- Projectt component -->
      <Project :projects="projects" />
    </div>
  </div>
</template>

<script>
  import {
    Person,
    Project
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

  const project = `*[_type == "sampleProject"] | order(_createdAt asc) {
    _id,
    title,
    slug,
    startedAt,
    endedAt,
    mainImage,
    excerpt,
    body
  }[0...50]`


  export default {
    name: 'HomeView',
    components: {
      Person,
      Project
    },
    data() {
      return {
        persons: [],
        projects: [],
        skills: [],
        error: null,
        loading: true
      }
    },

    created() {
      this.personData(),
      this.projectData(),
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
          }, 1500)
        }, (error) => {
          this.error = error
        })
      },
      projectData() {
        this.error = this.projects = null
        sanity.fetch(project)
        .then((projects) => {
          // console.log(projects)
          this.projects = projects
        }, (err) => {
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
    }
  </style>