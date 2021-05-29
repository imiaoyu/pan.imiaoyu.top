<template>
  <div>
    <el-card shadow="never">
      <div slot="header">
        <span style="flaot: right">{{
          $route.query.user_role_name != undefined
            ? $route.query.user_role_name + "权限管理"
            : "Eui权限管理"
        }}</span>
      </div>
      <el-tabs
        v-model="menu_label"
        style="height: 60vh; overflow-x: hidden; overflow-y: auto"
      >
        <el-tab-pane label="显示管理" name="show">
          <div style="height: 50vh; overflow-x: hidden; overflow-y: auto">
            <div v-for="(menu, index) in menu_data" :key="index">
              <el-checkbox
                v-model="menu.show"
                :true-label="1"
                :false-label="0"
                >{{ menu.label }}</el-checkbox
              >
              <br />
              <div style="margin-left: 20px">
                <el-checkbox
                  v-for="(children, i) in menu.children"
                  :key="i"
                  v-model="children.show"
                  :true-label="1"
                  :false-label="0"
                  >{{ children.label }}</el-checkbox
                >
              </div>
              <el-divider />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="访问管理" name="vist">
          <div style="height: 50vh; overflow-x: hidden; overflow-y: auto">
            <div v-for="(menu, index) in menu_data" :key="index">
              <span><i :class="menu.icon" />{{ menu.label }}</span>
              <br />
              <div style="margin-left: 20px">
                <el-checkbox
                  v-for="(children, i) in menu.children"
                  :key="i"
                  v-model="children.vist"
                  :true-label="1"
                  :false-label="0"
                  >{{ children.label }}</el-checkbox
                >
              </div>
              <el-divider />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-button
        type="success"
        size="small"
        @click="save_menu_vist()"
        align="right"
        >保存权限设置</el-button
      >
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu_label: "show",
      menu_data: JSON.parse(localStorage.getItem("aslide_menu"))
    };
  },
  methods: {
    save_menu_show() {
      localStorage.setItem("aslide_menu", JSON.stringify(this.menu_data));
      this.$router.go(0);
    },
    save_menu_vist() {
      localStorage.setItem("aslide_menu", JSON.stringify(this.menu_data));
      this.$router.go(0);
    }
  }
};
</script>