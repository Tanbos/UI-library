<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <MyButton size="large" color="danger" :text="text" @click="clickMyButton"></MyButton>
    <MyButton size="small" color="warning" :text="text" @click="clickMyButton"></MyButton>
    <MyButton color="success" text="Button" @click="clickMyButton"></MyButton>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  import MyButton from "@/components/MyButton.vue";

  export default {
    name: 'Home',
    components: {
      MyButton,
      HelloWorld
    },
    data() {
      return {
        size: "",
        color: "",
        text: "Button",
      }
    },
    methods: {
      clickMyButton: function (e) {
        console.log(e);
      },
    }
  }
</script>
