<template>
  <div id="index">
    <!-- <nav-bar></nav-bar>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div> -->
    
    <el-row class="wrap">        
      <!-- <el-col :xs="0" :sm="0" :md="4" :lg="4" :xl="4" class="nav" :offset="1">导航栏
        
      </el-col> -->
      <el-col :md="5" class="nav" :md:offset="1">
        <nav-bar></nav-bar>
      </el-col>
      <el-col :md="16" class="content" :offset="1">正文</el-col>
    </el-row>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
export default {
  name: 'Index',
  components: {
    NavBar
  }
}
</script>

<style scoped>
 #index {
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/bg_index.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
 }
/* .content {
   position: absolute;
   margin-top: 30px;
   margin-left: 400px;
   width: 900px;
   height: 550px;
   background: white;
   padding: 10px;
   border-radius: 5px;
 }*/
  .wrap {
    width: 100%;
    height: 100%;
  }
  .nav, .content {
    height: 85%;
    box-sizing: border-box;
    background: red;
  }
  .nav {
    background: black;
  }
</style>
