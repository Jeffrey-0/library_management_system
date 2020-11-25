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
            <el-select v-model="formSeletor.sort" placeholder="分类">
              <el-option label="所有" value="所有"></el-option>
              <el-option
                :label="item.sortName"
                :value="item.sortName"
                v-for="item in bookSorts"
                :key="item.sortId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出版社">
            <el-select v-model="formSeletor.pub" placeholder="出版社">
              <el-option label="所有" value="所有"></el-option>
              <el-option
                :label="item"
                :value="item"
                v-for="item in bookPubs"
                :key="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="剩余情况">
        <el-input v-model="formSeletor.user" placeholder="审批人"></el-input>
      </el-form-item> -->
          <el-form-item label="状态">
            <el-select
              v-model="formSeletor.status"
              placeholder="剩余情况"
              width="50px"
            >
              <el-option label="所有" value="所有"></el-option>
              <el-option label="已借" value="0"></el-option>
              <el-option label="未借" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitSeletor">查询</el-button>
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
            <el-input
              v-model="form.bookName"
              placeholder="查询借阅信息"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="content-body">
        <el-table
          border
          stripe
          :data="tableData"
          style="width: 100%; min-height: 300px"
        >
          <el-table-column
            prop="bookName"
            :show-overflow-tooltip="true"
            label="书名"
            fixed
          >
          </el-table-column>
          <el-table-column prop="bookSort" label="类别"> </el-table-column
          ><el-table-column prop="bookPub" label="出版社"> </el-table-column>
          <el-table-column prop="userName" label="借阅人"> </el-table-column>
          <el-table-column
            prop="borrowDate"
            label="借书时间"
            sortable
            width="150"
            column-key="date"
            :formatter="forBorrowDate"
          >
          </el-table-column>
          <el-table-column
            prop="validityDate"
            :formatter="forValidityDate"
            label="有效期"
          >
          </el-table-column>
          <el-table-column
            prop="returnDate"
            label="归还时间"
            sortable
            width="150"
            column-key="date"
            :formatter="foReturnDate"
          >
          </el-table-column>
          <el-table-column prop="isreturn" label="状态">
            <template slot-scope="scope">
              <el-tag
                @click="handleClick(scope.row)"
                :type="scope.row.isreturn == '0' ? 'success' : 'primary'"
                disable-transitions
                >{{ scope.row.isreturn == "0" ? "已借" : "未借" }}</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 修改资料对话框 -->
        <el-dialog title="借阅详情" :visible.sync="dialogFormVisible">
          <el-form
            :model="formInline"
            class="demo-form-inline"
            label-width="60px"
            style="text-align: center"
          >
            <el-form-item label="书名" :label-width="formLabelWidth">
              <el-input v-model="formInline.bookName" disabled></el-input>
            </el-form-item>
            <el-form-item label="分类" :label-width="formLabelWidth">
              <el-select
                v-model="formInline.bookSort"
                placeholder="图书分类"
                disabled
              >
                <el-option
                  :label="item.sortName"
                  :value="item.sortName"
                  v-for="item in bookSorts"
                  :key="item.sortId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="借阅人" :label-width="formLabelWidth">
              <el-input v-model="formInline.userName" disabled></el-input>
            </el-form-item>
            <el-form-item label="借书" :label-width="formLabelWidth">
              <el-date-picker
                v-model="formInline.borrowDate"
                type="date"
                placeholder="选择日期"
                disabled
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="归还" :label-width="formLabelWidth">
              <el-date-picker
                v-model="formInline.returnDate"
                type="date"
                placeholder="选择日期"
                disabled
              >
              </el-date-picker>
            </el-form-item>
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
import {
  SelectBookSort,
  SelectBookPub,
  SelectSelector,
} from "../../network/book";
import { selectHistory, selectHistoryByLike } from "../../network/history";
export default {
  name: "Borrow",
  components: {},
  data() {
    return {
      collapse: true,
      tagName: "",
      icon: "",
      tableData: [], //书籍列表
      dialogFormVisible: false,
      formInline: {
        // 书籍详情模态框
        id: "",
        userId: "",
        bookId: "",
        bookName: "",
        bookAuthor: "",
        bookPub: "",
        bookSort: "",
        borrowDate: "",
        returnDate: "",
        validityDate: "",
        isreturn: 0,
      },
      formBook: {
        bookId: "",
      },
      currentPage: 1,
      pageSize: 5,
      formInlineIsreturn: "0",
      total: 8,
      bookSorts: [],
      bookPubs: [],
      queryModel: 0, // 当前查询状态，用户分页切换，分页查询0， 筛选查询1， 模糊查询2
      form: {
        // 模糊查询表单
        bookName: "",
      },
      formSeletor: {
        // 筛选表单
        sort: "所有",
        pub: "所有",
        status: "所有",
      },
      formLabelWidth: "70px",
    };
  },
  created() {
    selectHistory(this.currentPage, this.pageSize).then((res) => {
      // TODO
      console.log(res.data, "****----");
      this.tableData = res.data;
      this.total = res.total;
    });
    SelectBookSort().then((res) => {
      this.bookSorts = res.data;
    });
    SelectBookPub().then((res) => {
      this.bookPubs = res.data;
    });
  },
  methods: {
    isCollapse(val) {
      this.collapse = val;
    },
    onSubmit() {
      if (this.formInline.user == "") {
        console.log("查询!");
      }
    },
    handleClick(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.formInline = row;
      // this.formInlineIsreturn = row.isreturn
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.queryModel === 2) {
        //模糊查询
        selectHistoryByLike(
          this.form.bookName,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
      } else if (this.queryModel === 1) {
        // 筛选查询
        SelectSelector(
          this.formSeletor.sort,
          this.formSeletor.pub,
          this.formSeletor.status,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
      } else {
        // 普通查询
        selectHistory(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.tableData = res.data;
          this.total = res.total;
          // this.total = res.total
        });
      }
    },
    onSubmitFuzzy() {
      //模糊查询
      this.currentPage = 1;
      if (this.form.bookName) {
        selectHistoryByLike(this.form.bookName).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        selectHistory(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 0;
      }
    },
    onSubmitSeletor() {
      //筛选查询

      this.currentPage = 1;
      SelectSelector(
        this.formSeletor.sort,
        this.formSeletor.pub,
        this.formSeletor.status
      ).then((res) => {
        // TODO
        this.tableData = res.data;
        this.total = res.total;
      });
      console.log(this.formSeletor);
      this.queryModel = 1;
    },
    foReturnDate(row) {
      return row.returnDate ? row.returnDate : "暂未归还";
    },
    forBorrowDate(row) {
      return row.borrowDate ? row.borrowDate : "暂未借阅";
    },
    forValidityDate(row) {
      return row.validityDate ? row.validityDate : "0";
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
  padding: 10px 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.container .content-box .content .search {
  padding-left: 347px;
}
</style>