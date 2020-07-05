<template>
  <div class="myModal">
    <vue-markdown># Modal</vue-markdown>
    Modals are flexible dialog prompts powered by JavaScript and CSS.
    They support a number of use cases from user notification to completely custom content.
<div class="example">
    <Modal @open="" @close="">
      <template v-slot:trigger>
        <button class="modal-trigger" data-target="name">Test for modal window</button>
      </template>
      <template v-slot:default>
        <div class="modal" id="name">
          <div> text in window text in window </div>
          <div> text in window text in window </div>
        </div>
      </template>
    </Modal>
    <p></p>
<!--<div class="mblockquote">-->
    <vue-markdown class="mblockquote">

      ```
      &lt;Modal @open @close>
          &ltbr&gt;
          &lt;template v-slot:trigger>
      &lt;button class="modal-trigger" data-target="name">Test for modal window&lt;/button>
      &lt;/template>
      &lt;template v-slot:default>
      &lt;div class="modal" id="name">
      &lt;div> text in window &lt;/div>
  &lt;/div>
  &lt;/template>
  &lt;/Modal>
      ```
    </vue-markdown>
<!--</div>-->
</div>
    <vue-markdown>## Props</vue-markdown>
    <DataTable :columns="columns" :items="items"></DataTable>
  </div>
</template>

<script>
  import Vue from "vue";
  import DataTable from "../components/DataTable.vue";
  import VueMarkdown from "vue-markdown";
  import Modal from "../components/Modal.vue";
  import MyButton from "../components/MyButton.vue";

  export default Vue.extend({
    name: 'PageMyCarousel',
    components: {
      Modal,
      DataTable,
      MyButton,
      VueMarkdown,
    },
    data() {
      return {
        columns: [{title: '№', value: '_index'},
          {title: 'Slot', value: 'slot'},
          {title: 'Type', value: 'type'},
          {title: 'Description', value: 'description'}],
        items: [{slot: 'Text in button for opening modal window', type: 'String',
          description: 'Text in button for opening modal window (Open modal)'},
          {slot: 'Text in modal window', type: 'String',
            description: 'Text modal window'}],
      }
    },
  })
</script>

<style scoped>
  .myModal {
    position: relative;
    left: 2%;
  }
  .mblockquote {
    background-color: azure;
    border-left: 5px solid lightgreen;
    text-align: left;
    padding-left: 1%;
  }

</style>