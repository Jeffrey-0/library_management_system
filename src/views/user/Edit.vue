<template>
    <div id="edit">
        <el-row>
            <el-col><nav-bar></nav-bar></el-col>
        </el-row>
        <div>
            <div class="m-submit">
                <el-button class="m-submit-buttom" type="primary" round>保存草稿</el-button>
                <el-button class="m-submit-buttom" type="success" round>发布文章</el-button>
                <div class="m-submit-img"><a href="#"><img src="../../assets/img/bg_index.jpg" alt=""></a></div>
            </div>
            <!--markdown编辑-->
            <mavon-editor
                v-model="content"
                ref="md"
                @imgAdd="$imgAdd"
                @imgDel="$imgDel"
                @change="change"
                :toolbars="toolbars"
                :ishljs="false"
                :toolbarsBackground="'#f9f9f9'"
                style="height: calc(100vh - 50px)"
                />
        </div>
    </div>
</template>
<script>
import NavBar from '../../components/NavBar.vue'
export default {
  name: 'Edit',
  components: {
    NavBar
  },
  data () {
      return {
        value: '',
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览,
        },
      }
    },
    methods: {
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      this.img_file[pos] = $file
      this.$http({
        url: '/api/edit/uploadimg',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        let _res = res.data
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, _res.url)
      })
    },
    $imgDel (pos) {
      delete this.img_file[pos]
    },
    change (value, render) {
      this.html = render
    },
    // 提交
    submit () {
      console.log(this.content)
      console.log(this.html)
    }
  }
}
</script>

<style scoped>
.m-submit {
    margin: 5px 0;
    padding: 0 5px;
    text-align: right;
}
.m-submit-buttom {
    display: inline-block;
}
.m-submit-img {
    width: 40px;
    height: 40px;
    margin: 0 10px;
    display: inline-block;
    vertical-align: top;
}
.m-submit-img img{
    width: 40px;
    height: 40px;
    vertical-align: top;
    border-radius: 50%;
}
.m-submit-img a {
    text-decoration: none;
    color: inherit;
}
</style>