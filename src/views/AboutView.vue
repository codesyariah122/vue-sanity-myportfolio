<template>
  <div class="about__view">
    <!-- Projectt component -->
    <AboutMe :persons="persons" :projects="projects"/>
  </div>
</template>

<script>
  import {
    AboutMe
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
    startedAt,
    endedAt,
    mainImage,
    excerpt,
    body
  }[0...50]`


  export default {
    name: 'AboutView',
    components: {
      AboutMe
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
          }, 1500)
        }, (error) => {
          this.error = error
        })
      },
      projectData() {
        this.error = this.projects = null
        sanity.fetch(project)
        .then((projects) => {
          console.log(projects)
          this.projects = projects
          setTimeout(() => {
            this.loading = false
          }, 1500)
        }, (err) => {
          this.error = error
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