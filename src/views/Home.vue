<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <MyButton size="large" color="danger" :text="text" @click="clickMyButton('text')"></MyButton>
    <MyButton size="small" color="warning" :text="text2" @click="clickMyButton('text2')"></MyButton>
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
        text2: "Button2"
      }
    },
    methods: {
      clickMyButton: function (e) {
        console.log(e);
        this[e] = "Pressed"
      },
      newText() {

      }
    }
  }
</script>
