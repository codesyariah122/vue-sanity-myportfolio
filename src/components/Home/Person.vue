<template>
  <div class="container card__profile-home">
    <div class="row no-gutters">
      <div class="col-md-4 col-lg-4">
        <article class="card__avatar" :style="`background: url(${imageUrlFor(persons[0].image)}) center no-repeat;`">
          <div class="card__content">          
            <span class="card__subtitle"> {{persons[0].image.caption}} </span>
            <p class="card__description truncate"> 
              <strong>
                {{persons[0].bio[0].children[0].text}}
              </strong> <br>
              {{persons[0].bio[2].children[0].text}}<br>
              {{persons[0].bio[3].children[0].text}}
            </p>
            <div class="d-flex flex-row bd-highlight mb-3 gap-2">
              <div>                  
                <button class="btn btn-primary btn-sm rounded-pill btn-block btn__detail"><router-link to="/about">See Detail</router-link></button>
              </div>
              <div>
                <a href="https://github.com/codesyariah122/codesyariah122/blob/main/pujiermanto-cv.pdf" target="_blank" class="btn btn-success btn-sm rounded-pill btn-block text-white btn__detail ml-4">My New CV</a>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="col-md-8 col-lg-8 col-sm-8 profile__board">
        <div class="row justify-content-start profile__info">
          <div class="col-md-6 mt-3">
            <div class="row">
              <div class="col-md-12 showcase">
                <video src="@/assets/video.mp4" autoplay loop muted></video>               
                <h3 class="display-5 profile-name">
                  {{persons[0].name}}
                </h3>

                <p class="profile-jobdesk">{{persons[0].jobdesk}}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 social__link">
            <div v-if="$isMobile()" class="d-flex flex-column align-items-center">
              <div class="col-sm-12">
                <ul class="list-group list-group-horizontal">
                  <li class="list-group-item">
                   <a :href="`mailto:${persons[0].contactInfo.email}`" target="_blank">
                    <i class="fas fa-fw fa-lg fa-paper-plane text-warning"></i>
                  </a>
                </li>
                <li class="list-group-item">
                  <a :href="`https://www.linkedin.com/in/${persons[0].contactInfo.linkedin}`" target="_blank">
                    <i class="fab fa-fw fa-lg fa-linkedin text-primary"></i>
                  </a>
                </li>
                <li class="list-group-item">
                  <a :href="`https://twitter.com/${persons[0].contactInfo.linkedin}`" target="_blank">
                    <i class="fab fa-fw fa-lg fa-twitter text-info"></i>
                  </a>
                </li>
                <li class="list-group-item">
                  <a :href="`https://instagram.com/${persons[0].contactInfo.instagram}`" target="_blank">
                    <i class="instagram"></i>
                  </a>
                </li>
                <li class="list-group-item">
                  <a :href="`https://web.whatsapp.com/send?phone=${persons[0].contactInfo.phone}&text&app_absent=0`" target="_blank">
                    <i class="fab fa-fw fa-lg fa-whatsapp"></i>
                  </a>
                </li>
                <li class="list-group-item">
                  <a :href="`https://github.com/${persons[0].contactInfo.github}`">
                    <i class="fab fa-fw fa-lg fa-github text-white"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div v-else>
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item">
                <a :href="`mailto:${persons[0].contactInfo.email}`" target="_blank">
                  <i class="fas fa-fw fa-lg fa-paper-plane text-warning"></i>
                </a>
              </li>
              <li class="list-group-item">
                <a :href="`https://www.linkedin.com/in/${persons[0].contactInfo.linkedin}`" target="_blank">
                  <i class="fab fa-fw fa-lg fa-linkedin text-primary"></i>
                </a>
              </li>
              <li class="list-group-item">
                <a :href="`https://twitter.com/${persons[0].contactInfo.linkedin}`" target="_blank">
                  <i class="fab fa-fw fa-lg fa-twitter text-info"></i>
                </a>
              </li>
              <li class="list-group-item">
                <a :href="`https://instagram.com/${persons[0].contactInfo.instagram}`" target="_blank">
                  <i class="instagram"></i>
                </a>
              </li>
              <li class="list-group-item">
                <a :href="`https://web.whatsapp.com/send?phone=${persons[0].contactInfo.phone}&text&app_absent=0`" target="_blank">
                  <i class="fab fa-fw fa-lg fa-whatsapp"></i>
                </a>
              </li>
              <li class="list-group-item">
                <a :href="`https://github.com/${persons[0].contactInfo.github}`">
                  <i class="fab fa-fw fa-lg fa-github text-white"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div class="row justify-content-start skill__block">
        <div class="text-capitalize p-3 text-center text-white">
          <h5>tools or programming languages that I have used</h5>
        </div>

        <div class="row text-white mt-3">
          <div v-for="(key, index) in skills" class="col-md-4">
            <div :class="`${$isMobile ? 'row justify-content-start' : 'row justify-content-center'} mb-3 key__block`">
              <div class="col-md-6">
                <img :src="imageUrlFor(key.mainImage)" :style="`width:45px; margin-left:${key.percentage}%;`">
              </div>
              <div class="col-md-8 mt-2">
                <div class="progress">
                  <div class="progress-bar" role="progressbar" :style="`width: ${key.percentage}%;`" :aria-valuenow="key.percentage" aria-valuemin="0" aria-valuemax="100">
                    {{key.percentage}}%
                  </div>
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

  import sanity from '@/client'

  import imageUrlBuilder from '@sanity/image-url'

  const imageBuilder = imageUrlBuilder(sanity)

  export default {
    props: ['persons',
      'image',
      'skills'],

    data() {
      return {
        avatar: '',
        profilePicBg: null
      }
    },

    mounted() {
      this.ProfileAvatar(),
      this.gsapSetting()
    },

    methods: {
      imageUrlFor(source) {
        return imageBuilder.image(source)
      },


      ProfileAvatar() {
        this.persons.map(d => {
          this.avatar = this.imageUrlFor(d.image)
        })
      },

      gsapSetting() {
        let tl = gsap.timeline();

        console.log("Puji Was Here");

        tl.from(".card__profile-home", {
          stagger: 0.2,
          opacity: 0,
          x: -20,
        })

        tl.from(".card__avatar", {
          stagger: 0.2,
          opacity: 0,
          x: -50
        })

        tl.from(".card__content", {
          stagger: 0.2,
          opacity: 0,
          x: 50
        })

        tl.from(".user-online-indicator", {
          stagger: 0.2,
          opacity: 0,
          y: 20
        })
        tl.from(".showcase", {
          stagger: 0.2,
          opacity: 0,
          y: 20
        })
        tl.from(".social__link", {
          stagger: 0.2,
          opacity: 0,
          x: -25,
        })
        tl.from(".key__block", {
          stagger: 0.2,
          opacity: 0,
          y: 20,
        })
      }
    }
  }
</script>