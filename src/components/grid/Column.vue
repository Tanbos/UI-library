<template>

  <div :class="param">
    <slot></slot>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
type Columns = string | number;

export default Vue.extend({
  name: 'Column',
  data() {
    return {
      param: 'column-' + this.cols,
    };
  },
  props: {
    cols: {
      type: String as () => Columns,
      default: 1,
    },
  },

});
</script>

<style lang="less">
  @background: green;
  .column {
    background-color: @background;
    margin: 20px 0 0 0;
    color: white;
  }

  @column: column;
  @grid-size: 12;
  .make-grid(@i:1) when (@i =< @grid-size) {
    .@{column}-@{i} {
      .column;
      grid-column-end: span @i;
      min-height: 40px;
    }
    .make-grid(@i + 1);
  }

  .make-grid();
  @media screen and (max-width: 400px) {
    .make-grid-mini(@i:1) when (@i =< @grid-size) {
      .@{column}-@{i} {
        grid-column-end: span 12;
        min-height: 40px;
      }
      .make-grid-mini(@i + 1);
    }
    .make-grid-mini();
  }
</style>