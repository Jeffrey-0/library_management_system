<template>
    <div id="Friends">
        <div>
            <nav-bar></nav-bar>
        </div>
        <div class="m_friends">
            <div class="friends_explain">
                <h2>交换链接须知</h2>
                <div class="explain_contain">
                    <div class="explain_tilte">网站要求</div>
                    <div class="explain_content">
                        <li>无色情内容，无政治敏感内容，网站要能长期正常访问</li>
                        <li>二十篇以上个人原创文章，两个月内有新文章更新</li>
                        <li>原创博客、技术博客、游记博客优先</li>
                        <li>需要交换友链，先把本站添加到你的网站中，然后根据下面的格式，给我发email或在留言板给我留言~</li>
                    </div>
                    <div class="explain_tilte">网站要求</div>
                    <div class="explain_content">
                        <li>无色情内容，无政治敏感内容，网站要能长期正常访问</li>
                        <li>二十篇以上个人原创文章，两个月内有新文章更新</li>
                        <li>原创博客、技术博客、游记博客优先</li>
                        <li>需要交换友链，先把本站添加到你的网站中，然后根据下面的格式，给我发email或在留言板给我留言~</li>
                    </div>
                </div>
            </div>
            <div class="friends_links">
                <div class="links_contain">
                    <div class="links_content">
                        <div class="links_item">
                           <a href="#">
                               <img src="../../assets/img/bg_login.jpg" alt="">
                               <div class="item_info">名字</div>
                           </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from '../../components/NavBar.vue'
export default {
    name: "Friends",
    components: {
        NavBar,
    }  
}
</script>
<style scoped>
#Friends {
  color: black;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/bg_lake.jpg);
  background-size: cover;
  background-position: center;
  /* position: relative; */
  overflow: auto;
}
.m_friends {
  width: 90%;
  margin: 100px auto;
  text-align: left;
}
.friends_explain {
    width: 100%;
    height: 100%;
    padding:28px 21px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid rgba(34,36,38,.15);
    box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
    -webkit-box-shadow: #000000 0px 0px 10px;
    opacity: 0.9;
}
.friends_explain h2 {
    font-weight: 700;
    font-size: 30px;
    font-family: Tahoma,Helvetica,Arial,'宋体',sans-serif;
    color: rgba(0,0,0,.87);
    text-align: center;
}
.explain_contain {
    padding: 10px 50px;
}
.explain_tilte {
    font-family: Tahoma,Helvetica,Arial,'宋体',sans-serif;
    font-weight: 500;
    font-size: 20px;
}
.explain_content {
    padding: 20px 30px;
}
.explain_content li {
    font-family: Tahoma,Helvetica,Arial,'宋体',sans-serif;
    line-height: 32px;
    font-weight: 500;
}
.friends_links {
    width: 100%;
    height: 100%;
    margin-top: 30px;
    padding:28px 21px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid rgba(34,36,38,.15);
    box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
    -webkit-box-shadow: #000000 0px 0px 10px;
    opacity: 0.9;
}
.links_contain {
    width: 90%;
    height: 100%;
    margin: 0 auto;
}
.links_content {
    width:100%;
    height: 100%;
}
.links_item {
    width: 228px;
    height: 258px;
    display: inline-block;
}
.links_item a {
    text-decoration: none;
    display: block;
    position: relative;
    margin-top: 10px;
    width: 160px;
    height: 220px;
    border: 1px solid #999;
    box-shadow: 5px 5px 5px #999;
    border-radius: 8px;
}
.links_item a img {
    width: 158px;
    height: 170px;
    border-radius: 8px 8px 0px 0px;
}
.item_info {
    color: rgba(0,0,0,.87);
    text-align: center;
    font-weight: 700;
    font-family: Tahoma,Helvetica,Arial,'宋体',sans-serif;
    margin-top: 10px;
}
</style>