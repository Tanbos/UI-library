<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <Carousel :arrayUrl="arrayUrl"></Carousel>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  import Carousel from "@/components/Carousel.vue";

  export default {
    name: 'Home',
    components: {
      Carousel,
      HelloWorld
    },
    data() {
      return {
        arrayUrl: ["https://loremflickr.com/420/240?random=1", "https://loremflickr.com/420/240?random=2",
          "https://loremflickr.com/420/240?random=3", "https://loremflickr.com/420/240?random=4"],
      }
    }
  }
</script>
