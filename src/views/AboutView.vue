<template>
  <div class="about__view">
    <div v-if="loading" class="container loader__page">
      <Loading :persons="persons"/>
    </div>
    <div class="container">
      <!-- Profile Content -->
      <div class="card__profile-about">
        <AboutMe :persons="persons" :projects="projects"/>
      </div>
      <!-- Project Content -->
      <div class="card__project-about">
        <Project :projects="projects" :persons="persons"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    AboutMe, Project, Loading
  } from '@/components'

  import sanity from '@/client'

  const person = `*[_type == "person"] {
    _id,
    name,
    slug,
    jobdesk,
    contactInfo,
    image,
    aboutImage,
    excerpt,
    bio
  }[0...50]`

  const project = `*[_type == "sampleProject"] | order(_createdAt asc) {
    _id,
    title,
    slug,
    categories,
    members,
    startedAt,
    endedAt,
    mainImage,
    excerpt,
    body
  }[0...50]`

  const category = `*[_type == "category"]{
    _id,
    title,
    description
  }[0...50]`


  export default {
    name: 'AboutView',
    components: {
      AboutMe,
      Project,
      Loading
    },
    data(){
      return {
        projects: [],
        persons: [],
        error: null,
        loading: true
      }
    },

    created(){
      this.personData(),
      this.projectData()
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
      projectData() {
        this.error = this.projects = null
        sanity.fetch(project)
        .then((projects) => {
          this.projects = projects
          setTimeout(() => {
            this.loading = false
          }, 1500)
        }, (err) => {
          this.error = err
        })
      }

    }
  }
</script>

<style lang="css">
  .contact__info a{
    text-decoration: none;
  }
  .contact__info .list-group{
    text-align: left;
  }
  .modal .modal-body{
    text-align: left;
  }
  
  .card .card-title{
    text-transform: capitalize;
    font-weight: 600;
  }
  .truncate {
    display: -webkit-box;
    -webkit-line-clamp: var(--line-clamp, 4);
    -webkit-box-orient: vertical;
    word-break: var(--word-break, "none");
    overflow: hidden;
    hyphens: auto;
    text-align: var(--align, left);
    --is-single-line: 1 - Clamp(0, Calc(var(--line-clamp) - 1), var(--line-clamp));
    --delay: Calc(-1s * (var(--is-single-line, 1) - 1));
    animation: states 1s var(--delay) paused;
    @keyframes states {
      0% {
        word-break: break-all;
      }
    }
  }
</style>