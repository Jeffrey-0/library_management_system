<template>
  <div class="info">
    <div class="info_left">
    <div class="title">个人信息</div>
    <el-form :model="user" class="demo-form-inline" id="infoForm" label-width="40px">
      
      <el-form-item label="ID" >
        <el-input v-model="user.userId" placeholder="ID" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="user.userName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="user.userSex" placeholder="性别">
          <el-option label="男" value="shanghai"></el-option>
          <el-option label="女" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="user.userPhone" placeholder="手机"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="user.userAge" placeholder="年龄"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.userEmail" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item class="bt-save">
        <el-button type="primary" @click="onSubmit">保存信息</el-button>
      </el-form-item>
    </el-form>
    </div>
    <div class="info_right">
      <div class="title">更改密码</div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" maxlength="30"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">更改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    


  </div>
</template>


<script>
  import {updateUser, updateUserPass} from '../../network/user'
  export default {
    data() {
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
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return {
        formInline: {
          user: '',
          region: ''
        },
        ruleForm: {
          oldPass: '',
          pass: '',
          checkPass: '',
        },
        user: {
          id: '',
          userId: '',
          userName: '',
          userAge: '',
          userPassword: '',
          userEmail: '',
          userSex: '',
          userPhone: '',
          userCategory: ''
        },
        rules: {
          oldPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        updateUser(this.user).then(res => {
          if (res) {
            this.$message({
              message: '修改成功',
              type: 'success',
              center: true
            })
            Object.assign(this.$user, this.user)
            sessionStorage.setItem('user', JSON.stringify(this.user))
          } else {
            this.$message({
              message: '修改失败',
              type: 'error',
              center: true
            })
          }
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
        if (valid) {
          this.user.userPassword = this.ruleForm.pass
          // updateUserPass(this.user).then(res => {
          updateUserPass(this.user.userId, this.ruleForm.oldPass, this.ruleForm.pass).then(res => {
            if (res) {
              this.$message({
                message: '修改密码成功',
                type: 'success',
                center: true
              })
              this.ruleForm.oldPass = ''
              this.ruleForm.pass = ''
              this.ruleForm.checkPass = ''
              sessionStorage.setItem('user', JSON.stringify(this.user))
            } else {
              this.$message({
                message: '修改密码失败',
                type: 'error',
                center: true
              })
            }
          })
        } else {
          this.$message({
            message: '密码格式错误',
            type: 'error',
            center: true
          })
          return false;
        }
        })
      }
    },
    created () {
      // let user = JSON.parse(sessionStorage.getItem('user'))
      // this.user = user
      Object.assign(this.user, this.$user)
    }
  }
</script>

<style scoped>
 .title{
   font-size: 20px;
   font-weight: bold;
   padding: 10px 10px 10px;
 }
 #infoForm, .demo-ruleForm {
   width: 100%;
   padding: 10px;
    margin: 0px auto;
    text-align: left;
 }
 .demo-ruleForm {
   text-align: center;
   padding-bottom: 0px;
 }
 .bt-save{
  margin-left: 50%;
  transform: translate(-50%);
 }
 .info_left,.info_right {
   width: 40%;
   float: left;
   padding: 5%;
   padding-bottom: 0%;
 }
 .info_right {
   /*border-left: 1px dashed #dadada;*/
 }
</style>