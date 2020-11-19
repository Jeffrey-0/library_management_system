<template>
  <div id="index">
    <nav-bar></nav-bar>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    
      <!-- <el-row>        
      <el-col :xs="10" :sm="6" :md="4" :lg="3" class="nav">导航栏
        <nav-bar></nav-bar>
      </el-col>
      <el-col :md="18" class="content">正文</el-col>
      </el-row> -->
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
  overflow: auto;
 }
 .content {
   position: absolute;
   margin-top: 30px;
   margin-left: 400px;
   width: 890px;
   height: 550px;
   background: white;
   padding: 10px 30px;
   border-radius: 5px;
 }
 .title{
   font-size: 20px;
   font-weight: bold;
 }
  /*.nav, .content {
    height: 100%;
    box-sizing: border-box;
    margin: 20px;
    background: red;
  }*/
</style>
