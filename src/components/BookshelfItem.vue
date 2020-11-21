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

    <el-form :inline="true" :model="book"  class="demo-form-inline" id="infoForm" label-width="100px">
      <el-form-item label="书籍名称">
        <el-input v-model="book.bookName" placeholder="无" disabled></el-input>
      </el-form-item>
      <el-form-item label="借阅时间">
        <el-input v-model="book.borrowDate" placeholder="无" disabled></el-input>
      </el-form-item>
      <el-form-item>

        <el-button v-if="book.bookName" type="primary" @click="open">归还</el-button>
        <el-button v-else type="info" @click="open" disabled>未借</el-button>
      </el-form-item>
      <el-form-item label="借阅有效期">
        <el-input v-model="book.validityDate" placeholder="无" disabled></el-input>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-input v-model="book.returnDate" placeholder="无" disabled></el-input>
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
  created () {
    console.log(this.book)
  },
  props: [
    'book',
    'index'
  ],
  methods: {
     onSubmit() {
        console.log('submit!');
      },
       open() {
        this.$confirm('是否归还该书', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('returnBook', this.book.bookId, this.index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消归还'
          })        
        })
      }
  },
  // 监听父组件中传过来的参数book变化
  // watch: {
  //   book: {
  //     handler(newValue, oldValue) {
  //       console.log(newValue, oldValue)
  //       // this.ruleForm.id = newValue && newValue.userId
  //       // this.ruleForm.pass = newValue && newValue.userPassword
  //     },
  //     deep: true
  //   }
  // }
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