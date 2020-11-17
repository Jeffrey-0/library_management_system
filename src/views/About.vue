<template>
  <div class="about">
    <div class="content">
      <img :src="photo" alt="" class="rotate-img" :style="rotateState" />
      <audio ref="audioId" :src="music" loop></audio>
      <div class="control-bar">
        <span class="glyphicon glyphicon-backward" @click="prev"></span>
        <span
          ref="playBtn"
          :class="['glyphicon', glyphiconPlay]"
          @click="play"
        ></span>
        <span class="glyphicon glyphicon-forward" @click="next"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      styleImg: String,
      photo: "",
      glyphiconPlay: "glyphicon-play",
      music: "",
      heroList: [],
      index: 0,
      rotateState: {
        animationPlayState: "paused",
      },
    };
  },

  computed: {},
  methods: {
    gotoHome() {
      this.$router.push("home");
    },
    back() {
      this.$router.go(-1);
    },
    prev() {
      this.index = this.index > 1 ? this.index - 1 : this.heroList.length - 1;
      let hero = this.heroList[this.index];
      this.photo = "/img/" + hero.name + ".jpg";
      this.music = hero.music;
      this.glyphiconPlay = "glyphicon-play";
    },
    next() {
      this.index = this.index >= this.heroList.length - 1 ? 0 : this.index + 1;
      let hero = this.heroList[this.index];
      this.photo = "/img/" + hero.name + ".jpg";
      this.music = hero.music;
      this.glyphiconPlay = "glyphicon-play";
    },
    play() {
      let paused = this.$refs.audioId.paused;
      this.glyphiconPlay = paused ? "glyphicon-pause" : "glyphicon-play";
      this.rotateState.animationPlayState = paused ? "running" : "paused";
      paused ? this.$refs.audioId.play() : this.$refs.audioId.pause();
    },
  },
  created() {
    let index = parseInt(this.$route.params.index);
    this.index = index;
    Axios({
      method: "get",
      url: "/data.json",
    })
      .then((data) => {
        let list = data.data;
        this.heroList = list;
        let hero = list[index];
        this.photo = "/img/" + hero.name + ".jpg";
        this.music = hero.music;
      })
      .catch((err) => {
        console.log("error...", err);
      });
  },
  mounted() {},
};
</script>
<style scoped>
.about {
  position: fixed;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #9933cc, #0066ff);
  background-attachment: scroll;
}
.content {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  left: 0;
  top: 100px;
}
.rotate-img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  animation: rotate 10s linear infinite;
  animation-play-state: paused;
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.control-bar {
  display: flex;
  width: 500px;
  margin: 40px auto;
  justify-content: space-around;
  background: white;
  border-radius: 10px;
  padding: 15px 0;
}
.control-bar span {
  cursor: pointer;
  padding: 5px;
}
.control-bar span:hover {
  color: #9933cc;
}
</style>