<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <DataTable :columns="columns" :items="items" :search="search"></DataTable>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import DataTable from '@/components/DataTable.vue';

export default {
    name: 'Home',
    components: {
        DataTable,
        HelloWorld,
    },
    data() {
        return {
            items: [{id: 30050, name: 'Вася', surname: 'Петров', age: 12},
                {id: 30051, name: 'Вася', surname: 'Васечкин', age: 15},
                {id: 30052, name: 'Аня', surname: 'Ааасечкин', age: 1},
                {id: 30053, name: 'Петр', surname: 'Яяяааасечкин', age: 5}],
            columns: [{title: '№', value: '_index'},
                {title: 'Имя', value: 'name', sortable: false},
                {title: 'Фамилия', value: 'surname', sortable: true},
                {title: 'Возраст', value: 'age', type: 'number', sortable: true}],
            search: {
                fields: ['name', 'surname'],
                filters: [
                    // если без фильтров поиск абсолютной идентичности искомому слову
                    (v: string ) => v.toLowerCase(), // для сравнения без учета регистра
                    // (v: string) => toKeyboardLayoutRuEn(v.toLowerCase()),
                ],
            },
        };
    },

};
// function toKeyboardLayoutRuEn(str: any) {
//     let associativeArray: any;
//     associativeArray = {
//         'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г',
//         'i': 'ш', 'o': 'щ', 'p': 'з', '[': 'х', ']': 'ъ', 'a': 'ф', 's': 'ы',
//         'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д',
//         ';': 'ж', '\'': 'э', 'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и',
//         'n': 'т', 'm': 'ь', ',': 'б', '.': 'ю', '/': '.',
//     };
//     return str.replace(/[A-z/,.;'\]\[]/g, function(x: any) {
//         return x === x.toLowerCase() ? associativeArray[x] : associativeArray[x.toLowerCase()].toUpperCase();
//     });
// }
</script>
