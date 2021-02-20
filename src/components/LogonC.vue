<<<<<<< HEAD
<template>
  <div id="loginC">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="40px" class="demo-ruleForm">
      <el-form-item label="ID" prop="id">
        <el-input type="text" v-model.number="ruleForm.id" autocomplete="off" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="ruleForm.email" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" maxlength="30"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {logon, CheckuserId, CheckuserEmail} from '../network/login'
export default {
    data() {
      var checkID = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('ID不能为空'))
        }
          if (value !== '') {
          let regex = /^[1234567890]+$/
          if (!regex.test(value)) {
            return callback(new Error('ID只能为数字'))
          } else {
            
            CheckuserId(value).then(res => {
              console.log('id检测', res)
              if (res) {
                return callback(new Error('ID已存在'))
              } else {
                callback()
              }
            })
            
          }
        }
      }
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('姓名不能为空'));
        } else {
          if (value !== '') {
            let regex = /^[\u4e00-\u9fa5]+$/
            if (!regex.test(value)) {
              return callback(new Error('姓名只能为汉字'))
            } else {
              callback()
            }
          }
          callback()
        }
        callback()
      }
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        } else {
          if (value !== '') {
            let regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if (!regex.test(value)) {
              return callback(new Error('邮箱格式错误'))
            } else {
              
            CheckuserEmail(value).then(res => {
              console.log('邮箱检测', res)
              if (res) {
                return callback(new Error('该邮箱已注册过账号'))
              } else {
                callback()
              }
            })
              
            }
          }
          // callback()
        }
      }
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
              return callback(new Error('必须有大小写字母和特殊字符'))
            } else {
              callback()
            }
          }
          callback()
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          id: '',
          username: '',
          email: '',
          pass: '',
          checkPass: '',
        },
        rules: {
          id: [
            { validator: checkID, trigger: 'blur' }
          ],
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
          //  ,
          // age: [
          //   { validator: checkAge, trigger: 'blur' }
          // ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        // this.$emit('logonSuccess', {
        //   id: 123,
        //   password: 123
        // })
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('logon请求')
            logon(this.ruleForm.id, this.ruleForm.username, this.ruleForm.pass, this.ruleForm.email).then(res => {
              console.log(res)  
              if (!res) {
                this.$message({
                  message: '注册失败，ID或邮箱已存在',
                  type: 'error',
                  center: true,
                  offset: 40
                })
              } else {
                this.$message({
                  message: '注册成功',
                  type: 'success',
                  center: true,
                  offset: 40
                })
                // this.$router.go(0)
                // this.$router.replace('/login')
                res.userPassword = this.ruleForm.pass
                this.$emit('logonSuccess', res)
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
=======
<template>
  <div id="loginC">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="40px" class="demo-ruleForm">
      <el-form-item label="ID" prop="id">
        <el-input type="text" v-model.number="ruleForm.id" autocomplete="off" maxlength="15" placeholder="ID"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off" maxlength="20" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="ruleForm.email" maxlength="30" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" maxlength="30" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" maxlength="30" placeholder="确认密码"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {logon, CheckuserId, CheckuserEmail} from '../network/login'
export default {
    data() {
      var checkID = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('ID不能为空'))
        }
          if (value !== '') {
          let regex = /^[1234567890]+$/
          if (!regex.test(value)) {
            return callback(new Error('ID只能为数字'))
          } else {
            
            CheckuserId(value).then(res => {
              console.log('id检测', res)
              if (res) {
                return callback(new Error('ID已存在'))
              } else {
                callback()
              }
            })
            
          }
        }
      }
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('姓名不能为空'));
        } else {
          if (value !== '') {
            let regex = /^[\u4e00-\u9fa5]+$/
            if (!regex.test(value)) {
              return callback(new Error('姓名只能为汉字'))
            } else {
              callback()
            }
          }
          callback()
        }
        callback()
      }
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        } else {
          if (value !== '') {
            let regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if (!regex.test(value)) {
              return callback(new Error('邮箱格式错误'))
            } else {
              
            CheckuserEmail(value).then(res => {
              console.log('邮箱检测', res)
              if (res) {
                return callback(new Error('该邮箱已注册过账号'))
              } else {
                callback()
              }
            })
              
            }
          }
          // callback()
        }
      }
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
              return callback(new Error('必须有大小写字母和特殊字符'))
            } else {
              callback()
            }
          }
          callback()
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          id: '',
          username: '',
          email: '',
          pass: '',
          checkPass: '',
        },
        rules: {
          id: [
            { validator: checkID, trigger: 'blur' }
          ],
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
          //  ,
          // age: [
          //   { validator: checkAge, trigger: 'blur' }
          // ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        // this.$emit('logonSuccess', {
        //   id: 123,
        //   password: 123
        // })
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('logon请求')
            logon(this.ruleForm.id, this.ruleForm.username, this.ruleForm.pass, this.ruleForm.email).then(res => {
              console.log(res)  
              if (!res) {
                this.$message({
                  message: '注册失败，ID或邮箱已存在',
                  type: 'error',
                  center: true,
                  offset: 40
                })
              } else {
                this.$message({
                  message: '注册成功',
                  type: 'success',
                  center: true,
                  offset: 40
                })
                // this.$router.go(0)
                // this.$router.replace('/login')
                res.userPassword = this.ruleForm.pass
                this.$emit('logonSuccess', res)
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
>>>>>>> 09c9168d4f7ecbd49e633406c551332b111bf4b5
