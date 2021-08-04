<template>
  <div class="index">
    <div class="title">
      在线网盘系统
    </div>
    <div class="label">
      Cloud Driver
    </div>
    <div class="btn">
      <el-button type="primary"
        @click="dialogFormVisible = true">登录/注册</el-button>
    </div>
    <div class="loading">
      等待奇迹发生<br>
    </div>
    <el-dialog title="登录/注册"
      :visible.sync="dialogFormVisible"
      width="350px">
      <el-form :model="form">
        <el-form-item label="用户名"
          :label-width="formLabelWidth">
          <el-input v-model="form.username"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
          :label-width="formLabelWidth">
          <el-input v-model="form.password"
            autocomplete="off"
            type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="signUp">注 册</el-button>
        <el-button type="primary"
          @click="signIn">登 录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import md5 from 'crypto-js/md5'
export default {
  name: 'index',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        username: '',
        password: ''
      },
      formLabelWidth: '4rem',
      flag: true

    }
  },
  mounted () {
  },
  methods: {
    // 登录
    signIn () {
      this.dialogFormVisible = false
      this.form.password = md5(this.form.password).toString()
      this.$http
        .post('/user/login', this.form)
        .then(res => {
          if (res.data.flag === 0) {
            this.$message.error(res.data.message)
          } else {
            this.$message.success(res.data.message)
            sessionStorage.setItem('uid', res.data.data.uid)
            sessionStorage.setItem('username', res.data.data.username)
            //  跳转到其他页面
            if (!this.$route.query.flag) {
              this.$router.push('tab-list')
            } else {
              this.$router.go(-2)
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //  注册
    signUp () {
      this.dialogFormVisible = false
      // 调用检测用户是否存在方法
      this.signuser()
      this.form.password = md5(this.form.password).toString()
      // console.log('md5:' + this.form.password)
      // eslint-disable-next-line eqeqeq
      if (this.form.username == '' || this.form.password == '') {
        this.$message.error('用户或密码为空')
        // eslint-disable-next-line eqeqeq
      } else if (this.flag == true) {
        this.$http
          .post('/user/add', this.form)
          .then(res => {
            // eslint-disable-next-line eqeqeq
            if (res.data.flag == 0) {
              this.$message.error(res.data.message)
            } else {
              this.$message.success(res.data.message)
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$message.error('该用户已存在')
      }
    },
    // 判断用户是否存在
    signuser () {
      this.$http
        .post('/user/signuser', this.form)
        .then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.data.flag == 0) {
            // this.$message.error(res.data.message)
            this.flag = false
            // alert('已经被注册了')
          } else {
            // this.$message.success(res.data.message)
            this.flag = true
            // alert('可以注册')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  margin-top: 80px;
  text-align: center;
}
.title {
  font-size: 40px;
}
.loading {
  margin-top: 50%;
  font-size: 25px;
}
.label {
  font-size: 35px;
  margin-top: 10px;
}
.btn {
  margin-top: 10px;
}
.dialog-footer {
  text-align: center;
}

/*@media screen and (max-width: 480px) {*/
/*  .el-dialog__wrapper .el-dialog {*/
/*    width: 95% !important;*/
/*  }*/
/*  .el-dialog__wrapper .el-dialog .el-dialog__body {*/
/*    overflow: auto*/
/*  }*/
/*}*/
@media screen and (max-width: 300px) {
  .el-dialog {width: 200px}
}
</style>
