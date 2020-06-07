<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <h1>MyButton</h1>
    <MyButton size="large" color="danger" :text="text" @click="clickMyButton('text')"></MyButton>
    <MyButton size="small" color="warning" :text="text2" @click="clickMyButton('text2')"></MyButton>
    <MyButton color="success" text="Button" @click="clickMyButton"></MyButton>
    <h1>Modal</h1>
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
    <h1>Grid</h1>
    <Row>
      <Column :cols="1">1</Column>
      <Column :cols="2">2</Column>
      <Column :cols="5">5</Column>
    </Row>
    <h1>Carousel</h1>
    <Carousel :arrayUrl="arrayUrl"></Carousel>
    <h1>Table</h1>
    <DataTable :columns="columns" :items="items" :search="search"></DataTable>
  </div>
</template>

<script >
  // @ is an alias to /src

  import MyButton from "@/components/MyButton.vue";
  import HelloWorld from '@/components/HelloWorld.vue';
  import Modal from "@/components/Modal.vue";
  import Row from "@/components/grid/Row";
  import Column from "@/components/grid/Column";
  import Carousel from "@/components/Carousel.vue";
  import DataTable from '@/components/DataTable.vue';

  export default {
    name: 'Home',
    components: {
      MyButton,
      HelloWorld,
      Modal,
      Row,
      Column,
      Carousel,
        DataTable,
    },

    methods: {
      clickMyButton: function (e) {
        this[e] = "Pressed"
      },
    },

    data() {
      return {
          size: "",
          color: "",
          text: "Button",
          text2: "Button2",
        arrayUrl: ["https://loremflickr.com/420/240?random=1", "https://loremflickr.com/420/240?random=2",
          "https://loremflickr.com/420/240?random=3", "https://loremflickr.com/420/240?random=4"],
          items: [{id: 30050, name: 'Вася', surname: 'Петров', age: 12},
              {id: 30051, name: 'Вася', surname: 'Васечкин', age: 15},
              {id: 30052, name: 'Аня', surname: 'Ааасечкин', age: 1},
              {id: 30053, name: 'Петр', surname: 'Яяяааасечкин', age: 5}],
          columns: [{title: '№', value: '_index'},
              {title: 'Имя', value: 'name'},
              {title: 'Фамилия', value: 'surname', sortable: true},
              {title: 'Возраст', value: 'age', type: 'number', sortable: true}],
          search: {
              fields: ['title'],
              filters: [
                  // если без фильтров поиск абсолютной идентичности искомому слову
                  // v => v.toLowerCase(), // для сравнения без учета регистра
                  // v => toKeyboardLayoutRuEn(v.toLowerCase()),
              ],
          },
      }
    }

  }



</script>



