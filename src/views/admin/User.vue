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
                v-model="formInline.userName"
                placeholder="查找用户"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%; min-height: 350px; margin-bottom: 15px"
        >
          <el-table-column prop="userName" label="姓名"> </el-table-column>
          <el-table-column prop="userSex" label="性别"> </el-table-column>
          <el-table-column prop="userPhone" label="手机"> </el-table-column>
          <el-table-column prop="userAge" label="年龄"> </el-table-column>
          <el-table-column prop="userEmail" label="邮箱"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="144">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="primary"
                size="small"
                >查看</el-button
              >
              <el-button type="info" size="small" @click="cancel"
                >禁用</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 修改资料对话框 -->
        <el-dialog title="用户资料" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form  :model="user"  class="demo-form-inline" label-width="60px" style="text-align:center">
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
            <el-form-item label="借阅详情" :label-width="formLabelWidth">
              <el-input v-model="user.user" disabled></el-input>
            </el-form-item>
          </el-form>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogFormVisible = false"
              >确 定</el-button
            >
            <el-button type="info" @click="dialogFormVisible = false"
              >禁 用</el-button
            >
          </div>
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
    </div>
  </div>
</template>

<script>
import {SelectUser,SelectFuzzy} from "../../network/user";
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
      currentPage: 1,
      pageSize: 5,
      total: 7,
      dialogFormVisible: false,
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
    SelectUser(this.currentPage, this.pageSize).then((res) => {
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
      console.log("submit!");
    },
    handleClick(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.user = row
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.queryModel === 2) {
        //模糊查询
        SelectFuzzy(this.user.userName, this.currentPage, this.pageSize).then(
          (res) => {
            // TODO
            this.tableData = res;
            this.total = 7;
          }
        );
      } else {
        // 普通查询
        SelectUser(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.tableData = res;
          this.total = 8;
          // this.total = res.total
        });
      }
    },

    cancel() {
      this.$confirm("此操作将禁用这个用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
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
</style>