<<<<<<< HEAD
<template>
  <div class="library" id="library">
    <div class="title">书库</div>

    <el-form
      :inline="true"
      :model="formSeletor"
      class="demo-form-inline demo-form-inline1"
    >
      <!-- <el-form-item label="书名">
        <el-input v-model="formSeletor.user" placeholder="审批人"></el-input>
      </el-form-item> -->
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
          v-model="formSeletor.isreturn"
          placeholder="剩余情况"
          width="50px"
        >
          <el-option label="所有" value="所有"></el-option>
          <el-option label="借完" value="0"></el-option>
          <el-option label="可借" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitSeletor">查询</el-button>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      :model="form"
      class="demo-form-inline demo-form-inline2"
    >
      <el-form-item>
        <el-input v-model="form.bookName" placeholder="书名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%; min-height: 330px; margin-bottom: 15px"
      :default-sort = "{prop: 'bookRecord', order: 'descending'}"
    >
      <el-table-column prop="bookName" label="书名"> </el-table-column>
      <el-table-column prop="bookSort" label="类别"> </el-table-column>
      <el-table-column prop="bookAuthor" label="作者"> </el-table-column>
      <el-table-column prop="bookPub" label="出版社"> </el-table-column>
      <el-table-column prop="bookRecord" label="上架时间" sortable>
        <!-- {{ $moment().format('YYYY-MM-DD') }} -->
      </el-table-column>

      <el-table-column label="状态" width="70">
        <div slot-scope="scope">
          <el-tag
            @click="handleClick(scope.row)"
            :type="scope.row.isreturn != 1 ? 'info' : 'primary'"
            disable-transitions
            >{{ scope.row.isreturn != 1 ? "借完" : "借阅" }}</el-tag
          >
        </div>
      </el-table-column>
    </el-table>

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

    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
-->
    <el-dialog title="书籍信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          label-width="60px"
          style="text-align: center"
        >
          <!-- <el-form-item label="图书ID">
        <el-input v-model="formInline.user" placeholder="姓名" disabled></el-input>
      </el-form-item> -->
          <el-form-item label="书名">
            <el-input
              v-model="formInline.bookName"
              placeholder="书名"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-input
              v-model="formInline.bookSort"
              placeholder="分类"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="出版社">
            <el-input
              v-model="formInline.bookPub"
              placeholder="出版社"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input
              v-model="formInline.bookAuthor"
              placeholder="作者"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="上架">
            <el-input
              v-model="formInline.bookRecord"
              placeholder="上架"
              disabled
            >
              <!-- {{ $moment().format('YYYY-MM-DD') }} -->
              <!-- {{ 123 }} -->
            </el-input>
          </el-form-item>
          <el-form-item label="状态   ">
            <el-input
              v-model="formInline.isreturn"
              placeholder="状态"
              disabled
            ></el-input>
          </el-form-item>
        </el-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          v-if="formInlineIsreturn"
          type="primary"
          @click="borrowBookClick"
          >确定借阅</el-button
        >
        <el-button
          v-else
          type="info"
          @click="dialogFormVisible = false"
          disabled
          >借完</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  SelectBook,
  SelectBookSort,
  SelectBookPub,
  SelectSelector,
  SelectFuzzy,
  borrowBook,
  SelectBookshelf,
} from "../../network/book";
export default {
  methods: {
    handleClick(row) {
      this.dialogFormVisible = true;
      this.formInline = row;
      // TODO
      this.formInlineIsreturn = row.isreturn === 0 ? 0 : 1;
    },
    isreturn(row) {
      return row.isreturn ? "可借" : "借完";
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.queryModel === 2) {
        //模糊查询
        SelectFuzzy(this.form.bookName, this.currentPage, this.pageSize).then(
          (res) => {
            // TODO
            /* this.tableData = res
            this.total = 7 */
            if (res) {
              this.tableData = res.data;
              this.total = res.total;
              // 最后要删
              // for (let i = 0; i < this.tableData.length; i++) {
              //   if (this.tableData[i].isreturn === undefined)
              //   this.tableData[i].isreturn = 1
              // }
            } else {
              this.tableData = [];
              this.total = 0;
            }
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
          /* this.tableData = res
            this.total = 6 */
          if (res) {
            this.tableData = res.data;
            this.total = res.total;
          } else {
            this.tableData = [];
            this.total = 0;
          }
        });
      } else {
        // 普通查询
        SelectBook(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          /* this.tableData = res
            this.total = 8 */
          if (res) {
            this.tableData = res.data;
            this.total = res.total;
          } else {
            this.tableData = [];
            this.total = 0;
          }
          // this.total = res.total
        });
      }
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    onSubmitSeletor() {
      this.currentPage = 1;
      SelectSelector(
        this.formSeletor.sort,
        this.formSeletor.pub,
        this.formSeletor.isreturn
      ).then((res) => {
        // TODO
        /* this.tableData = res
          this.total = 6 */
        if (res) {
          this.tableData = res.data;
          this.total = res.total;
        } else {
          this.tableData = [];
          this.total = 0;
        }
      });
      console.log(this.formSeletor);
      this.queryModel = 1;
    },
    onSubmitFuzzy() {
      this.currentPage = 1;
      console.log(this.form.bookName);
      if (this.form.bookName) {
        SelectFuzzy(this.form.bookName).then((res) => {
          // TODO
          /* this.tableData = res
            this.total = 7 */
          // console.log('模糊查询', res)
          if (res) {
            this.tableData = res.data;
            this.total = res.total;
            // 最后要删

            // for (var i = 0; i < this.tableData.length; i++) {
            //   if (this.tableData[i].isreturn === undefined)
            //   this.tableData[i].isreturn = 1
            // }
            // this.tableData[1].isreturn = 0
            // console.log('模糊查询', this.tableData, 'this.tableDate')
          } else {
            this.tableData = [];
            this.total = 0;
          }
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        SelectBook(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          // this.tableData = res
          // this.total = res.total
          if (res) {
            this.tableData = res.data;
            this.total = res.total;
          } else {
            this.tableData = [];
            this.total = 0;
          }
        });
        this.queryModel = 0;
      }
    },
    borrowBookClick() {
      SelectBookshelf(this.$user.userId).then((res) => {
        if (res && res.total >= 3) {
          this.$message({
            type: "error",
            message: "每个用户最多同时借三本书",
            center: true,
          });
          this.dialogFormVisible = false;
        } else {
          let history = Object.assign(
            {
              userId: this.$user.userId,
              isreturn: 0,
              validityDate: 60,
              userName: this.$user.userName,
            },
            this.formInline
          );

          borrowBook(history).then((res) => {
            if (res) {
              this.dialogFormVisible = false;
              this.$message({
                type: "success",
                message: "借书成功",
              });
              this.formInline.isreturn = 0;
            }
          });
        }
      });
    },
    changeBookStatus(bookId) {
      console.log("eventBus changeBookStatus ", bookId);
    },
  },

  data() {
    return {
      tableData: [], // 书籍列表
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
      formSeletor: {
        // 筛选表单
        sort: "所有",
        pub: "所有",
        isreturn: "所有",
      },
      currentPage: 1,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        // 模糊查询表单
        bookName: "",
      },
      formLabelWidth: "120px",
      pageSize: 5,
      formInlineIsreturn: "0",
      total: 8,
      bookSorts: [],
      bookPubs: [],
      queryModel: 0, // 当前查询状态，用户分页切换，分页查询0， 筛选查询1， 模糊查询2
    };
  },
  created() {
    SelectBook(this.currentPage, this.pageSize).then((res) => {
      // console.log('书库',res.data)
      // TODO
      // this.tableData = res
      // this.total = res.total
      if (res) {
        // for (let i = 0; i < res.data.length; i++) {
        //   res.data[i].isreturn = 1
        // }
        this.tableData = res.data;
        this.total = res.total;
      } else {
        this.tableData = [];
        this.total = 0;
      }
    });
    SelectBookSort().then((res) => {
      this.bookSorts = res.data;
    });
    SelectBookPub().then((res) => {
      this.bookPubs = res.data;
    });
  },
  mounted() {
    // 书架还书后改变当前图书中该书（若有）的状态
    this.$eventBus.$on("changeBookStatus", (bookId) => {
      console.log("eventBus changeBookStatus ", bookId);
      // this.tableData[1].isreturn = 1
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].bookId == bookId) {
          this.tableData[i].isreturn = 1;
          break;
        }
      }
    });
  },
};
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  padding: 10px 10px 20px;
}
.demo-form-inline {
  text-align: right;
}
.el-form--inline .el-form-item {
  margin-right: 5px;
}

.el-tag {
  cursor: pointer;
}
/* .el-input__inner {
   width: 100px;
 }*/
.demo-form-inline2 {
  /* position: absolute; */
}


=======
<template>
  <div class="library" id="library">
    <div class="title">书库</div>

    <el-form
      :inline="true"
      :model="formSeletor"
      class="demo-form-inline demo-form-inline1"
    >
      <!-- <el-form-item label="书名">
        <el-input v-model="formSeletor.user" placeholder="审批人"></el-input>
      </el-form-item> -->
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
          v-model="formSeletor.isreturn"
          placeholder="剩余情况"
          width="50px"
        >
          <el-option label="所有" value="所有"></el-option>
          <el-option label="借完" value="0"></el-option>
          <el-option label="可借" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitSeletor" >查询</el-button>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      :model="form"
      class="demo-form-inline demo-form-inline2"
    >
      <el-form-item>
        <el-input v-model="form.bookName" placeholder="书名" @keyup.enter.native="onSubmitFuzzy"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%; min-height: 330px; margin-bottom: 15px"
      :default-sort = "{prop: 'bookRecord', order: 'descending'}"
    >
      <el-table-column prop="bookName" label="书名"> </el-table-column>
      <el-table-column prop="bookSort" label="类别"> </el-table-column>
      <el-table-column prop="bookAuthor" label="作者"> </el-table-column>
      <el-table-column prop="bookPub" label="出版社"> </el-table-column>
      <el-table-column prop="bookRecord" label="上架时间" sortable>
        <!-- {{ $moment().format('YYYY-MM-DD') }} -->
      </el-table-column>

      <el-table-column label="状态" width="70">
        <div slot-scope="scope">
          <el-tag
            @click="handleClick(scope.row)"
            :type="scope.row.isreturn != 1 ? 'info' : 'primary'"
            disable-transitions
            >{{ scope.row.isreturn != 1 ? "借完" : "借阅" }}</el-tag
          >
        </div>
      </el-table-column>
    </el-table>

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

    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
-->
    <el-dialog title="书籍信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          label-width="60px"
          style="text-align: center"
        >
          <!-- <el-form-item label="图书ID">
        <el-input v-model="formInline.user" placeholder="姓名" disabled></el-input>
      </el-form-item> -->
          <el-form-item label="书名">
            <el-input
              v-model="formInline.bookName"
              placeholder="书名"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-input
              v-model="formInline.bookSort"
              placeholder="分类"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="出版社">
            <el-input
              v-model="formInline.bookPub"
              placeholder="出版社"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input
              v-model="formInline.bookAuthor"
              placeholder="作者"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="上架">
            <el-input
              v-model="formInline.bookRecord"
              placeholder="上架"
              disabled
            >
              <!-- {{ $moment().format('YYYY-MM-DD') }} -->
              <!-- {{ 123 }} -->
            </el-input>
          </el-form-item>
          <el-form-item label="状态   ">
            <el-input
              v-model="formInline.isreturn"
              placeholder="状态"
              disabled
            ></el-input>
          </el-form-item>
        </el-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          v-if="formInlineIsreturn"
          type="primary"
          @click="borrowBookClick"
          >确定借阅</el-button
        >
        <el-button
          v-else
          type="info"
          @click="dialogFormVisible = false"
          disabled
          >借完</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  SelectBook,
  SelectBookSort,
  SelectBookPub,
  SelectSelector,
  SelectFuzzy,
  borrowBook,
  SelectBookshelf,
} from "../../network/book";
export default {
  methods: {
    handleClick(row) {
      this.dialogFormVisible = true;
      this.formInline = row;
      // TODO
      this.formInlineIsreturn = row.isreturn === 0 ? 0 : 1;
    },
    isreturn(row) {
      return row.isreturn ? "可借" : "借完";
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.queryModel === 2) {
        //模糊查询
        SelectFuzzy(this.form.bookName, this.currentPage, this.pageSize).then(
          (res) => {
            // TODO
            /* this.tableData = res
            this.total = 7 */
            if (res) {
              this.tableData = res.data;
              this.total = res.total;
              // 最后要删
              // for (let i = 0; i < this.tableData.length; i++) {
              //   if (this.tableData[i].isreturn === undefined)
              //   this.tableData[i].isreturn = 1
              // }
            } else {
              this.tableData = [];
              this.total = 0;
            }
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
          /* this.tableData = res
            this.total = 6 */
          if (res) {
            this.tableData = res.data;
            this.total = res.total;
          } else {
            this.tableData = [];
            this.total = 0;
          }
        });
      } else {
        // 普通查询
        SelectBook(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          /* this.tableData = res
            this.total = 8 */
          if (res) {
            this.tableData = res.data;
            this.total = res.total;
          } else {
            this.tableData = [];
            this.total = 0;
          }
          // this.total = res.total
        });
      }
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    onSubmitSeletor() {
      this.currentPage = 1;
      SelectSelector(
        this.formSeletor.sort,
        this.formSeletor.pub,
        this.formSeletor.isreturn,
        0,
        8
      ).then((res) => {
        // TODO
        /* this.tableData = res
          this.total = 6 */
        if (res) {
          console.log('筛选查询', res)
          this.tableData = res.data;
          this.total = res.total;
        } else {
          this.tableData = [];
          this.total = 0;
        }
      });
      console.log(this.formSeletor);
      this.queryModel = 1;
    },
    onSubmitFuzzy() {
      this.currentPage = 1;
      console.log(this.form.bookName);
      if (this.form.bookName) {
        SelectFuzzy(this.form.bookName).then((res) => {
          // TODO
          /* this.tableData = res
            this.total = 7 */
          // console.log('模糊查询', res)
          if (res) {
            this.tableData = res.data;
            this.total = res.total;
            // 最后要删

            // for (var i = 0; i < this.tableData.length; i++) {
            //   if (this.tableData[i].isreturn === undefined)
            //   this.tableData[i].isreturn = 1
            // }
            // this.tableData[1].isreturn = 0
            // console.log('模糊查询', this.tableData, 'this.tableDate')
          } else {
            this.tableData = [];
            this.total = 0;
          }
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        SelectBook(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          // this.tableData = res
          // this.total = res.total
          if (res) {
            this.tableData = res.data;
            this.total = res.total;
          } else {
            this.tableData = [];
            this.total = 0;
          }
        });
        this.queryModel = 0;
      }
    },
    borrowBookClick() {
      SelectBookshelf(this.$user.userId).then((res) => {
        if (res && res.total >= 3) {
          this.$message({
            type: "error",
            message: "每个用户最多同时借三本书",
            center: true,
          });
          this.dialogFormVisible = false;
        } else {
          let history = Object.assign(
            {
              userId: this.$user.userId,
              isreturn: 0,
              validityDate: 60,
              userName: this.$user.userName,
            },
            this.formInline
          );

          borrowBook(history).then((res) => {
            if (res) {
              this.dialogFormVisible = false;
              this.$message({
                type: "success",
                message: "借书成功",
              });
              this.formInline.isreturn = 0;
            }
          });
        }
      });
    },
    changeBookStatus(bookId) {
      console.log("eventBus changeBookStatus ", bookId);
    },
  },

  data() {
    return {
      tableData: [], // 书籍列表
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
      formSeletor: {
        // 筛选表单
        sort: "所有",
        pub: "所有",
        isreturn: "所有",
      },
      currentPage: 1,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        // 模糊查询表单
        bookName: "",
      },
      formLabelWidth: "120px",
      pageSize: 5,
      formInlineIsreturn: "0",
      total: 8,
      bookSorts: [],
      bookPubs: [],
      queryModel: 0, // 当前查询状态，用户分页切换，分页查询0， 筛选查询1， 模糊查询2
    };
  },
  created() {
    SelectBook(this.currentPage, this.pageSize).then((res) => {
      // console.log('书库',res.data)
      // TODO
      // this.tableData = res
      // this.total = res.total
      if (res) {
        // for (let i = 0; i < res.data.length; i++) {
        //   res.data[i].isreturn = 1
        // }
        this.tableData = res.data;
        this.total = res.total;
      } else {
        this.tableData = [];
        this.total = 0;
      }
    });
    SelectBookSort().then((res) => {
      this.bookSorts = res.data;
    });
    SelectBookPub().then((res) => {
      this.bookPubs = res.data;
    });
  },
  mounted() {
    // 书架还书后改变当前图书中该书（若有）的状态
    this.$eventBus.$on("changeBookStatus", (bookId) => {
      console.log("eventBus changeBookStatus ", bookId);
      // this.tableData[1].isreturn = 1
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].bookId == bookId) {
          this.tableData[i].isreturn = 1;
          break;
        }
      }
    });
  },
};
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  padding: 10px 10px 20px;
}
.demo-form-inline {
  text-align: right;
}
.el-form--inline .el-form-item {
  margin-right: 5px;
}

.el-tag {
  cursor: pointer;
}
/* .el-input__inner {
   width: 100px;
 }*/
.demo-form-inline2 {
  /* position: absolute; */
}


>>>>>>> 09c9168d4f7ecbd49e633406c551332b111bf4b5
</style>