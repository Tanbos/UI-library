<template>
  <div>
    <!--     slot for trigger (element by clicking on which the modal window will be displayed)-->
    <span @click="show">
      <slot name="trigger"></slot>
    </span>
    <div class="modal-bg-dark" v-if="visible"> /* add blackout background for modal window */
      <div class="modal" v-if="visible">
        <div class="right">
          <button class="modal-close my-close-button" @click="close">X</button>
        </div>
        <div class="text-modal">
          <slot></slot> <!--  slot for text modal window-->
        </div>
        <div class="footer">
          <button class="modal-close " @click="close">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Modal',
    data() {
        return {
            visible: false,
        };
    },
    methods: {
        show(): void {
            this.visible = true;
            this.$emit('open');
        },
        close(): void {
            this.visible = false;
            this.$emit('close');
        },
    },
});
</script>

<style lang="less">

  .modal {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    background-color: lightgrey;
    padding: 5px;
  }

  .my-close-button {
    padding: 0;
    width: 20px;
  }

  .footer {
    margin-bottom: 5px;
    text-align: center;
  }

  .right {
    text-align: right;
  }

  .hidden {
    display: none;
  }

  /*  blackout background for modal window */
  .modal-bg-dark {
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    align-items: start;
    background: rgba(0, 0, 0, .7);
  }

</style>