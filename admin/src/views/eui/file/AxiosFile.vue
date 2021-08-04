<template>
  <el-card shadow="never" style="min-height: 10vh">
    <div slot="header" class="clearfix">
      <span @click="show()">文件上传（支持进度读取）</span>
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
        <el-button slot="trigger" size="small" type="primary"
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
import axios from "axios";
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
    change_file(file, fileList) {
      let file_data = file.raw;
      let from_data = new FormData();
      from_data.append("image", file_data);
      let config = {
        onUploadProgress: progressEvent => {
          console.log(progressEvent);
          let complete =
            (progressEvent.loaded / progressEvent.total).toFixed(2) * 100;
          this.loading = {
            status: true,
            title: "正在上传：" + complete + "%"
          };
          // this.upload_rate = complete;
        },
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post("http://localhost/file/upload", from_data, config)
        .then(res => {
          console.log(res);
          this.loading.status = false;
        })
        .catch(err => {
          console.log(err);
        });
      console.log(file);
      console.log(fileList);
    }
  }
};
</script>
<style scoped>
#back_image {
  background-size: cover;
}
</style>