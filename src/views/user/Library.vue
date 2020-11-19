<template>
  <div>
    <div class="title">书库</div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <!-- <el-form-item label="书名">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item> -->
      <el-form-item label="分类">
        <el-select v-model="formInline.region" placeholder="分类">
          <el-option label="所有" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出版社">
        <el-select v-model="formInline.region" placeholder="出版社">
          <el-option label="所有" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="剩余情况">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item> -->
      <el-form-item label="状态">
        <el-select v-model="formInline.region" placeholder="剩余情况" width="50px">
          <el-option label="所有" value="shanghai"></el-option>
          <el-option label="已借" value="beijing"></el-option>
          <el-option label="未借" value="beijing"></el-option>
          <el-option label="下架" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-form :inline="true" :model="formInline" class="demo-form-inline demo-form-inline2">
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="书名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  <el-table
    :data="tableData"
    border
    stripe
    style="width: 100%;min-height:330px;margin-bottom:15px">  
    <el-table-column
      prop="date"
      label="书名">
    </el-table-column>
    <el-table-column
      prop="name"
      label="类别">
    </el-table-column>
    <el-table-column
      prop="province"
      label="作者">
    </el-table-column>
    <el-table-column
      prop="date"
      label="上架时间">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="剩余数量">
    </el-table-column>

    <el-table-column
      label="状态"
      width="70">
      <!-- <template slot-scope="scope"> -->
        <el-button @click="dialogFormVisible = true" type="text" size="small">借阅</el-button>
        <!-- <el-button type="text" size="small">编辑</el-button> -->
      <!-- </template> -->
    </el-table-column>
  </el-table>

  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="6"
      layout="total, prev, pager, next, jumper"
      :total="50">
    </el-pagination>
  </div>

  <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
-->
<el-dialog title="书籍信息" :visible.sync="dialogFormVisible">
  <el-form :model="form">
        <el-form :inline="true" :model="formInline"  class="demo-form-inline" label-width="60px" style="text-align:center">
      <!-- <el-form-item label="图书ID">
        <el-input v-model="formInline.user" placeholder="姓名" disabled></el-input>
      </el-form-item> -->
      <el-form-item label="书名">
        <el-input v-model="formInline.user" placeholder="姓名" disabled></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-input v-model="formInline.user" placeholder="手机" disabled></el-input>
      </el-form-item>
      <el-form-item label="出版社">
        <el-input v-model="formInline.user" placeholder="年龄" disabled></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="formInline.user" placeholder="手机" disabled></el-input>
      </el-form-item>
      <el-form-item label="上架">
        <el-input v-model="formInline.user" placeholder="年龄" disabled></el-input>
      </el-form-item>
      <el-form-item label="状态   ">
        <el-input v-model="formInline.user" placeholder="年龄" disabled></el-input>
      </el-form-item>
    </el-form>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确定借阅</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },
       onSubmit() {
        console.log('submit!');
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },

    data() {
      return {
        tableData: [{
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }],
         formInline: {
          user: '',
          region: ''
        },
        currentPage: 4,
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    }
  }
</script>

<style scoped>
 .title{
   font-size: 20px;
   font-weight: bold;
   padding: 10px 10px 20px;
 }
  .demo-form-inline {
   text-align: right;
 }
 /* .el-input__inner {
   width: 100px;
 }*/
</style>