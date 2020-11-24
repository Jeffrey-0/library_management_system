<template>
  <div>
    <div :class="{ 'content-box': true, 'content-collapse': collapse }">
      <div class="content">
        <div class="search">
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            size="small"
          >
            <el-form-item>
              <el-input
                v-model="form.userName"
                placeholder="查找用户"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%; min-height: 330px; margin-bottom: 15px"
        >
          <el-table-column prop="userName" label="姓名"> </el-table-column>
          <el-table-column prop="userSex" label="性别"> </el-table-column>
          <el-table-column prop="userPhone" label="手机"> </el-table-column>
          <el-table-column prop="userAge" label="年龄"> </el-table-column>
          <el-table-column prop="userEmail" label="邮箱" width="200">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="170">
            <template slot-scope="scope">
              <el-tag
                @click="handleClick(scope.row)"
                type="primary"
                class="tag-btn"
                >查 看</el-tag
              >
              <el-tag
                @click="cancel(scope.row)"
                :type="scope.row.userCategory == '-1' ? 'success' : 'info'"
                class="tag-btn"
                >{{
                  scope.row.userCategory == "-1" ? "解除禁用" : "禁用"
                }}</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 查看资料对话框 -->
        <el-dialog title="用户资料" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form
              :model="user"
              class="demo-form-inline"
              label-width="60px"
              style="text-align: center"
            >
              <el-form-item label="用户姓名" :label-width="formLabelWidth">
                <el-input v-model="user.userName" disabled></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-input v-model="user.userSex" disabled></el-input>
              </el-form-item>
              <el-form-item label="手机" :label-width="formLabelWidth">
                <el-input v-model="user.userPhone" disabled></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="user.userEmail" disabled></el-input>
              </el-form-item>
              <el-form-item label="借阅历史" :label-width="formLabelWidth">
                <el-table
                  :data="tableHistory"
                  max-height="200"
                  style="
                    width: 100%;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                  "
                >
                  <el-table-column prop="bookName" label="书名">
                  </el-table-column>
                  <el-table-column prop="borrowDate" label="借阅" width="120">
                  </el-table-column>
                  <el-table-column prop="returnDate" label="归还" width="120">
                  </el-table-column>
                  <el-table-column prop="isreturn" label="状态"
                    >{{ tableHistory.isreturn == 0 ? "未还" : "已还" }}
                  </el-table-column>
                  <el-table-column prop="validityDate" label="剩余">
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-form>
          </el-form>
        </el-dialog>
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
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
import {
  SelectUser,
  SelectFuzzy,
  searchBorrowHistory,
  forbiddenUser,
} from "../../network/user";
export default {
  name: "User",
  data() {
    return {
      collapse: true,
      tagName: "",
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      tableHistory: [], //借阅历史
      user: {
        id: "",
        userId: "",
        userName: "",
        userAge: "",
        userPassword: "",
        userEmail: "",
        userSex: "",
        userPhone: "",
        userCategory: "",
      },
      borrowHistory: {
        bookName: "",
        borrowDate: "",
        returnDate: "",
        isreturn: 0,
        validityDate: 0,
      },
      currentPage: 1,
      pageSize: 5,
      total: 0,
      queryModel: 0,
      dialogFormVisible: false,
      form: {
        userName: "",
      },
      formLabelWidth: "70px",
    };
  },
  created() {
    SelectUser(this.currentPage, this.pageSize).then((res) => {
      console.log(this.currentPage);
      // TODO
      this.tableData = res.data;
      this.total = res.total;
    });
  },
  methods: {
    isCollapse(val) {
      this.collapse = val;
    },

    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      this.dialogFormVisible = true;
      this.user = row;
      searchBorrowHistory(this.user.userId, 1, 100).then((res) => {
        if (res) {
          console.log(res);
          this.tableHistory = res.data;
        } else {
          this.tableHistory = [];
        }
      });
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.queryModel === 2) {
        //模糊查询
        SelectFuzzy(this.form.userName, this.currentPage, this.pageSize).then(
          (res) => {
            // TODO
            console.log(res, "+++");
            this.tableData = res.data;
            this.total = res.total;
          }
        );
      } else {
        // 普通查询
        SelectUser(this.currentPage, this.pageSize).then((res) => {
          console.log("普通查询");
          // TODO
          this.tableData = res.data;
          this.total = res.total;
          // this.total = res.total
        });
      }
    },

    cancel(row) {
      if (row.userCategory != "-1") {
        this.$confirm("此操作将禁用这个用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.user = row;
            this.user.userCategory = "-1";
            forbiddenUser(this.user.userId, this.user.userCategory);
            this.$message({
              type: "success",
              message: "禁用成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消禁用",
            });
          });
      } else {
        this.user = row;
        this.user.userCategory = "1";
        forbiddenUser(this.user.userId, this.user.userCategory);
        this.$message({
          type: "success",
          message: "已解除禁用",
        });
      }
    },
    onSubmitFuzzy() {
      //模糊查询
      this.currentPage = 1;
      console.log(this.form.userName, "++++");
      if (this.form.userName) {
        SelectFuzzy(this.form.userName).then((res) => {
          // TODO
          console.log(res, "99999996666");

          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        SelectUser(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 0;
      }
    },
    forIsreturn(row) {
      return row.validityDate ? row.validityDate : "0";
    },
  },
  mounted() {
    this.$eventBus.$on("eventBusName", (val) => {
      this.isCollapse(val);
    });
    this.$eventBusTag.$on("eventBusName", (val) => {
      console.log(val);
      this.tagName = val;
    });
  },
};
</script>
<style scoped>
.content-box {
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
.content-box .content {
  height: 100%;
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.container .content-box .content .search {
  padding-left: 375px;
}
.tag-btn {
  cursor: pointer;
  margin-right: 10px;
}
.content-box .crumbs {
  margin: 10px 0;
  text-align: left;
  color: #606266;
}
.content-box .content {
  height: 100%;
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>