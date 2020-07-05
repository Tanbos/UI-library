<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <h1>MyButton</h1>

    <MyButton color="success" text="Button" @click></MyButton>
    <h1>Modal</h1>
    <Modal @open @close>
      <template v-slot:trigger>
        <button class="modal-trigger" data-target="name">Test for modal window</button>
      </template>
      <template v-slot:default>
        <div class="modal" id="name">
          <div> text in window text in window</div>
          <div> text in window text in window</div>
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

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue';
import MyButton from '@/components/MyButton.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import Modal from '@/components/Modal.vue';
import Row from '@/components/grid/Row.vue';
import Column from '@/components/grid/Column.vue';
import Carousel from '@/components/Carousel.vue';
import DataTable from '@/components/DataTable.vue';


export default Vue.extend({
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

    data() {
        return {
            size: '',
            color: '',
            arrayUrl: ['https://loremflickr.com/420/240?random=1', 'https://loremflickr.com/420/240?random=2',
                'https://loremflickr.com/420/240?random=3', 'https://loremflickr.com/420/240?random=4'],
            items: [{id: 30050, name: 'Вася', surname: 'Петров', age: 12},
                {id: 30051, name: 'Вася', surname: 'Васечкин', age: 15},
                {id: 30052, name: 'Аня', surname: 'Ааасечкин', age: 1},
                {id: 30053, name: 'Петр', surname: 'Яяяааасечкин', age: 5}],
            columns: [{title: '№', value: '_index'},
                {title: 'Имя', value: 'name'},
                {title: 'Фамилия', value: 'surname', sortable: true},
                {title: 'Возраст', value: 'age', type: 'number', sortable: true}],
            search: {
                fields: ['name', 'surname'],
                filters: [
                    (v: string): string => v.toLowerCase(), // для сравнения без учета регистра
                    // (v: string) => toKeyboardLayoutRuEn(v.toLowerCase()),
                ],
            },
        };
    },

});

// function toKeyboardLayoutRuEn(str: string) {
//     let associativeArray: { [symb: string]: string };
//     associativeArray = {
//         'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г',
//         'i': 'ш', 'o': 'щ', 'p': 'з', '[': 'х', ']': 'ъ', 'a': 'ф', 's': 'ы',
//         'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д',
//         ';': 'ж', '\'': 'э', 'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и',
//         'n': 'т', 'm': 'ь', ',': 'б', '.': 'ю', '/': '.',
//     };
//     const regexp = new RegExp('[A-z/,.;\'\\]\\[]', 'g');
//     return str.replace(regexp, function(x: string) {
//         return x === x.toLowerCase() ? associativeArray[x] : associativeArray[x.toLowerCase()].toUpperCase();
//     });
// }
</script>

<style>
  .home {
    margin-left: 1%;
  }
</style>
