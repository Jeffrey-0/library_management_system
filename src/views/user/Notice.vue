<template>
  <div  id="Music">
    <nav-bar></nav-bar>
    <div class="m-music">
    <div class="m-music-content">
      <div>
        <div class="music-list" >
          <el-table
            :data="tableData"
            height="400"
            style="width: 100%;">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </div>
        <div class="music-info">
          <div class="music-info-img">
            <img :src="songImg" alt="">
            <div class="info">歌曲：</div>
            <div class="info">歌手：</div>
            <div class="info">专辑：</div>
            <div class="music-lyric"><p>歌词</p></div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-music-control">
      <audio id="audio"></audio>
      <div class="control-button">
        <el-button><li class="el-icon-caret-left"></li></el-button>
        <el-button><li class="el-icon-video-play"></li></el-button>
        <el-button><li class="el-icon-caret-right"></li></el-button>
      </div>
      <div id="progress" class="control-progress">
        <div class="music-name">歌名</div>
        <el-progress :percentage="50" :stroke-width="2" :show-text="false" ></el-progress>
      </div>
      <div class="music-volume">
        <li class="el-icon-headset"></li>
        <input id="volume" name="volume" min="0" max="1" step="0.1" type="range" onchange="setVolume()" />
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import NavBar from '../../components/NavBar'
export default {
  name: "Music",
  components: {
    NavBar,
  },
  data() {
    return{
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
      songImg: require('../../assets/img/player_cover.png'),
    }
  },
  created() {
    this.$nextTick(() => {
      var obj = document.getElementById("progress")
      obj.style.width=document.body.clientWidth-400 + 'px';
      console.log(document.body.clientWidth)
    })
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        var obj = document.getElementById("progress")
              obj.style.width=document.body.clientWidth-400 + 'px';

        console.log(document.body.clientWidth)

      })()
    }
  }
}
</script>
<style scoped>
#Music {
  color: black;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/bg-1.jpg);
  background-image: linear-gradient(#000000, #59505a);
  background-size: cover;
  background-position: center;
  /* position: relative; */
  overflow: auto;

}
.m-music {
  padding: 55px 25px 25px;
  /* background: ; */
  -webkit-tap-highlight-color: transparent;
  
  text-align: left;
  vertical-align: top;
}
.music-list {
  display: inline-block;
  width: 70%;
}
.music-info {
  display: inline-block;
  width: 30%;
  position: relative;
  height: 100%;
  vertical-align: top;
  text-align: center;
  color: hsla(0,0%,100%,.6);
}
.music-info-img {
  width: 186px;
  height: 186px;
  margin: 0 auto;
}
.music-info-img img {
  width: 186px;
  height: 186px;
  object-fit: cover;
}
/* .music-info-img ::before {
    content: "";
    position: absolute;
    left: 9px;
    top: 0;
    width: 201px;
    height: 180px;
    background-image: url(../../assets/img/bg-1.jpg);
    background: url(../../img/album_cover_player.png) 0 0 no-repeat;
 } */
.music-info-img .info {
  font-size: 14px;
}
.m-music-control {
  text-align: left;
  text-align: left;
  position: relative;
}
.control-button {
  width: 150px;
  margin-top: 25px;
  margin-right: 20px;
  display: inline-block;
}
.control-button button {
  background: transparent;
  border: none;
  color: #cdcdcd;
  font-size: 42px;
  padding: 0;
}
.control-progress {
  display: inline-block;
  position: relative;
  bottom: 6px;
}
.control-progress .music-name {
  width: 100%;
  margin: 5px 0;
  font-size: 14px;
  color: hsla(0,0%,100%,.6);
}
.music-volume {
  margin-left: 15px;
  width: 161px;
  display: inline-block;
}
.music-volume .el-icon-headset {
  color: hsla(0,0%,100%,.6);
  font-size: 22px;
}
.music-volume input {
  height: 2px;
  position: relative;
  bottom: 5px;
  margin-left: 10px;
}
.music-lyric {
  font-size: 12px;
}
</style>