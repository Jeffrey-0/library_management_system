<template>
  <div :class="{ 'content-box': true, 'content-collapse': collapse }">
    <div class="content">
      <div class="screen">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="small"
        >
          <el-form-item label="分类">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出版社">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="借书状态">
            <el-select v-model="formInline.region" placeholder="所有">
              <el-option label="所有" value="shanghai"></el-option>
              <el-option label="未借" value="beijing"></el-option>
              <el-option label="已借" value="beijing"></el-option>
              <el-option label="借完" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="search">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="small"
        >
          <el-form-item>
            <el-input v-model="formInline.user" placeholder="查询借阅信息"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="content-body">
        <el-table ref="filterTable" :data="tableData" style="width: 100%;min-height:376px;margin-bottom:15px">
          <el-table-column prop="bookName" label="书名" fixed> </el-table-column>
          <el-table-column prop="bookPub" label="出版社"> </el-table-column>
          <el-table-column prop="bookSort" label="类别"> </el-table-column>
          <el-table-column
            prop="bookRecord"
            label="上架日期"
            sortable
            width="150"
            column-key="date"
          >
          </el-table-column>
          <el-table-column prop="bookAuthor" label="作者"> </el-table-column>
          <el-table-column prop="isreturn" label="状态">
            <template slot-scope="scope">
              <el-tag
                @click="handleClick(scope.row)"
                :type="scope.row.isreturn == '0' ? 'success' : 'primary'"
                disable-transitions
                >{{scope.row.isreturn == '0' ? '借完' : '借阅'}}</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 修改资料对话框 -->
        <el-dialog title="借阅详情" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form  :model="formInline"  class="demo-form-inline" label-width="60px" style="text-align:center">
            <el-form-item label="书名" :label-width="formLabelWidth">
              <el-input v-model="formInline.bookName" ></el-input>
            </el-form-item>
            <el-form-item label="出版社" :label-width="formLabelWidth">
              <el-input v-model="formInline.bookPub" ></el-input>
            </el-form-item>
            <el-form-item label="作者" :label-width="formLabelWidth">
              <el-input v-model="formInline.bookAuthor" ></el-input>
            </el-form-item>
            <el-form-item label="类别" :label-width="formLabelWidth">
              <el-select v-model="formInline.bookSort" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上架时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="formInline.bookRecord"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
              <el-select v-model="formInline.isreturn" placeholder="请选择活动区域" >
                <el-option label="未借" value="shanghai"></el-option>
                <el-option label="已借" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            </el-form>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </div>
      <!-- 分页 -->
      <div class="page">
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SelectBook, SelectSelector, SelectFuzzy } from "../../network/book";
export default {
  name: "Borrow",
  components: {},
  data() {
    return {
      collapse: true,
      tagName: "",
      icon: "",
      tableData: [],   //书籍列表
      dialogFormVisible: false,
      formInline: {
        // 书籍详情模态框
        id: "",
        bookId: "",
        bookName: "",
        bookAuthor: "",
        bookPub: "",
        bookSort: "",
        bookRecord: "",
        isreturn: 0,
      },
      currentPage: 1,
      pageSize: 5,
      formInlineIsreturn: "0",
      total: 8,
      bookSorts: [],
      bookPubs: [],
      queryModel: 0, // 当前查询状态，用户分页切换，分页查询0， 筛选查询1， 模糊查询2
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "70px",
    };
  },
  created() {
    SelectBook(this.currentPage, this.pageSize).then((res) => {
      console.log(this.currentPage);
      // TODO
      this.tableData = res;
    });
  },
  methods: {
    isCollapse(val) {
      this.collapse = val;
    },
    onSubmit() {
      if(this.formInline.user==""){

      console.log("查询!");
      }
    },
    handleClick(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.formInline = row
      // this.formInlineIsreturn = row.isreturn
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.queryModel === 2) {
        //模糊查询
        SelectFuzzy(this.form.bookName, this.currentPage, this.pageSize).then(
          (res) => {
            // TODO
            this.tableData = res;
            this.total = 7;
          }
        );
      } else if (this.queryModel === 1) {
        // 筛选查询
        SelectSelector(
          this.formSeletor.sort,
          this.formSeletor.pub,
          this.formSeletor.isreturn,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.tableData = res;
          this.total = 6;
        });
      } else {
        // 普通查询
        SelectBook(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.tableData = res;
          this.total = 8;
          // this.total = res.total
        });
      }
    },
  },
  mounted() {
    this.$eventBus.$on("eventBusName", (val) => {
      this.isCollapse(val);
    });
    this.$eventBusTag.$on("eventBusName", (val) => {
      this.tagName = val;
    });
    this.$eventBusiIcon.$on("eventBusName", (val, index) => {
      console.log(val);
      this.icon = index;
    });
  },
};
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #f0f0f0;
}
.container .content-box {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
}
.container .content-box .crumbs {
  margin: 10px 0;
  text-align: left;
  color: #606266;
}
.container .content-box .content {
  height: 100%;
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.container .content-box .content .search {
  padding-left: 375px;
}
</style>