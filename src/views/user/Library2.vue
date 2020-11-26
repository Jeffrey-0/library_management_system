<template>
  <div class="library" id="library">
    <!-- <div class="title">书库</div> -->
    <el-form
      :inline="true"
      :model="form"
      class="demo-form-inline demo-form-inline2"
      
      size="small"
    >
      <el-form-item>
        <el-input v-model="form.bookName" placeholder="书名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      :model="formSeletor"
      class="demo-form-inline demo-form-inline1"
      size="small"
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

    <div class="books">
      <div class="book-item" v-for="item in tableData" :key="item.bookId"  @click="handleClick(item)">
        <img v-if="item.bookImg" :src="$baseImgUrl + item.bookImg" alt="" onerror="this.src='https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=18407241,433710790&fm=26&gp=0.jpg'">
        <img v-else src="../../assets/img/avatar.png" alt="">
        <!-- <img :src="'../../assets/img/avatar/' + item.bookImg " alt=""> -->
        <div class="bookname">{{ item.bookName }}</div>
        <div class="bookdetail">
          <div class="introduce">
          {{ item.bookIntroduce }}
          </div>
          <!-- <div class="introduce" v-if="item.bookIntroduce">
          {{ item.bookIntroduce }}
          </div>
          <div class="introduce" v-else>
            <div>分类:</div>
            <div class="content"> {{item.bookSort}}</div>
            <div>出版社：</div>
            <div class="content"> {{item.bookPub}}</div>
            <div>作者：</div>
            <div class="content"> {{item.bookAuthor}}</div>
          </div> -->
          <div class="isreturn" :class="{primary : item.isreturn}">
          {{ item.isreturn != 1 ? "借完" : "借阅" }}
          </div>
        </div>
      </div>
    </div>

    <!-- <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%; min-height: 420px; margin-bottom: 15px"
      :default-sort = "{prop: 'bookRecord', order: 'descending'}"
    >
      <el-table-column prop="bookName" label="书名"> </el-table-column>
      <el-table-column prop="bookSort" label="类别"> </el-table-column>
      <el-table-column prop="bookAuthor" label="作者"> </el-table-column>
      <el-table-column prop="bookPub" label="出版社"> </el-table-column>
      <el-table-column prop="bookRecord" label="上架时间" sortable>
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
    </el-table> -->

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
          <el-form-item label="状态">
            <el-input
              v-model="formInlineItemReturn"
              placeholder="状态"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="简介" class="introduceItem">
            <el-input v-model="formInline.bookIntroduce" placeholder="简介" disabled type="textarea" rows="4"></el-input>
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
// import {baseImgUrl} from '../../common/util.js'
export default {
  methods: {
    onError() {
      console.log('错误图片' + event)
      var img=event.srcElement;
      img.src= require('../../assets/img/bg.jpg');
      // img.οnerrοr=null;
    },
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
      errorImg: require('../../assets/img/avatar/1.jpg'),
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
      pageSize: 8,
      formInlineIsreturn: "0",
      total: 0,
      bookSorts: [],
      bookPubs: [],
      queryModel: 0, // 当前查询状态，用户分页切换，分页查询0， 筛选查询1， 模糊查询2
    };
  },
  computed : {
    formInlineItemReturn () {
      return this.formInline.isreturn ? '可借' : '借完'
    }
  },
  created() {
    // console.log(baseImgUrl)
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
  position: absolute;
}
.books {
  width: 100%;
  /* background: #00000020; */
  height: 480px;
  /*display: flex;
  justify-content: space-between;
  flex-wrap: wrap;*/
}
.book-item:nth-child(4),.book-item:nth-child(8) {
  margin-right: 0;
}
.book-item {
  transition-duration: .7s;
  /*box-sizing: border-box;
  padding: 10px 30px;*/
  width: 20%;
  height: 220px;
  margin-right: 6%;
  float: left;
  position: relative;
  margin-top: 3px;
  margin-bottom: 12px;
  overflow: hidden;
  cursor: pointer;
}
.book-item img {
  width: 100%;
  height: 90%;
  border-radius: 5px;
  object-fit: cover;
}
.book-item .bookname {
  text-align: center;
  white-space: nowrap;
  /* text-overflow: ellipsis; */
  overflow: hidden;
  height: 10%;
}
.bookdetail {
  position: absolute;
  /* bottom: 20px; */
  width: 100%;
  height: 90%;
  top: -100%;
  left: 0;
  color: #ffffff;
  background: #000000aa;
  transition: 1s;
  border-radius: 5px;
}
.book-item:hover .bookdetail {
  display: block;
  cursor: pointer;
  transition: 1s;
  top: 0px;
}
.book-item .introduce {
  width: 100%;
  height: 85%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 18px 20px;
  line-height: 22px;
  color: #ccc;
  text-align: left;
}
.book-item .introduce .content {
  width: 100%;
  height: 20px;
  text-indent: 2em;
}
.book-item .isreturn {
  width: 100%;
  height: 15%;
  color:#F56C6C;
  line-height: 22px;
}
.book-item .isreturn.primary {
  color:#66b1ff;
}

</style>