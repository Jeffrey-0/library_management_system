<template>
  <div id="loginC">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="40px" class="demo-ruleForm">
      <el-form-item label="ID" prop="username">
        <el-input v-model.number="ruleForm.username" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {login} from '../network/login'
export default {
    data() {
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('ID不能为空'));
        }
        setTimeout(() => {
          callback()
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (value !== '') {
            let regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}/
            if (value.length < 8) {
              return callback(new Error('长度不能小于8'))
            } else if (value.length > 30) {
              return callback(new Error('长度不能大于30'))
            } else if (!regex.test(value)) {
              return callback(new Error('必须有大小写字母已经特殊字符'))
            } else {
              callback()
            }
          }
          callback()
        }
      }
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          username: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            console.log('login---')
            console.log(this.ruleForm.username, this.ruleForm.pass)
            // 发起登录请求
            login(this.ruleForm.username, this.ruleForm.pass).then(res => {
              if(res.length > 0) {
                console.log('登录成功')
                this.$message({
                message: '登录成功',
                type: 'success',
                center: true
              })
              } else {
                console.log('登录失败')
                this.$message({
                message: '账号或密码错误',
                type: 'error',
                center: true
              })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped> 
 .el-button {
   width: 100%;
 }

 .el-tabs--border-card{
   background: hsla(0,0%,100%,.3);
   border: 0px solid white;
 }
</style>
