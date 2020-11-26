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
                :label="item"
                :value="item"
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
                :key="item.pubId"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="剩余情况">
        <el-input v-model="formSeletor.user" placeholder="审批人"></el-input>
      </el-form-item> -->
          <!-- <el-form-item label="状态">
        <el-select v-model="formSeletor.status" placeholder="剩余情况" width="50px">
          <el-option label="所有" value="所有"></el-option>
          <el-option label="借完" value="0"></el-option>
          <el-option label="可借" value="1"></el-option>
        </el-select>
      </el-form-item> -->
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
              placeholder="输入书名，宁少字，不多字"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
            <el-button
              type="success"
              class="publish"
              size="small"
              @click="dialogNewBookVisible = true"
              >添加新书籍</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="content-body">
        <el-table
          ref="filterTable"
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
          <el-table-column
            prop="bookPub"
            :show-overflow-tooltip="true"
            label="出版社"
          >
          </el-table-column>
          <el-table-column prop="bookSort" label="类别"> </el-table-column>
          <el-table-column
            prop="bookRecord"
            label="上架日期"
            sortable
            width="150"
            column-key="date"
          >
          </el-table-column>
          <el-table-column
            prop="bookAuthor"
            :show-overflow-tooltip="true"
            label="作者"
          >
          </el-table-column>
          <el-table-column prop="tag" label="操作" width="160">
            <template slot-scope="scope">
              <el-tag
                @click="handleClick(scope.row)"
                type="primary"
                disable-transitions
                class="tag-btn"
                >编辑</el-tag
              >
              <el-tag @click="cancel(scope.row)" type="info" class="tag-btn"
                >删 除</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 修改资料对话框 -->
        <el-dialog title="书籍资料" :visible.sync="dialogFormVisible">
          <el-form
            :model="formInline"
            class="demo-form-inline"
            label-width="60px"
          >
            <div class="book-info">
              <el-form-item label="出版社" :label-width="formLabelWidth">
                <el-select v-model="formInline.bookPub" placeholder="出版社">
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="item in bookPubs"
                    :key="item.pubId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="类别" :label-width="formLabelWidth">
                <el-select v-model="formInline.bookSort" placeholder="类别">
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="item in bookSorts"
                    :key="item.sortId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="作者" :label-width="formLabelWidth">
                <el-input v-model="formInline.bookAuthor"></el-input>
              </el-form-item>
              <el-form-item label="书名" :label-width="formLabelWidth">
                <el-input
                  v-model="formInline.bookName"
                  placeholder="书名"
                ></el-input>
              </el-form-item>
            </div>
            <div class="book-img">
              <label class="lable-img"
                ><img
                  :src="formInline.bookImg"
                  alt="无法加载图片"
                  title="点击更换封面"
                  @error="defualtImg"
                />
                <input
                  type="file"
                  class="img-input"
                  name="img"
                  @change="imgReplace"
                />
              </label>
            </div>

            <el-form-item label="上架时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="formInline.bookRecord"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="简介" :label-width="formLabelWidth">
              <el-input v-model="formInline.bookIntroduc"></el-input>
            </el-form-item>
            <!-- <el-form-item label="状态" :label-width="formLabelWidth">
              <el-select v-model="formInline.isreturn" placeholder="请选择活动区域">
                <el-option label="未借" value="shanghai"></el-option>
                <el-option label="已借" value="beijing"></el-option>
              </el-select>
            </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateBookInfo">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 添加图书对话框 -->
        <el-dialog title="书籍资料" :visible.sync="dialogNewBookVisible">
          <el-form
            :model="formNewBook"
            class="demo-form-inline"
            label-width="60px"
          >
            <div class="book-info">
              <el-form-item label="出版社" :label-width="formLabelWidth">
                <el-select v-model="formNewBook.bookPub" placeholder="请输入出版社">
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="item in bookPubs"
                    :key="item.pubId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="类别" :label-width="formLabelWidth">
                <el-select v-model="formNewBook.bookSort" placeholder="请输入类别">
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="item in bookSorts"
                    :key="item.sortId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="作者" :label-width="formLabelWidth" >
                <el-input v-model="formNewBook.bookAuthor" placeholder="请输入作者"></el-input>
              </el-form-item>
              <el-form-item label="书名" :label-width="formLabelWidth">
                <el-input
                  v-model="formNewBook.bookName"
                  placeholder="请输入书名"
                ></el-input>
              </el-form-item>
            </div>
            <div class="add-book-img">
              <label class="lable-img"
                ><img
                  v-if="formNewBook.bookImg"
                  :src="formNewBook.bookImg"
                  alt="无法加载图片"
                  title="点击更换封面"
                />
                <li v-else class="el-icon-plus img-icon"></li>
                <input
                  type="file"
                  class="img-input"
                  name="img"
                  @change="imgInput"
                />
              </label>
            </div>

            <el-form-item label="简介" :label-width="formLabelWidth">
              <el-input v-model="formNewBook.bookIntroduc" placeholder="请输入简介"></el-input>
            </el-form-item>
            <!-- <el-form-item label="状态" :label-width="formLabelWidth">
              <el-select v-model="formInline.isreturn" placeholder="请选择活动区域">
                <el-option label="未借" value="shanghai"></el-option>
                <el-option label="已借" value="beijing"></el-option>
              </el-select>
            </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogNewBookVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBook">发 布</el-button>
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
  SelectBook,
  getPub,
  getSort,
  SelectSelector,
  SelectFuzzy,
  DeleteBook,
  saveBook,
  updateBook,
} from "../../network/book";
export default {
  name: "Books",
  components: {},
  data() {
    return {
      collapse: true,
      tagName: "",
      icon: "",
      formInline: {
        // 书籍详情模态框
        id: "",
        bookId: "",
        bookName: "",
        bookAuthor: "",
        bookPub: "",
        bookSort: "",
        bookRecord: "",
        bookIntroduc: "",
        bookImg: require("../../assets/img/avatar.png"),
        isreturn: 0,
      },
      formNewBook: {
        // 添加书籍模态框
        bookId: "",
        bookName: "",
        bookAuthor: "",
        bookPub: "",
        bookSort: "",
        bookIntroduc: "",
        bookImg: "",
        file: "",
      },
      tableData: [], //书籍列表

      currentPage: 1,
      pageSize: 5,
      dialogFormVisible: false,
      dialogNewBookVisible: false,
      formInlineIsreturn: "0",
      total: 0,
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
      bookImgUrl: "",
      defualtPic: require("../../assets/img/avatar.png"),
      imageFile: "",
      
    };
  },
  methods: {
    imgInput(even) {
      // this.imageUrl = event.target.value;
      let $target = even.target || even.srcElement;
      let file = $target.files[0];
      console.log(file, "52654");
      var reader = new FileReader();
      reader.onload = (data) => {
        let res = data.target || data.srcElement;
        this.formNewBook.bookImg = res.result;
      };
      reader.readAsDataURL(file);
      this.imageFile = file;
    },
    imgReplace(even) {
      let $target = even.target || even.srcElement;
      let file = $target.files[0];
      console.log(file, "5555");
      var reader = new FileReader();
      reader.onload = (data) => {
        let res = data.target || data.srcElement;
        this.formInline.bookImg = res.result;
      };
      reader.readAsDataURL(file);
    },
    defualtImg() {
      this.bookImgUrl=this.defualtPic;
    },
    isCollapse(val) {
      this.collapse = val;
    },
    onSubmit() {
      console.log("submit!");
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.queryModel === 2) {
        //模糊查询
        SelectFuzzy(this.form.bookName, this.currentPage, this.pageSize).then(
          (res) => {
            // TODO
            console.log("****");
            this.tableData = res.data;
            this.total = res.total;
          }
        );
      } else if (this.queryModel === 1) {
        // 筛选查询
        SelectSelector(
          this.formSeletor.sort,
          this.formSeletor.pub,
          "所有",
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
      } else {
        // 普通查询
        SelectBook(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.tableData = res.data;
          this.total = res.total;
          // this.total = res.total
        });
      }
    },
    handleClick(row) {
      this.dialogFormVisible = true;
      this.formInline = row;
      
        
      // this.formInlineIsreturn = row.isreturn
    },
    onSubmitFuzzy() {
      //模糊查询
      this.currentPage = 1;
      if (this.form.bookName) {
        SelectFuzzy(this.form.bookName).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        SelectBook(this.currentPage, this.pageSize).then((res) => {
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
    cancel(row) {
      //删除书籍
      this.$confirm("此操作将删除这本书籍数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          DeleteBook(row.bookId);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          SelectBook(this.currentPage, this.pageSize).then((res) => {
            // TODO
            this.tableData = res.data;
            this.total = res.total;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addBook() {
      this.dialogNewBookVisible = false;
      this.formNewBook.bookSort = this.formSeletor.sort;
      this.formNewBook.bookPub = this.formSeletor.pub;
      console.log(this.formNewBook.file, "5***4");

      let param = new FormData(); // 创建form对象
      param.append("file", this.imageFile); // 通过append向form对象添加数据
      // param.append("bookAuthor", this.formNewBook.bookAuthor);
      // param.append("bookIntroduc", this.formNewBook.bookIntroduc);
      // param.append("bookName", this.formNewBook.bookName);
      // param.append("bookPub", this.formNewBook.bookPub);
      // param.append("bookSort", this.formNewBook.bookSort);
      console.log(param.get("file")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      saveBook(param,this.formNewBook);
      console.log(param);
      this.$message({
        type: "success",
        message: "发布成功!",
      });
    },
    updateBookInfo() {
      //修改图书信息
      this.dialogFormVisible = false;
      this.formInline.bookRecord = this.$moment(
        new Date(this.formInline.bookRecord).getTime()
      ).format("YYYY-MM-DD");
      updateBook(this.formInline);
    },

    handleAvatarSuccess(file) {
      this.imageUrl = URL.createObjectURL(file.raw);

      console.log(file, "+++");
    },
    beforeAvatarUpload(file) {
      console.log(file, "878484");
      console.log(this.imageUrl, "1111");
      const isJPG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  created() {
    SelectBook(this.currentPage, this.pageSize).then((res) => {
      // TODO
      this.tableData = res.data;
      this.total = res.total;
    });
    getPub().then((res) => {
      this.bookPubs = res.data;
      console.log(this.bookSorts, "99999");
    });
    getSort().then((res) => {
      this.bookSorts = res.data;
    });
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
  padding-left: 167px;
}
.container .content-box .content .search .publish {
  margin-left: 50px;
}
.tag-btn {
  cursor: pointer;
  margin-right: 10px;
}
.book-info {
  width: 65%;
  display: inline-block;
}
.book-img {
  display: inline-block;
  width: 26%;
  height: 40%;
  text-align: center;
  vertical-align: center;
  line-height: 222px;
  margin-left: 25px;
  border: 1px solid #ddd;
  position: absolute;
}
.add-book-img {
  display: inline-block;
  width: 26%;
  height: 45%;
  text-align: center;
  vertical-align: center;
  line-height: 222px;
  margin-left: 25px;
  border: 1px solid #ddd;
  position: absolute;
}
 .lable-img {
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: block;
}
.book-img:hover {
  cursor: pointer;
}
 .img-icon {
  font-size: 40px;
  cursor: pointer;
}
.img-input {
  display: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}
.add-book-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.book-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.book-img img:hover {
  cursor: pointer;
}
.book-img .avatar-uploader {
  border: 1px dashed red;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>