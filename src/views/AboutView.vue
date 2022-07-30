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

      <!-- Free Project -->
      <div class="card__project-about">
        <FreeProject :indies="indies" :persons="persons"/>
      </div>

    </div>
  </div>
</template>

<script>
  import {
    AboutMe, Project, FreeProject, Loading
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

  const indieProject = `*[_type == "indieProject"] | order(_createdAt asc) {
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


  export default {
    name: 'AboutView',
    components: {
      AboutMe,
      Project,
      FreeProject,
      Loading
    },
    data(){
      return {
        projects: [],
        persons: [],
        indies: [],
        error: null,
        loading: true
      }
    },

    created(){
      this.personData(),
      this.projectData(),
      this.indieProject(),
      this.gsapSetting()
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
      },

      indieProject() {
        this.error = this.indies = null
        sanity.fetch(indieProject)
        .then((indies) => {
          this.indies = indies
          setTimeout(() => {
            this.loading = false
          }, 1500)
        }, (err) => {
          this.error = err
        })
      },

      gsapSetting() {
        let tl = gsap.timeline();

        console.log("Puji Was Here");

        tl.from(".card__profile-about", {
          stagger: 0.2,
          opacity: 0,
          x: -20,
        })

        tl.from(".card__project-about", {
          stagger: 0.2,
          opacity: 0,
          x: -50
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