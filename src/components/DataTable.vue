<template>
  <div id="dataTable">
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
          <button v-if="col.sortable==true" @click="sortData(col)" class="fas" :class="{
            'fa-sort-up': sortColumns[col.value] === 1,
            'fa-sort':sortColumns[col.value] === 0,
            'fa-sort-down': sortColumns[col.value] === -1}">
          </button>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in actualItems"
          :key="item.id">
        <td v-for="col in columns"
            :key="col.value" v-if="'_index'==col.value">
          {{index+1}}
        </td>
        <td v-else>
          {{item[col.value] }}
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface SearchConfig {
    fields: string[];
    filters: Array<(v: string) => string>;
}

export default Vue.extend({

    name: 'DataTable',
    props: {
        items: Array,
        columns: Array,
        search: {type: Object as () => SearchConfig},
    },
    data() {
        return {
            sortColumns: {
                name: 0,
                surname: 0,
                age: 0,
            } as { [colTitle: string]: number },
            valueSearch: '',
            sortedDown: 'fa-sort-down',
            sortedUp: 'fa-sort-up',
            sortedNot: 'fa-sort',
        };
    },

    computed: {
        isSearch(): boolean {
            return this.search != null;
        },
        actualItems(): any {
            const filtered = this.items.filter((el: any) => {
                let isSearch: boolean;
                isSearch = false;
                if (this.search) { this.search.fields.forEach((field: any) => {
                    const nFilters = this.search.filters.length;
                    for (let i = 0; i < nFilters; i++) {
                        const valueS = this.valueSearch;
                        if (!isSearch && this.search.filters[i](el[field]).includes(this.search.filters[i](valueS))) {
                            isSearch = true;
                        }
                    }
                }); } else { isSearch = true; }
                return isSearch;
            });
            let actualColumn: any;
            for (const temp in this.sortColumns) {
                if (this.sortColumns[temp] !== 0) {
                    actualColumn = temp;
                }
            }

            if (actualColumn) {
                const sorted = filtered.sort((a: any, b: any) => {
                        return (typeof a[actualColumn] === 'number')
                            ? this.sortColumns[actualColumn] * (a[actualColumn] - b[actualColumn])
                            : this.sortColumns[actualColumn] * (a[actualColumn].localeCompare(b[actualColumn]));
                    },
                );
                return sorted;
            } else {
                return filtered;
            }
        },
    },

    methods: {

        sortData(col: any): any {
            let newValue = this.sortColumns[col.value];
            for (const temp in this.sortColumns) {
                if (!this.sortColumns.hasOwnProperty(temp)) { continue; }
                this.$set(this.sortColumns, temp, 0);
            }
            switch (newValue) {
                case 0:
                    newValue = 1;
                    break;
                case 1:
                    newValue = -1;
                    break;
                default :
                    newValue = 0;
            }
            this.$set(this.sortColumns, col.value, newValue);
        },
    },
});
</script>

<style>

  #dataTable{
    display: inline-block;
  }
  table {
    border: 1px solid black;
    background: lemonchiffon;
    border-collapse: collapse;
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
    color: #ffd595;
  }

</style>