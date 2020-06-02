<template>
  <div class="home">
    <!--        <img alt="Vue logo" src="../assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
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
  import HelloWorld from '@/components/HelloWorld.vue';
  import Modal from "@/components/Modal.vue";

  export default {
    name: 'Home',
    components: {
      HelloWorld,
      Modal
    }
  }
</script>
