<template>
  <div id="login">
    <el-col id="container" :xs="24" :sm="12" :md="6">
      <el-tabs type="border-card" stretch>
        <el-tab-pane label="登录" id="loginBt">
          <login-c :toLoginC="data"></login-c>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <logon-c @logonSuccess="logonSuccess"></logon-c>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </div>
</template>

<script>
import LoginC from '../components/LoginC.vue'
import LogonC from '../components/LogonC.vue'


export default {
  data () {
    return {
      data: {
      }
    }
  },
  components: {
    LoginC,
    LogonC
  },
  methods: {
    logonSuccess (data) {
      console.log('切换登录')
      console.log(document.getElementById('tab-0'))
      document.getElementById('tab-0').click()
      console.log(data)
      this.data = data
    } 
  }
  }
</script>

<style scoped>
 #login {
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/bg_login.jpg);
  background-size: cover;
  position: relative;
 }
 #container {
  /* width: 400px; */
  /* margin: 0px auto; */
  /* margin: auto; */
  position: absolute;
  left: 50%;
  /* right: 0; */
  top: 15%;
  /* bottom: 0; */
  padding: 20px;
  /* top: 100px; */
  box-sizing: border-box;
  transform: translate(-50%, 0);
  
 }
/* .el-tabs--border-card {
background: hsla(0,0%,100%,.3);
 }*/      
 .el-button {
   width: 100%;
 }

 .el-tabs--border-card{
   background: hsla(0,0%,100%,.5);
   border: 0px solid white;
 }
</style>
