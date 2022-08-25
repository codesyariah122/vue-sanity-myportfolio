<template>
  
  <Navigation/>

  <router-view />

  <!-- <Footer/> -->
</template>

<script>
  import {Navigation, Footer} from '@/components'

  export default {
    components:{
      Navigation,
      Footer
    },

    mounted(){
      this.closeCollapsed()
    },

    methods: {
      closeCollapsed(){
        let bsCollapse = document.querySelector('.navbar-collapse')
        document.body.addEventListener('click', () => {
          // alert("okk")
          bsCollapse.classList.remove('show')
        })
      }
    }
  }
</script>


<style lang="scss">
  @import "@/scss/_variables.scss";
  @import "@/scss/_main.scss";
</style>