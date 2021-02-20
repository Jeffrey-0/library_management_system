<template>
  <div id="index">
    <el-row>
      <el-col>
        <nav-bar></nav-bar>
      </el-col>
      <el-col :xs="20" :sm="20" class="m-opacity m-title">
        <i class="el-icon-star-on m-icon"></i>
        正文</el-col>
      <el-col class="m-recommend">
        <div class="m-recommend-item">
              <a href="#" class="m-recommend-a">
              <img src="../../assets/img/bg_index.jpg" alt="" class="m-img">
              <span class="m-img-title"><span style="padding-left:6px">案发</span></span>
            </a>
          </div>
          <div class="m-recommend-item">
            <a href="#" class="m-recommend-a">
              <img src="../../assets/logo.png" alt="" class="m-img">
              <span class="m-img-title"><span style="padding-left:6px">案发</span></span>
            </a>
          </div>
          <div class="m-recommend-item">
            <a href="#" class="m-recommend-a">
              <img src="../../assets/img/bg_404.jpg" alt="" class="m-img">
              <span class="m-img-title"><span style="padding-left:6px">案发</span></span>
            </a>
          </div>
        <div class="m-recommend-item">
            <a href="#" class="m-recommend-a">
              <img src="../../assets/img/bg_404.jpg" alt="" class="m-img">
              <span class="m-img-title"><span style="padding-left:6px">案发</span></span>
            </a>
          </div>
      </el-col>
      <div class="m-new-blogs">
        <el-col :xs="20" :sm="20" class="m-opacity m-title">
        <i class="el-icon-s-flag m-icon"></i>
        最新博文</el-col>
      <el-col>
        <div class="m-new-list">
          <div class="m-new-item">
            <div class="m-new-info">
              <h1 class="m-new-title"><a class="m-recommend-a" href="#">标题</a> </h1>
              <p class="m-new-text">正文正文正文正文正文正文正文正文正正文正文
                正文正文正文正文正文正文正文正文正文正文正文正文正文
                正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文
                正文正文正文正文正文正文正文正文正文正文
                正文正文正文正文正文
                正文正文正文正文
                正文正文
                正文
              </p>
              <div class="m-publish-info">
                  <div class="m-publish-avarter">
                  <img src="../../assets/logo.png" alt="">
                  <div class="m-avarter-name"><a class="m-recommend-a" href="#">作者</a></div>
                </div>
                <div class="m-publish-time"><i class="el-icon-star-on m-icon"></i>2021</div>
                <span class="m-publish-time"><i class="el-icon-view
 m-icon"></i>222</span>
                <span class="m-publish-time"><i class="el-icon-chat-dot-round
 m-icon"></i>111</span>
              </div>
              <div class="m-new-category"><a href="#" class="m-category-a">分类分类分类</a></div>
            </div>
            <div class="m-new-img">
              <img src="../../assets/logo.png" alt="">
            </div>
          </div>
        </div>
      </el-col>
      <el-col>
        <div class="m-page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </el-col>
      </div>
      
    </el-row>
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
  },
  created() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    console.log("sessionStorage", sessionStorage.getItem("user"));
    console.log(user && user.userName, user && user.userId);
  },
};
</script>

<style scoped>
#index {
  color: black;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/bg_lake.jpg);
  background-size: cover;
  background-position: center;
  /* position: relative; */
  overflow: auto;
}
.content {
  /* position: absolute; */
  /* margin: 274px 9% 0 9%;
  width: 80%; */
  
  /* background: white; */
  
  padding: 10px 30px;
  border-radius: 5px;
  float: center;
  overflow: auto;
  
}
.m-opacity {
  opacity: 0.9;
}
.m-title {
  font-size: 16px;
  line-height: 30px;
  color: rgba(0,0,0,.6);
  margin: 0 8%;
  margin-top: 274px;
  background: #fff;
  padding: 10px 30px;
  border-radius: 5px;
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
  -webkit-box-shadow: #000000 0px 0px 10px;
}
.m-icon {
  font-size: 16px;
}
.m-recommend{
  margin-top: 30px;
  width: 100%;
}
.m-recommend-a {
  width: 100%;
  display: block;
  color: #333;
  overflow: hidden;
  position: relative;
  text-decoration: none;
}
.m-img {
  width: 100%;
  height: 13vw;
  border-radius: 3px;
  object-fit: cover;
  opacity: 0.9;
  overflow: hidden;
}

.m-recommend-item {
  width: 22% !important;
  display: inline-block;
  padding: 20px 7px;
  position: relative;
}
.m-img-title {
  position: absolute;
  left: 0px;
  bottom: 4px;
  width: 100%;
  font-size: 18px;
  text-align: left;
  color: #ffffff;
  background-color: rgba(0, 0, 0, .60);
  line-height: 40px;
  height: 40px;
  border-radius: 0 0 3px 3px;
  opacity: 0.8;
}
.m-new-list {
  width: 90%;
  margin: 14px auto;
  padding:28px 21px;
  background-color: #fff;
  text-align: left;
  border-radius: 5px;
  border: 1px solid rgba(34,36,38,.15);
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
  -webkit-box-shadow: #000000 0px 0px 10px;
  opacity: 0.9;
}
.m-new-info {
  padding: 14px;
  width: 70%;
  display: inline-block;
  text-align: left;
}
.m-new-title {
  font-size: 25px;
  font-weight: 700;
  padding: 0px 10px;
  margin-top: 0;
  margin-bottom: 10px;
}
.m-new-text {
  margin: 35px 0 0;
  font-weight: 300;
  letter-spacing: 1px;
  line-height: 1.8;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: rgba(0,0,0,0.6);
}
.m-publish-info {
  margin-top: 30px;
  padding: 14px;
  height: 20px;
  display: inline-block;
  position: relative;
  vertical-align: top;
}
.m-publish-avarter {
  display: inline-block;
}
.m-publish-avarter img {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
.m-avarter-name {
  display: inline-block;
  margin-left: 5px;
  color: #1e70bf;
  font-size: 14px;
  line-height: 14px;
  vertical-align: middle;
}
.m-publish-time {
  color: rgba(0,0,0,.4);
  font-size: 16px;
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;

}
.m-new-category {
  float: right;
  border-radius: 5px;
  border: 1px solid #00B5AD;
  background-color: #fff;
  cursor: pointer;
  padding: 3px;
  position: relative;
  bottom: -45px;
}
.m-category-a {
  text-decoration: none;
  color: #00B5AD;
  font-size: 14px;

}
.m-new-img {
  width: 25%;
  height: 100%;
  display: inline-block;
  position: relative;
  vertical-align: top;
  margin-top: 14px;
  margin-left: 10px;
}
.m-new-img img {
  width: 100%;
  height: 13vw;
  vertical-align: bottom;
  border-radius: 5px;
}
.m-page {
  background: #fff;
  border-radius: 5px;
  width: 90%;
  margin: 0px auto 100px;
  padding: 10px;
  opacity: 0.9;
}


/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
	border-radius: 3px;
	background-color: #F5F5F5;
}*/

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
</style>
