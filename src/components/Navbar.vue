<template>
  <div class="navbar" :style="{backgroundColor : background}">
    <div class="brand">
      <slot name="brand">
        <!-- данные для логотипа - картинка  <img src="logo.png">  -->
      </slot>
    </div>
    <div class="burger" >
      <div v-if="isVisibleBurger">
        <button @click="closeBurger"><i class="fas fa-window-close fa-2x" ></i></button>
      </div>
      <div v-else>
        <button @click="openBurger"><i class="fas fa-bars fa-w-14 fa-2x"></i></button>
      </div>
    </div>
      <div class="menu" :class="visibility">
        <slot name="menu">
          <!--пункты меню -->
        </slot>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({

    name: "Navbar",
    methods: {
      openBurger: function () {
        this.isVisibleBurger = true;
        this.visibility="visible";
      },
      closeBurger: function () {
        this.isVisibleBurger = false;
        this.visibility="";
      }
    },
    data: function () {
      return {
        isVisibleBurger: false,
        visibility:""
      }
    },
    props: {
      background:{
        default:`grey`,
      }
    }
  });
</script>

<style scoped lang="less">

  .navbar {
    display: flex;
    color: lightgrey;
    align-items: center;
    justify-content: start;
  }

  .menu a {

    padding: 10px;
    text-decoration: none;
    color: #42b983;

      &.router-link-exact-active {
        color: lightgrey;
        font-weight: bold;
      }

  }


  .brand {
    display: block;
    height: 50px;
    width: 50px;
    padding-left: 10px;
  }

  .brand img {
    height: 100%;
    width: 100%;
  }

  .burger {
    display: none;
  }

  @media only screen and (max-width: 600px) {
    .navbar {
      display: inline-flex;
      width: 100%;
      flex-wrap: wrap;
    }

    .menu {
      display: none;
    }

    /*logo center */
    .brand {
      margin: auto auto;
      padding-left: 80px;
    }

    .burger {
      display: inline;
    }

    .visible {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  }

</style>