<template>
  <div id="history">
    <div class="title">历史</div>

    <el-form :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formSearch.bookName" placeholder="书名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  <el-table
    :data="tableData"
    border
    stripe
    :default-sort = "{prop: 'borrowDate', order: 'descending'}"
    style="width: 100%;min-height:390px;margin-bottom:15px">  
    <el-table-column
      prop="bookName"
      label="书名">
    </el-table-column>
    <el-table-column
      prop="bookSort"
      label="类别">
    </el-table-column>
    <el-table-column
      prop="bookAuthor"
      label="作者">
    </el-table-column>
    <el-table-column
      prop="borrowDate"
      sortable
      label="借书时间">
    </el-table-column>
    <!-- <el-table-column
      prop="validityDate"
      label="有效期">
    </el-table-column> -->
    <el-table-column
      prop="returnDate"
      label="归还时间"
      :formatter=foReturnDate
    >
    </el-table-column>

    <el-table-column
      label="操作"
      width="70">
      <div slot-scope="scope">
        <!-- <el-button @click="handleClick(scope.row)" type="primary" size="small">详情</el-button> -->
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

  <el-dialog title="借阅历史" :visible.sync="dialogFormVisible">
  <el-form :model="form">
        <el-form  :model="formInline"  class="demo-form-inline" label-width="60px" style="text-align:center">
      <!-- <el-form-item label="图书ID">
        <el-input v-model="formInline.user" placeholder="姓名" disabled></el-input>
      </el-form-item> -->
      <el-form-item label="书名">
        <el-input v-model="formInline.bookName" placeholder="书名" disabled></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-input v-model="formInline.bookSort" placeholder="分类" disabled></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="formInline.bookAuthor" placeholder="作者" disabled></el-input>
      </el-form-item>
      <el-form-item label="借书">
        <el-input v-model="formInline.borrowDate" placeholder="借书时间" disabled></el-input>
      </el-form-item>
      <el-form-item label="归还">
        <el-input v-model="formInline.returnDate" placeholder="暂未归还" disabled></el-input>
      </el-form-item>
      <!-- <el-form-item label="有效期">
        <el-input v-model="formInline.validityDate" placeholder="有效期" disabled></el-input>
      </el-form-item> -->
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
  import {SelectUserHistoryById, SelectHistoryFuzzy} from '../../network/history'
  export default {
    name: 'History',
    methods: {
      handleClick(row) {
        this.formInline = row
        this.dialogFormVisible = true
        console.log(row);
      },
       onSubmit() {
        this.currentPage = 1
        console.log(this.formSearch.bookName)
        if (this.formSearch.bookName) {
          SelectHistoryFuzzy(this.$user.userId, this.formSearch.bookName).then(res => {
            // TODO
            if (res) {
              this.tableData = res.data
              this.total = res.total
            } else {
              this.tableData = []
              this.total = 0
            }
          })
          this.queryModel = 2
        } else {  //为空时切换普通查询
          SelectUserHistoryById(this.$user.userId).then(res => {
            console.log(res)
            // TODO
            if (res) {
              this.tableData = res.data
              this.total = res.total
            } else {
              this.tableData = []
              this.total = 0
            }
            // this.total = res.total
          })
          this.queryModel = 0
        }
      },
      handleCurrentChange(val) {
        this.currentPage = val
        if (this.queryModel === 1) { //模糊查询
            SelectHistoryFuzzy(this.$user.userId, this.formSearch.bookName,this.currentPage, this.pageSize).then(res => {
            // TODO
            /* this.tableData = res
            this.total = 7 */
            console.log('模糊历史',res)
            if (res) {
              this.tableData = res.data
              this.total = res.total
            } else {
              this.tableData = []
              this.total = 0
            }
          })
        } else { // 普通查询
          SelectUserHistoryById(this.$user.userId, this.currentPage, this.pageSize).then(res => {
            console.log(res)
            // TODO
            /* this.tableData = res
            this.total = 9 */
            // this.total = res.total
            if (res) {
              this.tableData = res.data
              this.total = res.total
            } else {
              this.tableData = []
              this.total = 0
            }
          })
        }
        console.log(`当前页: ${val}`);
      },
      foReturnDate (row) {
        return row.returnDate ? row.returnDate : '暂未归还';
      }
    },

    data() {
      return {
        tableData: [],
         formInline: {
        },
        formSearch: {
          bookName: ''
        },
        currentPage: 1,
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
        formLabelWidth: '120px',
        pageSize: 6,
        total: 9,
        queryModel: 0  // 当前查询状态，用户分页切换，分页查询0，  模糊查询1
      
      }
    },
    created () {
      SelectUserHistoryById(this.$user.userId).then(res => {
        // this.tableData = res
          console.log('历史', res)
        // this.total = res.total
        if (res) {
          this.tableData = res.data
          this.total = res.total
        } else {
              this.tableData = []
              this.total = 0
            }
      })
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