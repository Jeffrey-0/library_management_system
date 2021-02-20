<template>
    <div id="Photo">
        <div>
            <nav-bar></nav-bar>
        </div>
        <div class="m_photo">
            <div class="image_lazy">
                <div class="image_item" v-for="url in urls" :key="url">
                    <el-image :src="url" :preview-src-list="urls" lazy class="image_item"></el-image>
                    <span class="image_info">信息</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from '../../components/NavBar.vue'
export default {
    name: "Photo",
    components: {
        NavBar,
    },
    data() {
      return {
        urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ]
      }
    }
}
</script>
<style scoped>
.m_photo {
    margin-top: 30px;
    width: 100%;
    height: 100%;
}
.image_lazy {
    width: 100%;
    height: 635px;
    padding-bottom: 100px;
    overflow: scroll;
}
.image_item {
    display: inline-block;
    max-width: 505px;
    position: relative;
}
.image_info {
    color:  #fff;
    font-family: Tahoma,Helvetica,Arial,'宋体',sans-serif;
    font-weight: 700;
    font-size: 20px;
    position: absolute;
    left: 20px;
    bottom: 20px;
}
</style>