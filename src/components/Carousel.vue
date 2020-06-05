<template>
  <div class="parentCarousel">
    <div class="btnCarousel">
      <button v-if="isNotStart"
              class="btnPrev"
              @click="mychangenumber(-1)">
        Prev
      </button>
      <!--<button v-else>Start</button>-->
    </div>
    <div class="carousel">
      <div class="carouselSlider" style="width: 1680px;" :style="countShift">
        <div class="carouselPhoto">
          <img v-for="url in arrayUrl"
               :src="url">
        </div>
      </div>
    </div>
    <div class="btnCarousel">
      <button v-if="isNotEnd"
              class="btnNext"
              @click="mychangenumber(1)">
        Next
      </button>
      <!--    <button v-else>End</button>-->
    </div>
  </div>
</template>

<script lang="ts">
const width = 420;
import Vue from 'vue';

export default Vue.extend({
    name: 'Carousel',
    props: {
        arrayUrl: Array,
    },
    computed: {
        countShift(): any {
            return {'margin-left': -width * this.counterImage + 'px'};
        },
        isNotStart(): boolean {
            return this.counterImage !== 0;
        },
        isNotEnd(): boolean {
            return this.counterImage < this.arrayUrl.length - 1;
        },
    },
    data() {

        return {
            counterImage: 0,
            lengthArray: {
                type: Number,
                default: 0,
            },
            shiftCarousel: {
                type: Number,
                default: 0,
            },
        };
    },
    methods: {
        mychangenumber(value: number): number {
            return this.counterImage = this.counterImage + value;
        },
    },
});
</script>

<style lang="less">

  @widthCarousel: 420px;

  .parentCarousel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    width: 1.2*@widthCarousel;
    border: 5px solid gray;
    background-color: gray;
  }

  .carousel {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: @widthCarousel;
    overflow: hidden;
  }

  .carouselSlider {
    transition: all 0.7s; /*slow transform */
  }

  .hidden {
    visibility: hidden;
  }

  .btnCarousel {
    align-self: center;
    width: @widthCarousel*0.1;
  }

  .btnPrev {
    height: 50px;
    left: 0;
    cursor: pointer;
    width: 100%;
  }

  .btnNext {
    height: 50px;
    left: @widthCarousel;
    cursor: pointer;
    width: 100%;
  }

  @media screen and (max-width: 400px) {
    .parentCarousel {
      width: 100%;
    }

    .carousel {
      width: 90%;
    }

  }
</style>

