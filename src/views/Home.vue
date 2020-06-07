<template>
  <div class="home">

    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <MyButton size="large" color="danger" :text="text" @click="clickMyButton('text')"></MyButton>
    <MyButton size="small" color="warning" :text="text2" @click="clickMyButton('text2')"></MyButton>
    <MyButton color="success" text="Button" @click="clickMyButton"></MyButton>

    <Modal @open @close>
      <template v-slot:trigger>
        <button class="modal-trigger" data-target="name">Test for modal window</button>
      </template>
      <template v-slot:default>
        <div class="modal" id="name">text text in window
          <div> Параграф для основного контента окна.</div>
          <div> Параграф для основного контента окна.</div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
  // @ is an alias to /src

  import MyButton from "@/components/MyButton.vue";
  import HelloWorld from '@/components/HelloWorld.vue';
  import Modal from "@/components/Modal.vue";


  export default {
    name: 'Home',
    components: {
      MyButton,
      HelloWorld,
      Modal
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
    }
  }
</script>
