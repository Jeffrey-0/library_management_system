<template>
  <div>
    <nav-bar></nav-bar>
    <nav-right></nav-right>
    <tag />
    <div :class="{ 'content-box': true, 'content-collapse': collapse }">
      <div class="crumbs">
        <i :class="icon"></i>
        <span>{{ tagName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import NavRight from "@/components/NavRight.vue";
import Tag from "@/components/Tag.vue";
export default {
  name: "User",
  data() {
    return {
      collapse: true,
      tagName: "",
      icon: "",
    };
  },
  methods: {
    isCollapse(val) {
      this.collapse = val;
    },
  },
  mounted() {
    this.$eventBus.$on("eventBusName", (val) => {
      this.isCollapse(val);
    });
    this.$eventBusTag.$on("eventBusName", (val) => {
      this.tagName = val;
    });
    this.$eventBusiIcon.$on("eventBusName", (val, index) => {
      console.log(val);
      this.icon = index;
    });
  },
};
</script>
<style scoped>
.content-box {
  position: absolute;
  left: 200px;
  right: 0;
  top: 120px;
  bottom: 0;
  width: auto;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
}
.content-collapse {
  left: 65px;
}
</style>