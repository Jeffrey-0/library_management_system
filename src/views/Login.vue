<template>
  <div id="login">
    <div id="container">
      <el-tabs type="border-card" stretch>
        <el-tab-pane label="登录">
          <login-c></login-c>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <logon-c></logon-c>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import LoginC from '../components/LoginC.vue'
import LogonC from '../components/LogonC.vue'


export default {
    components: {
      LoginC,
      LogonC
    }
  }
</script>

<style scoped>
 #login {
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/bg_login.jpg);
  background-size: cover;
 }
 #container {
  width: 400px;
  margin: 0px auto;
  position: relative;
  padding: 20px;
  top: 100px;
  box-sizing: border-box;
  
 }
/* .el-tabs--border-card {
background: hsla(0,0%,100%,.3);
 }*/      
 .el-button {
   width: 100%;
 }

 .el-tabs--border-card{
   background: hsla(0,0%,100%,.3);
   border: 0px solid white;
 }
</style>
