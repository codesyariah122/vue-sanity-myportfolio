<template>
  <div class="about">
    <h1>This is an about page</h1>
    <pre>
      {{blogs}}
    </pre>

  </div>
</template>

<script>
  import sanity from '@/client'

  const blog = `*[_type == "post"]|order(created_at desc){
    _id,
    title,
    "slug": slug.current,
    "author": author->name,
    mainImage,
    categories,
    publishedAt,
    body
  }[0...50]`

  const author = `*[_type == "author"]{
    _id,
    name,
    slug,
    image,
    bio
  }[0...50]`


  export default {
    name: 'AboutView',
    
    data(){
      return {
        blogs: [],
        authors: [],
        error: null,
        loading: true
      }
    },

    created(){
      this.blogData(),
      this.authorData()
    },

    methods: {
      blogData(){
        this.loading = true
        this.error = this.blogs = null
        sanity.fetch(blog)
        .then((blogs) =>{
          console.log(blogs)
          this.blogs = blogs
          setTimeout(() => {
            this.loading=false
          }, 1500)
        },(error) => {this.error = error})
      },

      authorData(){
        this.loading = true
        this.error = this.authors = null
        sanity.fetch(author)
        .then((authors) =>{
          this.authors = authors
          setTimeout(() => {
            this.loading=false
          }, 1500)
        },(error) => {this.error = error})
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