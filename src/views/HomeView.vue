<template>
  <div class="home">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-sm-12 col-xs-12">

          <!-- person card -->
          <div v-for="person in persons">
            <div class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img :src="imageUrlFor(person.image).width(480)" class="img-fluid rounded-start" :alt="person.name">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{{person.name}}</h5>
                    <p class="card-text text-justify"> <strong>{{person.bio[0].children[0].text}}</strong>  <br> {{person.bio[1].children[0].text}}</p>
                    <p class="card-text"><small class="text-muted"></small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import sanity from "../client";
  import imageUrlBuilder from "@sanity/image-url";

  const imageBuilder = imageUrlBuilder(sanity);

  const query = `*[_type == "person"]{
    _id,
    name,
    slug,
    image,
    bio
  }[0...50]`;

  export default {
    name: 'HomeView',
    data() {
      return {
        loading: true,
        persons: [],
        error: null
      }
    },

    created(){
      this.fetchData()
    },

    methods: {
      imageUrlFor(source) {
        return imageBuilder.image(source);
      },
      fetchData() {
        this.error = this.persons = null;
        this.loading = true;
        sanity.fetch(query).then(
          (persons) => {
            this.loading = false;
            this.persons = persons;
          },
          (error) => {
            this.error = error;
          }
          )
      }
    }
  }
</script>
