<template>
  <div class="body">
    版本：0.3.0<p></p><br>
    状态：测试中<p></p><br>
    此项目长期运行<p></p><br>
    <b>说明:</b><p></p><br>
    上传类型不限<p></p><br>
    上传速度不限<p></p><br>
    下载速度不限<p></p><br>
    单个文件上传限制3G<p></p><br>
    <el-button type="mini" @click="dialogFormVisible = true">反馈</el-button><p></p><br>
<!--    <b>提示：</b><p></p><br>-->
<!--    请勿上传重要文件-->
    <el-dialog title="反馈"
               :visible.sync="dialogFormVisible"
               width="350px">
      <el-form :model="form">
          <el-input v-model="form.content"
                    autocomplete="off"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入要反馈的内容"></el-input>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary" @click="feedback">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogFormVisible: false,
      form: {
        content: ''
      }
    }
  },
  methods: {
    feedback () {
      // alert(this.form.content)
      this.$http
        .post(`/api/feedback`, {
          uid: sessionStorage.getItem('uid'),
          content: this.form.content
        })
        .then(res => {
          this.$message.success('已收到您的反馈')
        })
        .catch(err => {
          this.$message.error('提交失败')
          console.log('Error=>', err)
        })
    }
  }
}
</script>
<style scoped>
.body {
  text-align: center;
  font-size: 16px;
  left: -20px;
  width: 270px;
  margin: 10px auto;

  color: #606266;
  font-size: 16px;
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
</style>
