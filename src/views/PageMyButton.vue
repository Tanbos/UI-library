<template>
  <div class="pagemybutton">
    <Vue-markdown># MyButton</Vue-markdown>
    <div class="description">
      Use custom MyButton component for actions in forms, dialogs, and more.
      Includes support for a handful of contextual variations, sizes.
      The &lt;MyButton&gt; component generally renders a &lt;button&gt; element.
    </div>
    <div class="example">
      <MyButton></MyButton>
      <MyButton>Button</MyButton>
    </div>
    <div class="mblockquote">
      <vue-markdown>

        ```
        &lt;MyButton>&lt;/MyButton>
        ```
        &ltbr&gt;
        ```
        &lt;MyButton>Button&lt;/MyButton>
        ```
      </vue-markdown>
    </div>
    <vue-markdown>## Color variants</vue-markdown>
    <div class="description">
      You can specify the color of the button by setting the desired option
      (blue - primary, green-success, yellow - warning, red - danger, turquoise - info).

      <div class="example" v-for="col in arrayStatusColor" :key="col">
        <MyButton :color="col">{{col}}</MyButton>
        <blockquote>
          <div data-line-start="25" data-line-end="31">&lt;MyButton color=“{{col}}”&gt;
            {{col}} &lt;/MyButton&gt;
          </div>
        </blockquote>
      </div>
    </div>

    <vue-markdown>## Size</vue-markdown>
    <div class="description">
      You can specify the button size by setting the desired parameter (small, medium, large).

      <div class="example" v-for="size in arraySize">
        <MyButton :size="size">{{size}}</MyButton>
        <div class="mblockquote">
          <vue-markdown>
            ```
            &lt;MyButton size=“{{size}}”&gt;{{size}}&lt;/MyButton&gt;
            ```
          </vue-markdown>
        </div>
      </div>
    </div>

    <vue-markdown>## Other</vue-markdown>
    <div class="description">
      You can specify the size and color of the button at the same time by setting the desired settings.
      <div class="example" v-for="col in arrayStatusColor">
        <span v-for="size in arraySize">
          <MyButton :color="col" :size="size">{{col}}</MyButton>
        </span>
        <blockquote>
           <span v-for="size in arraySize">
          <p class="has-line-data" data-line-start="27" data-line-end="33">
            &lt;MyButton color=“{{col}}” size=“{{size}}”&gt;{{col}}&lt;/MyButton&gt;<br>
          </p>
              </span>
        </blockquote>
      </div>
    </div>
    <vue-markdown>## Props</vue-markdown>
    <DataTable :columns="columns" :items="items"></DataTable>
    <vue-markdown>## Emit</vue-markdown>
    <DataTable :columns="emitcolumns" :items="emititems"></DataTable>
  </div>
</template>

<script lang="ts">
import MyButton from '@/components/MyButton.vue';
import VueMarkdown from 'vue-markdown';
import Vue from 'vue';
import DataTable from '@/components/DataTable.vue';

export default Vue.extend({
    name: 'mybutton',
    components: {
        MyButton,
        DataTable,
        VueMarkdown,
    },

    data() {
        return {
            text: 'Button',
            arraySize: ['small', 'medium', 'large'],
            arrayStatusColor: ['primary', 'warning', 'success', 'danger', 'info'],
            columns: [{title: '№', value: '_index'},
                {title: 'Props', value: 'props'},
                {title: 'Type', value: 'type'},
                {title: 'Default', value: 'default'},
                {title: 'Description', value: 'description'}],
            items: [{
                props: 'color',
                type: 'string',
                description: 'Applies one of theme color variants ' +
                    '("primary", "warning", "success", "danger", "info")' +
                    ' or color ("red", "yellow", "green", "blue")  to the component',
            },
                {
                    props: 'size',
                    type: 'string',
                    default: 'medium',
                    description: 'Set the size of the component\'s appearance ("small", "medium", "large")',
                },
                {
                    props: 'text',
                    type: 'string',
                    description: 'Use for default text in button',
                }],
            emitcolumns: [{title: '№', value: '_index'},
                {title: 'Event', value: 'event'},
                {title: 'Arg', value: 'arg'},
                {title: 'Description', value: 'description'}],
            emititems: [{
                event: 'close',
                arg: '',
                description: 'Modal is closed',
            },
                {
                    event: 'open',
                    arg: '',
                    description: 'Modal window open',
                }],
        };
    },
});
</script>

<style scoped>

  .example {
    margin-top: 10px;
    text-align: center;
  }

  .description {
    text-align: left;
  }

  vue-markdown {
    background-color: red;
    border: 5px green;
  }

  blockquote {
    background-color: azure;
    border-left: 5px solid lightgreen;
    text-align: left;
    padding-left: 1%;
  }

  .mblockquote {
    background-color: azure;
    border-left: 5px solid lightgreen;
    text-align: left;
    padding-left: 1%;
  }

  .pagemybutton {
    margin: 2%;
  }

</style>