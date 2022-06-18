<template>
  <div class="container card__profile-home">
    <div v-for="person in persons" class="row no-gutters">
      <div class="col-md-4 col-lg-4 avatar">
        <picture>
          <source :srcset="imageUrlFor(person.image)" media="(min-width:1000px)">
            <source :srcset="imageUrlFor(person.image)" media="(min-width:750px)">
              <a :href="imageUrlFor(person.image)" target="_blank">
                <img :src="imageUrlFor(person.image)" :alt="person.name" class="image__profile">
              </a>
            </picture>
          </div>
          <div class="col-md-8 col-lg-8 col-sm-12 profile__board">
            <div class="row justify-content-start profile__info bg-dark">
              <div class="col-md-6 mt-3">
                <div class="row">
                  <div class="col-md-12">                    
                    <h3 class="display-5 profile-name">
                      {{person.name}}
                    </h3>
                  </div>
                  <div class="col-md-12">                    
                    <div class="col-md-12">
                      {{person.jobdesk}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 social__link">
                <div v-if="$isMobile()" class="d-flex flex-column align-items-center">
                  <div class="col-sm-12">
                    <ul class="list-group list-group-horizontal">
                      <li class="list-group-item">
                        <a :href="`mailto:${person.contactInfo.email}`" target="_blank">
                          <i class="far fa-fw fa-lg fa-envelope-open text-warning"></i>
                        </a>
                      </li>
                      <li class="list-group-item">
                        <a :href="`https://www.linkedin.com/in/${person.contactInfo.linkedin}`" target="_blank">
                          <i class="fab fa-fw fa-lg fa-linkedin text-primary"></i>
                        </a>
                      </li>
                      <li class="list-group-item">
                        <a :href="`https://twitter.com/${person.contactInfo.linkedin}`" target="_blank">
                          <i class="fab fa-fw fa-lg fa-twitter text-info"></i>
                        </a>
                      </li>
                      <li class="list-group-item">
                        <a :href="`https://web.whatsapp.com/send?phone=${person.contactInfo.phone}&text&app_absent=0`" target="_blank">
                          <i class="fab fa-fw fa-lg fa-whatsapp text-success"></i>
                        </a>
                      </li>
                      <li class="list-group-item">
                        <a :href="`https://github.com/${person.contactInfo.github}`">
                          <i class="fab fa-fw fa-lg fa-github text-white"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div v-else>
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item">
                      <a :href="`mailto:${person.contactInfo.email}`" target="_blank">
                        <i class="far fa-fw fa-lg fa-envelope-open text-warning"></i>
                      </a>
                    </li>
                    <li class="list-group-item">
                      <a :href="`https://www.linkedin.com/in/${person.contactInfo.linkedin}`" target="_blank">
                        <i class="fab fa-fw fa-lg fa-linkedin text-primary"></i>
                      </a>
                    </li>
                    <li class="list-group-item">
                      <a :href="`https://twitter.com/${person.contactInfo.linkedin}`" target="_blank">
                        <i class="fab fa-fw fa-lg fa-twitter text-info"></i>
                      </a>
                    </li>
                    <li class="list-group-item">
                      <a :href="`https://web.whatsapp.com/send?phone=${person.contactInfo.phone}&text&app_absent=0`" target="_blank">
                        <i class="fab fa-fw fa-lg fa-whatsapp text-success"></i>
                      </a>
                    </li>
                    <li class="list-group-item">
                      <a :href="`https://github.com/${person.contactInfo.github}`">
                        <i class="fab fa-fw fa-lg fa-github text-white"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>


            <div class="row justify-content-start skill__block bg-dark">
              <div class="text-capitalize p-3 text-center text-white">
                <h5>tools or programming languages ​​that I have used</h5>
              </div>

              <div class="row text-white mt-3">
                <div v-for="(key, index) in skills" class="col-md-4">
                  <div :class="`${$isMobile ? 'row justify-content-start' : 'row justify-content-center'} mb-3 key-block`">
                    <div class="col-md-6">
                      <img :src="imageUrlFor(key.mainImage)" :style="`${key.title === 'nodejs' || key.title === 'express js' || key.title === 'mongodb' ? 'width:60px;' : 'width:33px;'}`">
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
            avatar: ''
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

            console.log("New");

            tl.from(".card__profile-home", {
              stagger: 0.2,
              opacity: 0,
              x: -20,
            });

            tl.from(".avatar img", {
              stagger: 0.2,
              opacity: 0,
              y: 20,
            });

            tl.from(".user-online-indicator", {
              stagger: 0.2,
              opacity: 0,
              y: 20,
            })
            tl.from(".profile-name", {
              stagger: 0.2,
              opacity: 0,
              y: 20,
            })
            tl.from(".key-block", {
              stagger: 0.2,
              opacity: 0,
              y: 20,
            })

            tl.from(".social__link", {
              stagger: 0.2,
              opacity: 0,
              x: -25,
            })
          }
        }
      }
    </script>