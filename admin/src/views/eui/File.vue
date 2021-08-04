<template>
  <el-row :gutter="15">
    <el-col :xs="24" :md="8">
        <File/>
    </el-col>
    <el-col :xs="24" :md="8">
        <ElementFile/>
    </el-col>
    <el-col :xs="24" :md="8">
        <AxiosFile/>
    </el-col>
  </el-row>
</template>
<script>
export default {
  components: {
    File: resolve => {
      require(["@/views/eui/file/File"], resolve);
    },
    ElementFile: resolve => {
      require(["@/views/eui/file/ElementFile"], resolve);
    },
    AxiosFile: resolve => {
      require(["@/views/eui/file/AxiosFile"], resolve);
    }
  }
};
</script>