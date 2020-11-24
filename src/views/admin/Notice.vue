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
            <el-input
              v-model="form.noticeContent"
              placeholder="查询公告"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
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
      <el-table
        :data="tableData"
        border
        style="width: 100%; min-height: 330px; margin-bottom: 15px"
      >
        <el-table-column
          :show-overflow-tooltip="true"
          prop="noticeContent"
          label="公告内容"
        ></el-table-column>
        <el-table-column prop="userName" label="上传人" width="120">
        </el-table-column>
        <el-table-column prop="noticeCreatetime" label="上传日期" width="140">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="144">
          <template slot-scope="scope">
            <el-tag
              @click="handleClick(scope.row)"
              type="primary"
              class="tag-btn"
              >查 看</el-tag
            >
            <el-tag @click="cancel(scope.row)" type="info" class="tag-btn"
              >删 除</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 公告详情对话框 -->
      <el-dialog title="公告" :visible.sync="dialogFormVisible">
        <div class="notice-body">
          {{ formInline.noticeContent }}
          <div class="notice-info">
            发布者: {{ formInline.userId }} {{ formInline.noticeCreatetime }}
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisible = false"
            >取 消</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 添加新公告对话框 -->
      <el-dialog title="添加公告" :visible.sync="dialogNoticeVisible">
        <div class="notice-body">
          <el-input
            v-model="publishNotice.noticeContent"
            type="textarea"
            rows="5"
            placeholder="请输入新公告的内容"
          ></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogNoticeVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" size="small" @click="addNotice"
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
import {
  SelectNotice,
  // SelectSelector,
  SelectNoticeFuzzy,
  deleteNotice,
  addNotice,
} from "../../network/notice";
export default {
  name: "Notice",
  data() {
    return {
      collapse: true,
      tagName: "",
      formInline: {
        noticeContent: "",
        noticeCreatetime: "",
        userId: "",
      },
      publishNotice: {
        noticeContent: "",
        noticeCreatetime: "",
        userAuthor: "",
      },
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      dialogFormVisible: false,
      dialogNoticeVisible: false,
      form: {
        noticeContent: "",
      },
      formLabelWidth: "70px",
    };
  },
  created() {
    SelectNotice(this.currentPage, this.pageSize).then((res) => {
      // TODO
      console.log(res);
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
      console.log(row);
      this.dialogFormVisible = true;
      this.formInline = row;
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.queryModel === 2) {
        //模糊查询
        SelectNoticeFuzzy(
          this.form.noticeContent,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
      } /*  else if (this.queryModel === 1) {
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
      }  */ else {
        // 普通查询
        SelectNotice(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.tableData = res.data;
          this.total = res.total;
          // this.total = res.total
        });
      }
    },
    cancel(row) {
      //注销禁用
      this.$confirm("此操作将删除这条公告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row.noticeId, 999);
          deleteNotice(row.noticeId);
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
    onSubmitFuzzy() {
      //模糊查询
      this.currentPage = 1;
      if (this.form.noticeContent) {
        SelectNoticeFuzzy(this.form.noticeContent).then((res) => {
          // TODO
          console.log(res);
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        SelectNotice(this.currentPage, this.pageSize).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 0;
      }
    },
    addNotice() {
      Date.prototype.format = function (fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds(), //毫秒
        };

        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }

        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }

        return fmt;
      };
      this.publishNotice.userId = this.$user.userId;
      this.publishNotice.noticeCreatetime = new Date().format("yyyy-MM-dd");
      addNotice(this.publishNotice);
      this.dialogNoticeVisible = false;
      this.$message({
            type: "success",
            message: "发布成功!",
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
.tag-btn {
  cursor: pointer;
  margin-right: 10px;
}
</style>