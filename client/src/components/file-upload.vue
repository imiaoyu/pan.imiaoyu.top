<template>
<!--  <el-upload drag-->
<!--    multiple-->
<!--    action="http://localhost:8081/file/add"-->
<!--    :data="userInfo"-->
<!--    :on-success="dealSuccess"-->
<!--    :on-error="dealError">-->
<!--    <i class="el-icon-upload"></i>-->
<!--    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
<!--  </el-upload>-->
  <div class="editor-after-div">
  <el-upload
    drag
    multiple
    :action="upload_qiniu_url"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :on-error="handleError"
    :before-upload="beforeAvatarUpload"
    :on-progress="uploadVideoProcess"
    :data="qiniuData">
    <div v-if="videoFlag == ''" class="el-default">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </div>
    <div class="el-upload__tip" slot="tip">所有文件格式都支持，且不超过4G</div>
    <el-progress  v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
  </el-upload>
  </div>
</template>
<script>
import SparkMD5 from 'spark-md5'
export default {
  data () {
    return {
      userInfo: {
        uid: sessionStorage.getItem('uid')
      },
      qiniuData: {
        key: '',
        token: ''
      },
      videoFlag: '',
      videoUploadPercent: '',
      // 七牛云上传储存区域的上传域名（华东、华北、华南、北美、东南亚）
      upload_qiniu_url: 'http://upload.qiniup.com',
      // 七牛云返回储存图片的子域名
      upload_qiniu_addr: 'http://pan-qiniu.imiaoyu.top/',
      // imageUrl: '',
      Global: {
        dataUrl: 'http://localhost:3000/api/uploadToken'
      },
      pan: {
        url: '',
        type: '',
        file_name: '',
        hash_name: '',
        size: ''
      }
    }
  },
  mounted () {
    this.getQiniuToken()
  },
  methods: {
    getQiniuToken () {
      this.$http
        .get('/api/uploadToken', {
          params: {
            uid: sessionStorage.getItem('uid')
          }
        }).then(res => {
          console.log(res)
          this.qiniuData.token = res.data.token
        }).catch(err => { // 登录失败
          console.log('ok', err)
        })
    },

    beforeAvatarUpload: function (file) {
      // this.qiniuData.key = file.name
      // const isJPG = file.type === 'image/jpeg'
      // const isPNG = file.type === 'image/png'
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isJPG && !isPNG) {
      //   this.$message.error('图片只能是 JPG/PNG 格式!')
      //   return false
      // }
      // if (!isLt2M) {
      //   this.$message.error('图片大小不能超过 2MB!')
      //   return false
      // }

      this.qiniuData.key = file.name
      this.pan.file_name = file.name
      this.pan.size = file.size
      const isLt10M = file.size / 1024 / 1024 < 4100
      // eslint-disable-next-line eqeqeq
      // if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) == -1) {
      //   this.$message.error('请上传正确的视频格式')
      //   return false
      // }

      // 获取文件格式
      let fileArr = file.name.split('.') // 切割字符串
      let suffix = fileArr[fileArr.length - 1] // 得到格式
      // console.log('文件格式：' + suffix)
      this.pan.type = suffix

      if (!isLt10M) {
        this.$message.error('上传视频大小不能超过7G哦!')
        return false
      }
    },
    // 显示视频上传进度
    uploadVideoProcess (event, file, fileList) {
      console.log(event.percent, file, fileList)
      this.videoFlag = true
      // this.videoUploadPercent = file.percentage.toFixed(0)
      // this.videoUploadPercent = event.percent.toFixed(0)
      this.videoUploadPercent = Math.floor(event.percent)
    },
    handleAvatarSuccess: function (res, file) {
      this.pan.url = this.upload_qiniu_addr + res.key
      // // this.article.cover.images[0].images = this.article.imageUrl + '?vframe/jpg/offset/0'
      // this.article.imageUrl = this.article.vedio_url + '?vframe/jpg/offset/10/w/380/h/180'
      // console.log(this.article.imageUrl)
      //     this.error('视频上传成功')
      this.pan.hash_name = SparkMD5.hash(file.name)
      // 上传信息到后台
      this.$http
        .post('/api/newarticle', {
          uid: sessionStorage.getItem('uid'),
          url: this.pan.url,
          file_name: this.pan.file_name,
          hash_name: this.pan.hash_name,
          type: this.pan.type,
          size: this.pan.size

        })
        .then(res => {
          // this.$message.error(res.data.message)
        })
        .catch(err => {
          console.log(err)
        })
      this.$notify.success('视频上传成功')
      this.videoFlag = ''
    },
    handleError: function (res) {
      this.$message({
        message: '上传失败',
        duration: 2000,
        type: 'warning'
      })
    }
    // dealSuccess () {
    //   this.$message.success('上传文件成功!')
    // },
    // dealError () {
    //   this.$message.error('上传文件失败,请重新上传!')
    // }
  }
}

</script>
<style scoped>
.el-form-item /deep/ .el-upload--picture-card {

  width: 254px;

  height: 100px;

}

.el-form-item /deep/ .el-upload {

  width: 254px;

  height: 100px;

  line-height: 100px;

}

.el-form-item /deep/ .avatar {

  width: 254px;

  height: 100px;

  display: block;

}
.editor-after-div{
  padding-right: 0px;
}
</style>
