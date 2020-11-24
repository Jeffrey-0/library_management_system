<template>
  <div id="notice">
    <div class="title">公告</div>

    <el-form :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formSearch.noticeContent" placeholder="公告内容"></el-input>
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
    <!-- <el-table-column
      prop="userName"
      label="发布人"
      width="80">
    </el-table-column> -->
    <el-table-column
      prop="noticeContent"
      label="公告内容">
    </el-table-column>
    <el-table-column
      prop="noticeCreatetime"
      label="发表时间"
      width="120"
      :formatter = formatDate
      >
    </el-table-column>

    <el-table-column
      label="操作"
      width="70">
      <div slot-scope="scope">
        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button> -->
        <el-tag @click="handleClick(scope.row)"
          type="primary"
          disable-transitions>详情</el-tag>
      </div>
    </el-table-column>
  </el-table>

  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>

  <el-dialog title="公告" :visible.sync="dialogFormVisible">
  <el-form :model="form">
      <el-form  :model="formInline"  class="demo-form-inline"  style="text-align:center">
      <!-- <el-form-item label="发布人">
        <el-input v-model="formInline.userName" placeholder="发布人" disabled></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-input v-model="formInline.noticeCreatetime" placeholder="时间" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.noticeContent" placeholder="内容" disabled type="textarea"></el-input>
      </el-form-item>
      
    </el-form>
  </el-form>
</el-dialog>
  </div>
</template>

<script>
  import {SelectUserNotice, SelectNoticeFuzzy} from '../../network/notice'
  export default {
    methods: {
      handleClick(row) {
        this.formInline = row
        this.formInline.noticeCreatetime = '发表时间： ' + this.$moment(row.noticeCreatetime).format('YYYY-MM-DD')
        this.dialogFormVisible = true
        console.log(row);
      },
       onSubmit() {
        this.currentPage = 1
        console.log(this.formSearch.noticeContent)
        if (this.formSearch.noticeContent) {
          SelectNoticeFuzzy(this.formSearch.noticeContent).then(res => {
            // TODO
            // let res2 = JSON.parse(res)
            if (res) {
              console.log('模糊历史' ,res)
              this.tableData = res.data
              this.total = res.total

            } else {
              this.tableData = []
              this.total = 0
            }
          })
          this.queryModel = 2
        } else {  //为空时切换普通查询
          SelectUserNotice(this.currentPage, this.pageSize).then(res => {
            console.log(res)
            // TODO
            if (res) {
              this.tableData = res.data
              // this.total = 9
              this.total = res.total

            } else {
              this.tableData = []
              this.total = 0
            }
          })
          this.queryModel = 0
        }
      },
      handleCurrentChange(val) {
        this.currentPage = val
        if (this.queryModel === 1) { //模糊查询
            SelectNoticeFuzzy(this.formSearch.noticeContent,this.currentPage, this.pageSize).then(res => {
            // TODO
            if (res) {

              this.tableData = res.data
              this.total = res.total
            } else {
              this.tableData = []
              this.total = 0
            }
          })
        } else { // 普通查询
          SelectUserNotice(this.currentPage, this.pageSize).then(res => {
            console.log(res)
            // TODO
            if (res) {
              this.tableData = res.data
              // this.total = 9
              this.total = res.total

            } else {
              this.tableData = []
              this.total = 0
            }
          })
        }
        console.log(`当前页: ${val}`);
      },
      formatDate (row) {
        // console.log(row)
        return this.$moment(row.noticeCreatetime).format('YYYY-MM-DD')
      }
    },

    data() {
      return {
        tableData: [],
         formInline: {
        },
        formSearch: {
          noticeContent: ''
        },
        currentPage: 1,
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
        },
        formLabelWidth: '120px',
        pageSize: 6,
        total: 9,
        queryModel: 0  // 当前查询状态，用户分页切换，分页查询0，  模糊查询1
      
      }
    },
    created () {
      SelectUserNotice().then(res => {
        console.log('公告结果' , res)
        if (res) {
          console.log('公告结果' , res)
          this.tableData = res.data
          this.total = res.total
          }  else {
              this.tableData = []
              this.total = 0
            }
          
      })
    },
    filters: {
      formateDate (val) {
        return '0' + val
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

 #notice .el-table .cell {
   white-space: nowrap;
 }
</style>