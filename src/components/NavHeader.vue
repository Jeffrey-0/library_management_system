<template>
  <div class="wrapper">
    <div class="header">
      <div class="collapse-btn" @click="isCollapse">
        <li
          :class="{
            'el-icon-s-unfold': collapse,
            'el-icon-s-fold': !collapse,
          }"
        ></li>
      </div>
      <div class="logo">图书管理系统</div>
      <div class="header-right">
        <div class="header-user-con">
          <div class="btn-bell">
            <a href="#" class="el-tooltip"><li class="el-icon-bell"></li></a>
          </div>
          <div class="user-avator"><img src="../assets/dog.jpg" alt="" /></div>
          <div class="user-name el-dropdown">
            <span class="el-dropdown-link el-dropdown-selfdefine">名字 </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
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
      this.$eventBus.$emit("eventBusName", this.collapse);
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background: #242f42;
}
.header .collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .collapse-btn:hover {
  background-color: #283446;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
  text-align: left;
}
.header .header-right {
  float: right;
  padding-right: 50px;
}
.header .header-right .header-user-con {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 70px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.header .header-right .header-user-con .btn-bell {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.header .header-right .header-user-con .btn-bell .el-icon-bell {
  color: #fff;
}
.header .header-right .header-user-con .user-avator {
  margin-left: 20px;
}
.header .header-right .header-user-con .user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.header .header-right .header-user-con .user-name {
  margin-left: 10px;
}
</style>