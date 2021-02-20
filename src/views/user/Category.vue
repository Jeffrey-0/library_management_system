<template>
    <div id="backgroundImg">
        <el-row>
            <el-col>
                <nav-bar></nav-bar>
            </el-col>
            <el-col>
                <div class="m_opacity m_title">
                    <div class="m_tag">
                        <div class="m_tag_item">
                            <a href="#" class="m_tag_name">数据表GV</a>
                            <div class="m_tag_number">4</div>
                        </div>
                    </div>
                    <div class="m_tag">
                        <div class="m_tag_item">
                            <a href="#" class="m_tag_name">数据表GV</a>
                            <div class="m_tag_number">4</div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col>
                <div class="m_new">
                <div class="m_new_list">
                <div class="m_new_item">
                    <div class="m_new_info">
                    <h1 class="m_new_title"><a class="m_recommend_a" href="#">标题</a> </h1>
                    <p class="m_new_text">正文正文正文正文正文正文正文正文正正文正文
                        正文正文正文正文正文正文正文正文正文正文正文正文正文
                        正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文
                        正文正文正文正文正文正文正文正文正文正文
                        正文正文正文正文正文
                        正文正文正文正文
                        正文正文
                        正文
                        
                    </p>
                    <div class="m_publish_info">
                        <div class="m_publish_avarter">
                        <img src="../../assets/logo.png" alt="">
                        <div class="m_avarter_name"><a class="m_recommend_a" href="#">作者</a></div>
                        </div>
                        <div class="m_publish_time"><i class="el_icon_star_on m_icon"></i>2021</div>
                        <span class="m_publish_time"><i class="el_icon_view
        m_icon"></i>222</span>
                        <span class="m_publish_time"><i class="el_icon_chat_dot_round
        m_icon"></i>111</span>
                    </div>
                    <div class="m_new_category"><a href="#" class="m_category_a">分类分类分类</a></div>
                    </div>
                    <div class="m_new_img">
                    <img src="../../assets/logo.png" alt="">
                    </div>
                </div>
                </div>
                <div class="m_new_list">
                <div class="m_new_item">
                    <div class="m_new_info">
                    <h1 class="m_new_title"><a class="m_recommend_a" href="#">标题</a> </h1>
                    <p class="m_new_text">正文正文正文正文正文正文正文正文正正文正文
                        正文正文正文正文正文正文正文正文正文正文正文正文正文
                        正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文
                        正文正文正文正文正文正文正文正文正文正文
                        正文正文正文正文正文
                        正文正文正文正文
                        正文正文
                        正文
                    </p>
                    <div class="m_publish_info">
                        <div class="m_publish_avarter">
                        <img src="../../assets/logo.png" alt="">
                        <div class="m_avarter_name"><a class="m_recommend_a" href="#">作者</a></div>
                        </div>
                        <div class="m_publish_time"><i class="el_icon_star_on m_icon"></i>2021</div>
                        <span class="m_publish_time"><i class="el_icon_view
        m_icon"></i>222</span>
                        <span class="m_publish_time"><i class="el_icon_chat_dot_round
        m_icon"></i>111</span>
                    </div>
                    <div class="m_new_category"><a href="#" class="m_category_a">分类分类分类</a></div>
                    </div>
                    <div class="m_new_img">
                    <img src="../../assets/logo.png" alt="">
                    </div>
                </div>
                </div>
                </div>
            </el-col>
            <el-col>
        <div class="m_page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </el-col>
        </el-row>
    </div>
</template>
<script>
import NavBar from '../../components/NavBar.vue'
export default {
  name: 'Category',
  components: {
    NavBar
  },
}
</script>
<style scoped>
#backgroundImg {
  color: black;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/bg_lake.jpg);
  background-size: cover;
  background-position: center;
  /* position: relative; */
  overflow: auto;
}
.m_opacity {
  opacity: 0.9;
}
.m_title {
    width: 92%;
    margin: 5px auto 30px;
    font-size: 16px;
    line-height: 30px;
    color: rgba(0,0,0,.6);
    margin-top: 274px;
    background: #fff;
    padding: 30px 10px;
    border-radius: 5px;
    box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
    -webkit-box-shadow: #000000 0px 0px 10px;
}
.m_tag {
    margin: 5px 0;
    display: inline-block;
}
.m_tag_item {
    text-align: left;
    display: inline-block;
    position: relative;
    margin: 0 5px;
    cursor: pointer;
}
.m_tag_name {
    padding: 11px 21px;
    border: 1px solid #00B5AD;
    border-right: none;
    border-radius: 5px 0 0 5px;
    text-decoration: none;
    color: #00B5AD;
}
.m_tag_number {
    display: inline-block;
    /* width: 0x;
    height: 0px; */
    /* border: 1px solid #00B5AD;
    border-radius: 0 5px  5px 0; */
    color: #00B5AD;
    position: relative;
    left: -2px;
    padding:5px 14px;
    border: #00B5AD solid 1px;
    border-radius: 0 5px 5px 0;
}
.m_tag_number:before{
    box-sizing: content-box;
    box-sizing: content-box;
    width: 0px;
    height: 0px;
    position: absolute;
    top: 11px;;
    left: -16px;
    padding:0;
    border-right: 8px solid #FFFFFF;
    border-top:8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left:8px solid transparent;
    display: block;
    content:'';
    z-index: 12;
}
.m_tag_number:after{
    box-sizing: content-box;
    width: 0px;
    height: 0px;
    position: absolute;
    top: 10px;;
    left: -18px;
    padding:0;
    border-right: 9px solid #00B5AD;
    border-top:9px solid transparent;
    border-bottom:9px solid transparent;
    border-left:9px solid transparent;
    display: block;
    content:'';
    z-index:10
}
.m_recommend_a {
  width: 100%;
  display: block;
  color: #333;
  overflow: hidden;
  position: relative;
  text-decoration: none;
}
.m_new {
  width: 90%;
  margin: 0 auto;
  padding: 0 21px;
  background-color: #fff;
  border-radius: 5px; 
  border: 1px solid rgba(34,36,38,.15);
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
  -webkit-box-shadow: #000000 0px 0px 10px; 
  opacity: 0.9;
}
.m_new_list {
  margin: 0 auto;
  padding:28px 0;
  text-align: left;
  opacity: 0.9;
  border-bottom: 1px solid rgba(34,36,38,.15);
}
.m_new_info {
  padding: 14px;
  width: 70%;
  display: inline-block;
  text-align: left;
}
.m_new_title {
  font-size: 25px;
  font-weight: 700;
  padding: 0px 10px;
  margin-top: 0;
  margin-bottom: 10px;
}
.m_new_text {
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
.m_publish_info {
  margin-top: 30px;
  padding: 14px;
  height: 20px;
  display: inline-block;
  position: relative;
  vertical-align: top;
}
.m_publish_avarter {
  display: inline-block;
}
.m_publish_avarter img {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
.m_avarter_name {
  display: inline-block;
  margin-left: 5px;
  color: #1e70bf;
  font-size: 14px;
  line-height: 14px;
  vertical-align: middle;
}
.m_publish_time {
  color: rgba(0,0,0,.4);
  font-size: 16px;
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;

}
.m_new_category {
  float: right;
  border-radius: 5px;
  border: 1px solid #00B5AD;
  background-color: #fff;
  cursor: pointer;
  padding: 3px;
  position: relative;
  bottom: -45px;
}
.m_category_a {
  text-decoration: none;
  color: #00B5AD;
  font-size: 14px;

}
.m_new_img {
  width: 25%;
  height: 100%;
  display: inline-block;
  position: relative;
  vertical-align: top;
  margin-top: 14px;
  margin-left: 10px;
}
.m_new_img img {
  width: 100%;
  height: 13vw;
  vertical-align: bottom;
  border-radius: 5px;
}
.m_page {
  background: #fff;
  border-radius: 5px;
  width: 92%;
  margin: 30px auto 100px;
  padding: 10px;
  opacity: 0.9;
}
</style>