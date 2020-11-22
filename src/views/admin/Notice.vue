<template>
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
            <el-input v-model="formInline.user" placeholder="查询公告"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-button
            type="success"
            class="publish"
            size="small"
            @click="dialogNoticeVisible = true"
            >发布新公告</el-button
          >
        </el-form>
      </div>
      <el-table :data="tableData" border style="width: 100%;min-height:380px;margin-bottom:15px ">
        <el-table-column prop="noticeContent" label="公告内容"></el-table-column>
        <el-table-column prop="userName" label="上传人" width="120"> </el-table-column>
        <el-table-column prop="noticeCreatedtime" label="上传日期" width="120"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="144">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="small"
              >查看</el-button
            >
              <el-button type="info" size="small" @click="cancel">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 公告详情对话框 -->
      <el-dialog title="公告" :visible.sync="dialogFormVisible">
        <div class="notice-body">{{formInline.noticeContent}}
          <div class="notice-info">发布者: {{formInline.userName}}  {{formInline.noticeCreatedtime}}</div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 添加新公告对话框 -->
      <el-dialog title="添加公告" :visible.sync="dialogNoticeVisible">
        <div class="notice-body">
          <el-input v-model="publishNotice.noticeContent" type="textarea" rows="5" placeholder="请输入新公告的内容"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogNoticeVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogNoticeVisible = false"
            >确 定</el-button
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
</template>

<script>
import { SelectNotice, SelectSelector, SelectFuzzy } from "../../network/notice";
export default {
  name: "Notice",
  data() {
    return {
      collapse: true,
      tagName: "",
      formInline: {
        noticeContent: "",
        noticeCreatedtime: "",
        userName:"",
      },
      publishNotice: {
        noticeContent: "",
        noticeCreatedtime: "",
        userName:"",
      },
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 6,
      dialogFormVisible: false,
      dialogNoticeVisible: false,
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
    SelectNotice(this.currentPage, this.pageSize).then((res) => {
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
      this.formInline = row
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
        SelectNotice(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.tableData = res;
          this.total = 8;
          // this.total = res.total
        });
      }
    },
    cancel() {
      this.$confirm("此操作将删除这条公告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
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
.container .content-box .content .search .publish {
  margin-left: 50px;
}
.content-box .content .notice-body {
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  border: 1px solid #ddd;
}
.content-box .content .notice-body .notice-info {
  text-align: right;
  margin: 10px 15px 0 0;
}

</style>