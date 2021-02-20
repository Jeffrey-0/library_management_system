<template>
    <div id="Details">
        <el-row>
            <el-col><nav-bar></nav-bar></el-col>
        </el-row>
        <div class="m-details-contain">
            <!-- 文章详情 -->
            <div class="m-contain-content"><article v-html="value" ></article></div>
            <!-- end -->
            <div class="m-end">
                <el-divider><div class="m-end-text">END</div></el-divider>
            </div>
            <!-- 评论区 -->
            <div class="m-comment">
                <!-- 评论列表 -->
                <div class="m-comment-list">
                    <div>
                        <h3 class="comment-list-title">评论</h3>
                        <div class="comment">
                            <a href="#" class="avatar"><img src="../../assets/logo.png" alt=""></a>
                            <div class="content">
                                <a href="#" class="author"><span>author</span></a>
                                <div class="metadata"><span>2021-01-23:59</span></div>
                                <div class="text">内容</div>
                                <div class="actions">
                                    <a href="#" class="reply">回复</a>
                                </div>
                            </div>
                            <!-- 子集评论 -->
                            <div class="comment-child">
                                <div class="comment">
                                    <a href="#" class="avatar"><img src="../../assets/logo.png" alt=""></a>
                                    <div class="content">
                                        <a href="#" class="author">
                                            <span>author</span></a>
                                        <div class="author-tag">栈主</div>
                                        <span class="mteal">@ author</span>
                                        
                                        <div class="metadata"><span>2021-01-23:59</span></div>
                                        <div class="text">内容</div>
                                        <div class="actions">
                                            <a href="#" class="reply">回复</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-comment-reply">
                    <div class="comment-form">
                        <el-input
                            type="textarea"
                            :rows="7"
                            placeholder="请输入评论信息..."
                            v-model="textarea">
                            </el-input>
                            <el-button class="m-submit-buttom" ><i class="el-icon-edit"></i>发表</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
export default {
    name: "Details",
    components: {
        NavBar
    },
    data() {
        return {
            value: `<blockquote>
									<p>你好</p>
									</blockquote>
									<p><code>java</code></p>`,
            defaultData: "preview",
            textarea: '',
        };
    },
    computed: {
        
    }
}
</script>
<style scoped>
#Details {
  color: black;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/bg_lake.jpg);
  background-size: cover;
  background-position: center;
  /* position: relative; */
  overflow: auto;
}
.m-details-contain {
  width: 90%;
  margin: 100px auto;
  padding:28px 21px;
  background-color: #fff;
  text-align: left;
  border-radius: 5px;
  border: 1px solid rgba(34,36,38,.15);
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
  -webkit-box-shadow: #000000 0px 0px 10px;
  opacity: 0.9;
}
.m-contain-content {
    padding: 28px 56px;
}
.m-end {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
}
.m-end-text {
    margin: 0 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .05em;
    color: rgba(0,0,0,.85);
    font-size: 1rem;
}
.m-end-line {
  height: 2px;
  flex-grow: 1;
  background-color: #dddfde;
}
.m-comment {
    padding: 14px;
    margin: 56px 0;
}
.m-comment-list {
    border: 1px solid rgba(34,36,38,.15);
    border-top: 2px solid #00B5AD;
    padding: 14px;
    margin-bottom: 30px;
    box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
    border-radius: 5px;
}
.comment-list-title {
    margin-top: 0;
    border-bottom: 1px solid #dddfde;
}
.m-comment-list .comment {
    margin-top: 14px;
    padding-top: 5px;
}
.m-comment-list .comment .avatar {
    height: 40px;
    width: 40px;
    margin-top: 5px;
    border-radius: 3px;
    float: left;
    vertical-align: top;
}
.m-comment-list .comment .avatar img {
    height: 40px;
    width:40px;
    border-radius: 3px;
}
.m-comment-list .comment .content {
    margin-left: 59px;
    position: relative;
    display: block;
}
.m-comment-list .comment .content .author {
    text-decoration: none;
    color: rgba(0,0,0,.87);
    font-weight: 700;
    display: inline-block;
}
.m-comment-list .comment .content a :hover {
    color: #4183C4;
}
.m-comment-list .comment .content .metadata {
    display: inline-block;
    margin-left: 10px;
    color: rgba(0,0,0,.4);
    font-size: .875em;
}
.m-comment-list .comment .content .text {
    margin: 5px 0 10px;
}

.m-comment-list .comment .content .reply {
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
    display: inline-block;
    margin: 0 .75em 0 0;
    color: rgba(0,0,0,.4);
}
.m-comment-list .comment .comment-child {
    margin: -21px 0 -14px 20px;
    padding: 40px  0 28px 39px;
    border-left: 1px solid  #dddfde;
}
.m-comment-list .comment .content .author-tag {
    display: inline-block;
    padding: 2px;
    margin: 0 10px 0 5px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 3px;
    color: #00B5AD;
    border: 1px solid #00B5AD;
}
.m-comment-list .comment .content .mteal {
    color: #00B5AD;
    font-weight: 700;
}
.comment-form .m-submit-buttom {
    background: #00B5AD;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    margin-top: 10px;
    float: right;
}
.comment-form .m-submit-buttom .el-icon-edit {
    margin-right: 7px;
}
</style>