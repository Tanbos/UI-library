<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Row"
  }
</script>

<style lang="less">
  .row {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 1%;
  }

</style>