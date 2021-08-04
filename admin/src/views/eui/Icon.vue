<template>
  <div>
    <el-card shadow="never" style="min-height: 10vh">
      <div slot="header" class="clearfix">
        <span>图标选择器</span>
      </div>
      <div>
        <vEicon v-model="icon" />
        <p>选择内容{{ icon }}</p>
        <p>
          你选择的图标：
          <i :class="icon"></i>
        </p>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      icon: "",
    };
  },
};
</script>