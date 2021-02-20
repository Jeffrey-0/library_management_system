<template>
  <div id="wrap404">
    <el-button type="info" @click="$router.push('/login')" size="mini" round>返回登录</el-button>
  </div>
</template>

<script>


export default {

  }
</script>

<style scoped>
#wrap404 {
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/bg_404_2.jpg);
  background-position: center;
  background-size: cover;
  position: relative;
}
#wrap404 button {
  margin-top: 100px;
}
</style>
