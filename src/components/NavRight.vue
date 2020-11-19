<template>
  <div class="sidebar">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="collapse"
          background-color="#324157"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" @click="addTag('用户管理', 'el-icon-user')">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item
            index="2"
            @click="addTag('借阅详情', 'el-icon-reading')"
          >
            <i class="el-icon-reading"></i>
            <span slot="title">借阅详情</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-notebook-1"></i>
              <span>图书管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="1-1"
                @click="addTag('图书列表', 'el-icon-reading')"
                >图书列表</el-menu-item
              >
              <el-menu-item
                index="1-2"
                @click="addTag('添加图书', 'el-icon-reading')"
                >添加图书</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item
            index="4"
            @click="addTag('公告管理', 'el-icon-reading')"
          >
            <i class="el-icon-bell"></i>
            <span slot="title">公告管理</span>
          </el-menu-item>
          <el-menu-item
            index="5"
            @click="addTag('书籍统计', 'el-icon-reading')"
          >
            <i class="el-icon-view"></i>
            <span slot="title">书籍统计</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "NavRight",
  data() {
    return {
      collapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    isCollapse() {
      this.collapse = !this.collapse;
    },
    addTag(val, two) {
      this.$eventBusTag.$emit("eventBusName", val);
      this.$eventBusiIcon.$emit("eventBusName", val, two);
    },
  },
  mounted() {
    this.$eventBus.$on("eventBusName", () => {
      this.isCollapse();
    });
  },
};
</script>


<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  text-align: left;
  background-color: #324157;
  overflow-y: scroll;
}

.sidebar .el-menu-vertical-demo {
  border: hidden;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
