<template>
  
  <Navigation/>

  <router-view />

  <!-- Footer -->
  <Footer/>
</template>

<script>
  import {Navigation, Footer} from '@/components'

  export default {
    components:{
      Navigation,
      Footer
    }
  }
</script>


<style lang="scss">
  @import "@/scss/_variables.scss";
  @import "@/scss/_main.scss";
</style>