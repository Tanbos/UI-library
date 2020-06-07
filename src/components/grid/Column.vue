<template>

  <div :class="param">
    <slot></slot>
  </div>

</template>

<script>
  export default {
    name: "Column",
    data() {
      return {
        param: "column-" + this.cols,
      }
    },
    props: {
      cols: {
        defaults: "1",
      },
    },

  }
</script>

<style lang="less">
  @background: green;
  .column {
    background-color: @background;
    margin: 20px 0 0 0;
    color: white;
    text-size: 30px;
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
        background-color: @background;
      }
      .make-grid-mini(@i + 1);
    }
    .make-grid-mini();
  }
</style>