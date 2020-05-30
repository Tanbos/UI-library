<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <Row>
      <Column :cols="1">1</Column>
      <Column :cols="2">2</Column>
      <Column :cols="5">5</Column>
    </Row>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  import Row from "@/components/grid/Row";
  import Column from "@/components/grid/Column";

  export default {
    name: 'Home',
    components: {
      HelloWorld,
      Row,
      Column
    },
    // data() {
    //   return {
    //     cols: "1",
    //   }
    // }
  }
</script>
