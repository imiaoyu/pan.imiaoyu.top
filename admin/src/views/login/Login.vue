<template>
  <!-- 登录页面 -->
  <div id="login">
    <div id="form_space">
      <div align="center" style="margin-top:10px">
        <h2>{{ login_title }}</h2>
        <p>{{ login_adress }}</p>
      </div>
      <div style="padding: 20px">
        <el-form ref="form" :model="login_form">
          <el-form-item>
            <el-input v-model="login_form.user_name" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="login_form.user_password" prefix-icon="el-icon-lock" show-password></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item align="center">
            <el-button type="primary" icon="el-icon-right" @click="login()" style="width:100%">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-link type="danger" style="float: left" @click="to('/register')">注册</el-link>
            <el-link type="primary" style="float: right" @click="to('/forget/password')">找回密码？</el-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      login_title: "登录",
      login_adress: "基于Element的开源后台管理框架",
      aslide_menu: require("@/assets/eui_menu.json"),//引用菜单json数据，可以按照这个路径修改
      login_form: {
        user_name: "EuiAdmin",
        user_password: "12453"
      },
      remember_password: false
    };
  },
  methods: {
    login() {
      this.$message.success("登录成功，即将为您跳转"); //登录提示
      setTimeout(() => {
        localStorage.setItem("user_name", this.login_form.user_name);
        localStorage.setItem("aslide_menu", JSON.stringify(this.aslide_menu)); //用localStorage储存左侧菜单
        this.$router.push("/home"); //成功后跳转到主页设置菜单，你也可以通过请求得到的数据生成菜单实现鉴权
      }, 1500);
    },
    to(link) {
      this.$router.push(link);
    }
  }
};
</script>
<style scoped>
#form_space {
  border-radius: 10px;
  background-color: white;
  color: rgb(121, 121, 121);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 400px;
  width: 400px;
}
</style>