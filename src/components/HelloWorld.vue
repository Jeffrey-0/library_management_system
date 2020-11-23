<template>
  <div class="container">
    <nav-header></nav-header>
    <nav-right></nav-right>
    <tag />
  </div>
</template>
<script>
import NavHeader from "@/components/NavHeader.vue";
import NavRight from "@/components/NavRight.vue";
import Tag from "@/components/Tag.vue";
export default {
  components: {
    NavHeader,
    Tag,
    NavRight,
  },
};
</script>
<style scoped>
.container {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #f0f0f0;
}
</style>
