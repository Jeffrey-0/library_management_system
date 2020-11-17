<template>
  <div class="home">
    <div id="nav">
      <h1 class="title">欢迎来到<span class="game">王者农药</span></h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  methods: {
    gotoAbout(index) {
      // this.$router.push("about/"+index);
      this.$router.push({
        name: "About",
        params: {
          index: index,
        },
      });
    },
  },
};
</script>
