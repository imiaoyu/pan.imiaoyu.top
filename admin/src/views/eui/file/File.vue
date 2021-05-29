<template>
  <el-card shadow="never" style="min-height: 10vh">
    <div slot="header" class="clearfix">
      <span @click="show()">Faxios文件上传</span>
    </div>
    <div v-loading="loading.status" :element-loading-text="loading.title" style="height:185px">
      <el-upload
        class="upload-demo"
        ref="upload"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        :on-change="change_file"
      >
        <el-button slot="trigger" size="small" type="danger"
          >选取文件</el-button
        >
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>
    <!-- {{ upload_rate }} -->
  </el-card>
</template>
<script>
import Faxios from "@/eui/unit/file_axios/Faxios"
export default {
  data() {
    return {
      // upload_rate: 0,
      loading: {
        status: false,
        title: ""
      }
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    change_file(file) {
      Faxios.upload('image',file.raw).then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
};
</script>
<style scoped>
#back_image {
  background-size: cover;
}
</style>