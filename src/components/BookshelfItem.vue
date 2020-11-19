<template>
  <div id="wrapper">
    <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline demo-form-inline1">
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="书名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form> -->

    <el-form :inline="true" :model="formInline"  class="demo-form-inline" id="infoForm" label-width="100px">
      <el-form-item label="书籍名称">
        <el-input v-model="formInline.user" placeholder="姓名" disabled></el-input>
      </el-form-item>
      <el-form-item label="借阅时间">
        <el-input v-model="formInline.user" placeholder="姓名" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">归还</el-button>
      </el-form-item>
      <el-form-item label="借阅有效期">
        <el-input v-model="formInline.user" placeholder="手机" disabled></el-input>
      </el-form-item>
      <el-form-item label="归还时间">
        <el-input v-model="formInline.user" placeholder="年龄" disabled></el-input>
      </el-form-item>
      <!-- <el-form-item label="邮箱">
        <el-input v-model="formInline.user" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="ID" >
        <el-input v-model="formInline.user" placeholder="ID" disabled></el-input>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
     onSubmit() {
        console.log('submit!');
      }
  }
}
</script>

<style scoped>
/*.demo-form-inline1 {
  margin-top: 2px;
}
#wrapper{
  background: #2f2f2f1f;
  margin-bottom: 2px;
}*/
.demo-form-inline {
  text-align: left;
  padding: 40px 30px 20px 60px;
}
</style>