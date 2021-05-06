<template>
  <div>
    <el-form :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="5rem"
      class="change-password">
      <el-form-item label="旧密码"
        prop="oldPass">
        <el-input type="password"
          v-model="ruleForm.oldPass"
          autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码"
        prop="newPass">
        <el-input type="password"
          v-model="ruleForm.newPass"
          autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="重复密码"
        prop="checkNewPass">
        <el-input type="password"
          v-model="ruleForm.checkNewPass"
          autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    //  验证原密码
    let validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.oldPass !== '') {
          this.$refs.ruleForm.validateField('newPass')
        }
        callback()
      }
    }
    //  验证新密码
    var validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value === this.ruleForm.oldPass) {
        callback(new Error('新旧密码不能相同!'))
      } else {
        callback()
      }
    }
    //  验证再次输入密码

    var validateCheckNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error('两次输入密码不一致!!'))
      } else {
        callback()
      }
    }

    return {
      ruleForm: {
        oldPass: '',
        newPass: '',
        checkNewPass: ''
      },
      rules: {
        oldPass: [{ validator: validateOldPass, trigger: 'blur' }],
        newPass: [{ validator: validateNewPass, trigger: 'blur' }],
        checkNewPass: [{ validator: validateCheckNewPass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            oldPassword: this.ruleForm.oldPass,
            newPassword: this.ruleForm.newPass,
            uid: sessionStorage.uid
          }
          this.$http
            .put(`/user/update`, params)
            .then(res => {
              // eslint-disable-next-line eqeqeq
              if (res.data.flag == 0) {
                this.$message.error(res.data.message)
              } else {
                this.$message.success('修改密码成功!请重新登录')
                sessionStorage.clear()
                setTimeout(() => {
                  this.$router.push({ path: '/' })
                }, 1000)
              }
            })
            .catch(err => {
              console.log('Error=>', err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.change-password {
  left: -20px;
  width: 270px;
  margin: 10px auto;
}
</style>
