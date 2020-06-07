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

    <Row>
      <Column :cols="1">1</Column>
      <Column :cols="2">2</Column>
      <Column :cols="5">5</Column>
    </Row>

    <Carousel :arrayUrl="arrayUrl"></Carousel>

  </div>
</template>

<script>
  // @ is an alias to /src

  import MyButton from "@/components/MyButton.vue";
  import HelloWorld from '@/components/HelloWorld.vue';
  import Modal from "@/components/Modal.vue";
  import Row from "@/components/grid/Row";
  import Column from "@/components/grid/Column";
  import Carousel from "@/components/Carousel.vue";

  export default {
    name: 'Home',
    components: {
      MyButton,
      HelloWorld,
      Modal,
      Row,
      Column,
      Carousel,
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
        this[e] = "Pressed"
      },
    },

    data() {
      return {
        arrayUrl: ["https://loremflickr.com/420/240?random=1", "https://loremflickr.com/420/240?random=2",
          "https://loremflickr.com/420/240?random=3", "https://loremflickr.com/420/240?random=4"],
      }
    }

  }
</script>
