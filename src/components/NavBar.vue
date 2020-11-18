<template>
  <div id="container">
    <div class="portrait" title="进入个人信息" @click="toInfo"></div>
    <div class="username"  @click="toInfo">小疯子</div>
    <div class="nav">
      <router-link  to="/index/library">书库</router-link>
      <router-link  to="/index/bookshelf">书架</router-link>
      <router-link  to="/index/history">历史</router-link>
    </div>
    <div class="notice_head" @click="toNotice">公告</div>
    <div class="notice">公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容</div>
    <!-- <div class="notice">公告内容</div> -->
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  methods: {
    toInfo () {
      if (this.$route && this.$route.path !== '/index/info') {
        this.$router.push('/index/info')
      }
    },
    toNotice () {
      if (this.$route && this.$route.path !== '/index/notice') {
        this.$router.push('/index/notice')
      }
    }
  }
}
</script>

<style scoped>
#container {
  position: absolute;
  top: 50px;
  left: 70px;
  width: 280px;
  height: 450px;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
}
.portrait {
  cursor: pointer;
  margin: 20px auto;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-image: url(../assets/img/avatar.png);
  background-size: 100%;
}
.portrait:hover {
  transform: rotate(360deg);
  transition: 1s;
}
.username {
  font-size: 20px;
  cursor: pointer;
}
.nav {
  margin: 20px;
  padding: 12px;
  border-top:1px dashed #dadada;
  border-bottom:1px dashed #dadada;
}
.nav a {
  text-decoration: none;
  margin: 20px;
  color: black;
}
.notice {
  margin: 0px auto;
  width: 80%;
  height: 120px;
  border: 1px dashed #dadada;
  overflow-y: scroll;
  line-height: 20px;
  padding: 5px;
}
.notice_head {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
}

/* 定义滚动条 */

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