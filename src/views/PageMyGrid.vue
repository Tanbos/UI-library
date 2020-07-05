<template>
  <div class="pagemygrid">
    <h1>Page my grid: components Column and Row</h1>
    <p>Use components Column and Row to build layouts of all shapes and sizes thanks to a twelve column system.
      The default &lt;Column> is a responsive, fixed-width container, meaning its max-width changes at
      each viewport width breakpoint.</p>
    <p>
      When viewed on a mobile device, all speakers will have a full-screen width.
    </p>


    <Row>
      <Column cols="1">1</Column>
      <Column cols="2">2</Column>
      <Column cols="5">5</Column>
      <Column cols="3">3</Column>
    </Row>

    <blockquote>
      <p class="has-line-data" data-line-start="27" data-line-end="43">
        &lt;Row&gt;<br>
        &lt;Column cols=“1”&gt;1&lt;/Column&gt;<br>
        &lt;Column cols=“2”&gt;2&lt;/Column&gt;<br>
        &lt;Column cols=“5”&gt;5&lt;/Column&gt;<br>
        &lt;Column cols=“3”&gt;3&lt;/Column&gt;<br>
        &lt;/Row&gt;<br></p>
    </blockquote>
    <vue-markdown>## Props</vue-markdown>
    <DataTable :columns="columns" :items="items"></DataTable>
  </div>
</template>

<script>
  import Row from '@/components/grid/Row.vue';
  import Column from '@/components/grid/Column.vue';
  import VueMarkdown from "vue-markdown";
  import DataTable from "@/components/DataTable.vue";
  import Vue from "vue";

  export default Vue.extend({
    name: "PageMyGrid",
    components: {
      Row,
      Column,
      VueMarkdown,
      DataTable,
    },
    data() {
      return {
        columns: [{title: '№', value: '_index'},
          {title: 'Props', value: 'props'},
          {title: 'Type', value: 'type'},
          {title: 'Default', value: 'default', type: 'number'},
          {title: 'Description', value: 'description'}],
        items: [{
          props: 'cols',
          type: 'number',
          default: 1,
          description: 'Number of columns the grid cell spans'
        }],
      }
    }
  })
</script>

<style scoped>
  blockquote {
    background-color: azure;
    border-left: 5px solid lightgreen;
    text-align: left;
    padding-left: 1%;
  }

  .pagemygrid {
    margin: 2%;
  }
</style>