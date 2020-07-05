<template>
  <button class="my-btn" :class="[color, size]" @click="clickButton">
    <slot>
      {{text}}
    </slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

type Color = 'warning' | 'success' | 'danger' | 'info' | 'primary' | 'red' | 'green' | 'yellow' | 'blue';
type Size = 'small' | 'medium' | 'large';

export default Vue.extend({
    name: 'MyButton',
    props: {
        size: {
            type: String as () => Size,
            default: 'medium',
        },
        color: {type: String as () => Color},
        text: String,
    },
    methods: {
        clickButton() {
            this.$emit('click');
        },
    },
});
</script>

<style lang="less">
  @color-warning: #ffc107;
  @color-success: #28a745;
  @color-danger: #dc3545;
  @color-info: #17a2b8;
  @color-primary: #007bff;
  .my-btn {
    display: inline-block;
    font-family: Acme, sans-serif;
    font-size: 1rem;
    transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
    padding: .25rem .8rem;
    border-radius: 5px;
    cursor: pointer;

    &:active {
      padding-bottom: 1px;
      box-shadow: inset rgba(0, 0, 0, 1) 0 1px 3px,
      inset rgba(0, 0, 0, .6) 0 -2px 5px,
      inset rgba(252, 255, 255, .7) 0 2px 5px,
      0 1px rgba(255, 255, 255, .08);
    }

    &:hover {
      box-shadow: 0 0 40px 40px rgba(0, 0, 0, 0.2) inset;
    }
  }

  .warning, .yellow {
    background-color: @color-warning;
  }

  .success, .green {
    background-color: @color-success;
  }

  .danger, .red {
    background-color: @color-danger;
  }

  .info {
    background-color: @color-info;
  }

  .primary, .blue {
    background-color: @color-primary;
  }

  .large {
    font-size: 3rem;
    line-height: 1.5;
    border-radius: .5rem;
    padding: 1rem 2rem;
    min-height: 50px;
    min-width: 150px;
  }

  .medium {
    font-size: 1.5rem;
    line-height: 1.5;
    border-radius: .5rem;
    padding: 0.5rem 1rem;
    min-height: 40px;
    min-width: 100px;
  }

  .small {
    padding: .15rem .2rem;
    font-size: .75rem;
    border-radius: .2rem;
    min-height: 20px;
    min-width: 20px;
  }

</style>
