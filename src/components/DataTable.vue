<template>
  <div id="dataTable">
    <!--    <div id="search" v-if="isSearch">-->
    <!--      <input type="text" v-model="valueSearch">-->
    <!--        </div>-->
    <!--    <div id="search"  >-->
    <div id="search" v-if="isSearch">
      <input type="text" v-model="valueSearch" placeholder="search">
    </div>
    <table>
      <thead>
      <tr>
        <th v-for="col in columns"
            :key="col.title"
            :title="col.title">
          {{col.title}}
          <button v-if="col.sortable==true" class="fas" :class="checkSort" @click="changeSort">
          </button>
        </th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="(item,index) in items"
          :key="item.id">
        <td v-for="col in columns"
            :key="col.value" v-if="'_index'==col.value">
          {{index+1}}
        </td>
        <td v-else>
          {{ item[col.value] }}
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

    name: 'DataTable',
    props: {
        items: Array,
        columns: Array,
        search: {},
    },
    computed: {
        // updateSearch: function (value) {
        //     this.$emit('input', value);
        //     this.valueSearch = value;
        // },
        isSearch(): boolean {
            return this.search != null;
        },
    },
    data() {
        return {
            valueSearch: '',
            checkSort: 'fa-sort',
        };
    },

    methods: {
        changeSort(): void {
            switch (this.checkSort) {
                case 'fa-sort':
                    this.checkSort = 'fa-sort-up';
                    return;
                case 'fa-sort-up':
                    this.checkSort = 'fa-sort-down';
                    return;
                case 'fa-sort-down':
                    this.checkSort = 'fa-sort';
            }
        },

    },

});
</script>

<style>
  table {
    border: 1px solid black;
    background: lemonchiffon;
    border-collapse: collapse; /* объединяем границы ячеек в одну */
  }

  td {
    border: 1px solid;
    height: 1.5rem;
  }

  thead th {
    border: 3px solid dodgerblue;
    color: black;
    background: lightblue;
    height: 2rem;
  }

  .align-right {
    text-align: right;
  }

  input {
    border: 3px solid orange;
    background: lemonchiffon;
  }

  input[type="text"]::-webkit-input-placeholder { /* for Chrome */
    color: #ffd595; /* Цвет подсказывающего текста ("Search") для окошка input */
  }
</style>