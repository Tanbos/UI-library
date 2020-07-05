<template>
  <div class="pagemycarousel">
    <h1>Carousel</h1>
    <div class="description">
      The carousel is a slideshow a series of content. It includes support for previous/next controls.
      It works with a series images.
    </div>
    <h2>Sizing</h2>
    <div class="description">
      Carousels don't automatically normalize slide dimensions.
      Default size: width=420px.
      You can set the image width on &lt;MyCarousel> and have these values automatically applied to each carousel-slide
      image.
      Note that images will still be responsive and automatically grow or shrink to fit within the width of its parent
      container.
    </div>
    <div class="example">
      <Carousel :arrayUrl='["https://loremflickr.com/420/340?random=1",
      "https://loremflickr.com/420/340?random=2",
      "https://loremflickr.com/420/340?random=3", "https://loremflickr.com/420/340?random=4",
      "https://loremflickr.com/420/340?random=5", "https://loremflickr.com/420/340?random=6"]'></Carousel>

    </div>
    <vue-markdown class="mblockquote">
      ```
      &lt;Carousel :arrayUrl='["https://loremflickr.com/420/340?random=1",
      "https://loremflickr.com/420/340?random=2",
      "https://loremflickr.com/420/340?random=3", "https://loremflickr.com/420/340?random=4",
      "https://loremflickr.com/420/340?random=5", "https://loremflickr.com/420/340?random=6"]'>&lt;/Carousel>
      ```
      &ltbr&gt;
      or
      &ltbr&gt;
      ```
      html: &lt;Carousel :arrayUrl="arrayUrl">&lt;/Carousel>
      ```
      &ltbr&gt;
      ```
      JS: data() {
      return {
      arrayUrl: ["https://loremflickr.com/420/340?random=1", "https://loremflickr.com/420/340?random=2",
      "https://loremflickr.com/420/340?random=3", "https://loremflickr.com/420/340?random=4",
      "https://loremflickr.com/420/340?random=5", "https://loremflickr.com/420/340?random=6"],
      }
      }
      ```
    </vue-markdown>
    <vue-markdown>## Props</vue-markdown>
    <DataTable :columns="columns" :items="items"></DataTable>
  </div>
</template>

<script>
  import Carousel from '@/components/Carousel.vue';
  import DataTable from "../components/DataTable.vue";
  import VueMarkdown from "vue-markdown";
  import Vue from "vue";

  export default Vue.extend({
    name: 'PageMyCarousel',
    components: {
      Carousel,
      DataTable,
      VueMarkdown,
    },
    data() {
      return {
        arrayUrl: ["https://loremflickr.com/420/340?random=1", "https://loremflickr.com/420/340?random=2",
          "https://loremflickr.com/420/340?random=3", "https://loremflickr.com/420/340?random=4",
          "https://loremflickr.com/420/340?random=5", "https://loremflickr.com/420/340?random=6"],
        columns: [{title: '№', value: '_index'},
          {title: 'Props', value: 'props'},
          {title: 'Type', value: 'type'},
          {title: 'Description', value: 'description'}],
        items: [{props: 'arrayUrl', type: 'Array<string>', description: 'Use array with the URL of the images'}],
      }
    }
  })
</script>

<style scoped>
  .pagemycarousel {
    display: flex;
    flex-direction: column;
    /*align-items: start;*/
    padding: 2%;
  }

  .mblockquote {
    background-color: azure;
    border-left: 5px solid lightgreen;
    text-align: left;
    padding-left: 1%;
  }

  .example {
    margin: 10px auto;
  }

  @media screen and (max-width: 400px) {
    .example {
      margin: 10px 0;
    }
  }
</style>