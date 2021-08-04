<template>
  <el-card shadow="never" style="min-height: 10vh">
    <div slot="header" class="clearfix">
      <span>城市（省、地、县）三级选择</span>
    </div>
    <div>
      <vCityChoose v-model="city_data" />
      {{ city_data }}
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      city_data: []
    };
  },
  methods: {},
  mounted() {}
};
</script>