<template>
  <div>
    <div class="title">公告管理</div>

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
      label="书名"
      width="160">
    </el-table-column>
    <el-table-column
      prop="name"
      label="类别"
      width="150">
    </el-table-column>
    <el-table-column
      prop="province"
      label="作者"
      width="150">
    </el-table-column>
    <el-table-column
      prop="date"
      label="借书时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="归还时间"
      width="120">
    </el-table-column>

    <el-table-column
      label="操作">
      <!-- <template slot-scope="scope"> -->
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
        currentPage: 4
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