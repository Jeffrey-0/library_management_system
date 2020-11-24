<template>
  <div id="loginC">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="40px"
      class="demo-ruleForm"
    >
      <el-form-item label="ID" prop="id">
        <el-input v-model.number="ruleForm.id" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../network/login";
// TODO
// import {loginP} from '../network/login'
export default {
  props: ["toLoginC"],
  data() {
    var checkId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("ID不能为空"));
      }
      setTimeout(() => {
        callback();
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value !== "") {
          let regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}/;
          if (value.length < 8) {
            return callback(new Error("长度不能小于8"));
          } else if (value.length > 30) {
            return callback(new Error("长度不能大于30"));
          } else if (!regex.test(value)) {
            return callback(new Error("必须有大小写字母和特殊字符"));
          } else {
            callback();
          }
        }
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "aA@000000",
        id: "1",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        id: [{ validator: checkId, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          console.log("login---");
          console.log(this.ruleForm.id, this.ruleForm.pass);
          // 发起登录请求
          // TODO  ----loginP
          login(this.ruleForm.id, this.ruleForm.pass).then((res) => {
            console.log(res);
            // TODO ---res.userId
            if (res) {
              // 保存用户到sessionStorage
              // TODO res[0] => res
              if (res.userCategory == "-1") {
                this.$message({
                message: "登录失败，该用户已被禁用",
                type: "error",
                center: true,
                offset: 40,
              })
              } else {
                sessionStorage.setItem("user", JSON.stringify(res));
                Object.assign(this.$user, res);

                console.log("登录成功$user", this.$user);
                this.$message({
                  message: "登录成功",
                  type: "success",
                  center: true,
                  offset: 40,
                });

                // TODO
                console.log(res);
                if (res.userCategory == "1") {
                  this.$router.push("/helloworld");
                } else {
                  this.$router.push("/index");
                }
              }

            } else {
              console.log("登录失败");
              this.$message({
                message: "ID或密码错误",
                type: "error",
                center: true,
                offset: 40,
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  // 监听父组件中传过来的参数toLoginC变化
  watch: {
    toLoginC: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
        this.ruleForm.id = newValue && newValue.userId;
        this.ruleForm.pass = newValue && newValue.userPassword;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.el-button {
  width: 100%;
}

.el-tabs--border-card {
  background: hsla(0, 0%, 100%, 0.3);
  border: 0px solid white;
}
</style>
