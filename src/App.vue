<template>
  <div id="app">
    <home msg="Welcome to Your Vue.js App" />
    <router-view></router-view>
  </div>
</template>


<script>
import Home from "./views/admin/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
</style>
