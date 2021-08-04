<template>
  <el-card shadow="never" style="min-height: 10vh">
    <div slot="header" class="clearfix">
      <span @click="show()">原组件上传</span>
    </div>
    <div>
      <el-upload
        class="upload-demo"
        name="image"
        drag
        action="http://localhost/file/upload"
        multiple
        :on-success="file_upload_success"
        :on-error="file_upload_error"
      >
        <div :style="{backgroundImage:'url('+web_imgae_link+')'}" id="back_image">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </div>
      </el-upload>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      web_imgae_link:'http://localhost/static/uploads/image/'
    };
  },
  methods: {
    file_upload_success(response, file, fileList) {
      this.web_imgae_link='http://localhost/static/uploads/image/'
      this.web_imgae_link=this.web_imgae_link+response
      console.log(response);
      console.log(file);
      console.log(fileList);
    },
    file_upload_error(err, file, fileList) {
      console.log(err);
      console.log(file);
      console.log(fileList);
    }
  },
  mounted() {}
};
</script>
<style scoped>
#back_image{
  background-size: cover;
}
</style>