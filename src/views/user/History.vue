<template>
  <div>
    <div class="title">历史</div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
    style="width: 100%;min-height:390px;margin-bottom:15px">  
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
      label="借书时间">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="归还时间">
    </el-table-column>

    <el-table-column
      label="操作"
      width="70">
      <div slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
        <!-- <el-button type="text" size="small">编辑</el-button> -->
      </div>
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

  <el-dialog title="借阅历史" :visible.sync="dialogFormVisible">
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
  <!-- -<div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确定借阅</el-button>
  </div> -->
</el-dialog>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        this.dialogFormVisible = true
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
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
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
</style>