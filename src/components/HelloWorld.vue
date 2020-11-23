<template>
  <div>
    <iframe
      id="iframeId"
      :src="url"
      frameborder="0"
      class="pc iframe"
      scrolling="auto"
      @load="loadfrom"
    >
    </iframe>
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      url: "/static/xxx4.0/scene.html",
    };
  },
  mounted() {},
  methods: {
    loadfrom(val) {
      // console.log(val.path[0].contentWindow.location)
      // console.log(val.path[0].contentWindow.location.href)
      // http://localhost:8080/static/yunyaopai4.0/index.html
      let url = val.path[0].contentWindow.location.href;
      let urlArr = url.split("/");
      let urlArrLength = urlArr.length;
      if (
        urlArr[urlArrLength - 1] === "index.html" &&
        urlArr[urlArrLength - 2] === "yunyaopai4.0"
      ) {
        // console.log('ok')
        // console.log(this.$router)
        this.$router.push("/live");
      }
    },
  },
};
</script>
 
<style lang="stylus" scoped>
.iframe {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-y: hidden;
}
</style>

