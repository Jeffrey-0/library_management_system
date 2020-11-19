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
   margin-top: 10px;
   margin-left: 370px;
   width: 910px;
   height: 570px;
   background: white;
   padding: 10px 30px;
   border-radius: 5px;
   overflow: auto;
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

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
	width: 5px;
	height: 5px;
	background-color: #F5F5F5;
}
 
/*定义滚动条轨道 内阴影+圆角
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
	border-radius: 3px;
	background-color: #F5F5F5;
}*/
 
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
	border-radius: 3px;
	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,.3);
	background-color: #555;
}
</style>
