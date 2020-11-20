<template>
  <div class="container">
    <nav-header></nav-header>
    <nav-right></nav-right>
    <tag />
    <div :class="{ 'content-box': true, 'content-collapse': collapse }">
      <div class="crumbs">
        <i :class="icon"></i>
        <span>{{ tagName }}</span>
      </div>
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
              <el-input
                v-model="formInline.user"
                placeholder="审批人"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="content-body">
          <el-table ref="filterTable" :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="书名" fixed> </el-table-column>
            <el-table-column prop="name" label="出版社"> </el-table-column>
            <el-table-column prop="name" label="类别"> </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              sortable
              width="150"
              column-key="date"
            >
            </el-table-column>
            <el-table-column prop="name" label="作者"> </el-table-column>
            <el-table-column
              prop="tag"
              label="状态"
              :filters="[
                { text: '未借', value: '未借' },
                { text: '已借', value: '已借' },
              ]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  @click="dialogFormVisible = true"
                  :type="scope.row.tag === '未借' ? 'success' : 'primary'"
                  disable-transitions
                  >{{ scope.row.tag }}</el-tag
                >
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="修改资料" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="书名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="出版社" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="作者" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="类别" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="未借" value="shanghai"></el-option>
                  <el-option label="已借" value="beijing"></el-option>
                </el-select>
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
        <div class="page">
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              layout="total, prev, pager, next, jumper"
              :total="400"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import NavRight from "@/components/NavRight.vue";
import Tag from "@/components/Tag.vue";
export default {
  name: "Index",
  components: {
    NavHeader,
    Tag,
    NavRight,
  },
  data() {
    return {
      collapse: true,
      tagName: "",
      icon: "",
      formInline: {
        user: "",
        region: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          tag: "未借",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          tag: "已借",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          tag: "未借",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          tag: "已借",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          tag: "已借",
        },
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
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
      formLabelWidth: "60px",
    };
  },
  methods: {
    isCollapse(val) {
      this.collapse = val;
    },
    onSubmit() {
      console.log("submit!");
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  mounted() {
    this.$eventBus.$on("eventBusName", (val) => {
      this.isCollapse(val);
    });
    this.$eventBusTag.$on("eventBusName", (val) => {
      this.tagName = val;
    });
    this.$eventBusiIcon.$on("eventBusName", (val, index, path) => {
      console.log(val);
      this.icon = index;
      if (this.$route && this.$route.path !== "/" + path) {
        console.log("home454545");
        this.$router.push("/" + path);
      }
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
  left: 200px;
  right: 0;
  top: 120px;
  bottom: 0;
  width: auto;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
}
.container .content-collapse {
  left: 65px;
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