<template>

  <div class="row">
    <slot></slot>
  </div>

</template>


<style>
  .row {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 1%;
  }

</style>