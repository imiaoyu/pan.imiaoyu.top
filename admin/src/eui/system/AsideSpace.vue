<template>
  <!-- 左侧菜单 -->
  <el-aside :width="aside_data.width + 'px'" style="overflow: hidden">
    <div id="slide_logo" align="center">
      <p style="padding-top: 20px">
        {{ aside_data.logo }}
      </p>
    </div>
    <el-menu
      id="slide_menu"
      @select="change_aside_menu"
      :default-active="activie_index"
      :default-openeds="0"
      :unique-opened="true"
      :collapse="menu_state"
    >
      <el-submenu
        v-for="(menu, index) in menu_data"
        :key="index"
        :index="index"
        v-show="menu.show"
      >
        <template slot="title">
          <i :class="menu.icon"></i>
          <span style="margin-left: 10px">{{ menu.label }}</span>
        </template>
        <el-menu-item
          v-for="(children, i) in menu_data[index].children"
          :key="i"
          :index="children.path"
          v-show="children.show"
        >
          <i :class="children.icon" v-show="children.path == activie_index" />
          <i
            :class="children.icon"
            v-show="children.path != activie_index"
          /><span style="margin-left: 10px">{{
            children.label
          }}</span></el-menu-item
        >
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  props: ["menu_state"],
  data() {
    return {
      menu_data: JSON.parse(localStorage.getItem("aslide_menu")), //左侧菜单数据
      activie_index: "/home", //默认活动菜单
      aside_data: {
        width: 200,
        logo: "Eui",
      },
      width: "",
    };
  },
  methods: {
    change_aside_menu(index) {
      //点击左侧菜单时活动菜单切换和跳转
      this.activie_index = index;
      this.$router.push(this.activie_index);
    },
    response() {
      if (
        navigator.userAgent.match(
          /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
        )
      ) {
        //手机时
        this.aside_data.width = 0;
        this.aside_data.logo = "";
        this.menu_state = false;
      } else {
        //电脑时
        if (this.width < 768) {
          this.menu_state = true;
          this.aside_data.width = 65;
          this.aside_data.logo = "Eui";
        } else {
          this.menu_state = false;
          this.aside_data.width = 200;
          this.aside_data.logo = "EuiAdmin管理系统";
        }
      }
    },
  },
  mounted() {
    this.response();
    this.width = document.body.clientWidth;
    window.onresize = () => {
      this.width = document.body.clientWidth;
      this.response();
    };
  },
  watch: {
    menu_state() {
      //菜单放大缩小时的宽度和logo切换
      if (this.menu_state) {
        //缩小时状态
        if (
          navigator.userAgent.match(
            /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
          )
        ) {
          this.aside_data.width = 0;
          this.aside_data.logo = "";
        } else {
          this.aside_data.width = 65;
          this.aside_data.logo = "Eui";
        }
      } else {
        //展开状态
        this.aside_data.width = 200;
        this.aside_data.logo = "EuiAdmin管理系统";
      }
    },
  },
};
</script>
<style scoped>

</style>