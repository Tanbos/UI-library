<template>
  <div id="app">
    <!-- can change color for background, default background = grey -->
    <Navbar background="darkgreen">
      <!--      <template for logo brand>-->
      <template v-slot:brand>
        <img alt="Vue logo" src="../src/assets/logo.png">
      </template>
      <!--      <template #menu>-->
      <template v-slot:menu>
        <router-link to="/mybutton">MyButton</router-link>
        <router-link to="/mycarousel">MyCarousel</router-link>
        <router-link to="/mygrid">MyGrid</router-link>
        <router-link to="/mymodal">MyModal</router-link>
        <router-link to="/mytable">MyTable</router-link>
      </template>
    </Navbar>
    <div class="container-fluid">
      <nav class="navbar-box">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/mybutton">MyButton</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/mycarousel">MyCarousel</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/mygrid">MyGrid</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/mymodal">MyModal</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/mytable">MyTable</router-link>
          </li>
        </ul>
      </nav>
      <router-view/>
    </div>
  </div>
</template>

<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #nav, Navbar {
    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
.navbar-box{
  background-color: honeydew;
  padding: 0 5px;
}
  .navbar-nav {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    line-height: 2;
    padding: 0;
    width: auto;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .container-fluid {
    display: flex;
    flex-direction: row;
    margin: 0;
    height: 100vh;
  }

  body {
    margin: 0;
  }

  @media screen and (max-width: 400px) {
    .navbar-nav {
      flex-direction: row;
      li {
        margin: 0 10px;
        list-style: none;
      }
    }

    .container-fluid {
      flex-direction: column;
    }
  }
</style>
<script lang="ts">
import Navbar from '@/components/Navbar.vue';

export default {
    components: {Navbar},
};
</script>
