<template>
  <div class="pagemytable">
    <h1>Page MyTable</h1>
    <p>Component DataTable supports filtering, sorting.</p>
    <p>The fields prop is used to customize the table columns headings, and in which order the columns of data are
      displayed.
      The field object keys are used to extract the value from each item (record) row,
      and to provide additional features such as enabling sorting on the column.</p>
    <div class="mblockquote">
      <vue-markdown>

        ```
        columns: [{title: '№', value: '_index'},
        ```
        &ltbr&gt;
        ```
        {title: 'Имя', value: 'name'},
        ```
        &ltbr&gt;
        ```
        {title: 'Фамилия', value: 'surname', sortable: true},
        ```
        &ltbr&gt;
        ```
        {title: 'Возраст', value: 'age', type: 'number', sortable: true}]
        ```
      </vue-markdown>

    </div>


    <p>Items is the table data in array format, where each record (row) data are keyed objects. Example format:</p>
    <div class="mblockquote">
      <vue-markdown>

        ```
        items: [{id: 30050, name: 'Вася', surname: 'Петров', age: 12},
        ```
        &ltbr&gt;
        ```
        {id: 30051, name: 'Вася', surname: 'Васечкин', age: 15},
        ```
        &ltbr&gt;
        ```
        {id: 30052, name: 'Аня', surname: 'Асечкин', age: 1},
        ```
        &ltbr&gt;
        ```
        {id: 30053, name: 'Петр', surname: 'Ясечкин', age: 5}]
        ```
      </vue-markdown>

    </div>
    <p>Example for use component DataTable</p>
    <vue-markdown class="mblockquote">

      ```
      &lt;DataTable :columns="columns" :items="items" :search="search">&lt;/DataTable>
      ```
    </vue-markdown>
    <div class="example">
      <DataTable :columns="columns" :items="items" :search="search"></DataTable>
    </div>
    <div>
      <vue-markdown>## Props</vue-markdown>
      <DataTable :columns="propscolumns" :items="propsitems"></DataTable>
    </div>
  </div>

</template>

<script>
  import DataTable from '@/components/DataTable.vue';
  import VueMarkdown from 'vue-markdown';

  export default {
    name: "PageMyTable",
    components: {
      DataTable,
      VueMarkdown,
    },
    data() {
      return {
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
            v => v.toLowerCase(),
            v => toKeyboardLayoutRuEn(v.toLowerCase()),
          ],
        },
        propsitems: [{
          props: 'items', type: 'string',
          description: 'Items is the table data in array format'
        },
          {
            props: 'columns', type: 'string',
            description: 'The table columns headings'
          },
          {
            props: 'search', type: 'fields: string[];\n' +
              'filters: Array<(v: string) => string',
            description: 'Contains fields that will be searched (filtered) and additional functions'
          },
        ],
        propscolumns: [{title: '№', value: '_index'},
          {title: 'Props', value: 'props'},
          {title: 'Type', value: 'type'},
          {title: 'Description', value: 'description'}],
      }
    }
  }

  function toKeyboardLayoutRuEn(str) {
    let associativeArray = {
      "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г",
      "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы",
      "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д",
      ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
      "n": "т", "m": "ь", ",": "б", ".": "ю", "/": "."
    };
    return str.replace(/[A-z/,.;\'\]\[]/g, function (x) {
      return x == x.toLowerCase() ? associativeArray[x] : associativeArray[x.toLowerCase()].toUpperCase();
    });
  }
</script>

<style scoped>
  .pagemytable {
    margin: 2%;
  }

  .mblockquote {
    background-color: azure;
    border-left: 5px solid lightgreen;
    text-align: left;
    padding-left: 1%;
  }

  .example {
    margin-top: 10px;
    text-align: center;
  }
</style>