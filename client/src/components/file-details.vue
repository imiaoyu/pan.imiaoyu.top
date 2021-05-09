<template>
  <div>
    <base-header></base-header>
    <div class="body">
      <div class="head">
        <span>{{this.data.file_name}}</span>
        <el-divider></el-divider>
        <span>大小：{{Math.round(this.data.size/1024/1024*100)/100 +'MB'}}</span><br>
        <span>上传日期：{{this.data.upload_time}}</span><br>
        <span>下载量：{{this.data.download}}</span><br>
        <span>格式：{{this.data.type}}</span><br><br>
      </div>
      <el-row>
        <a :href="see(data)"><el-button size="small">查看</el-button></a>
        <el-button size="small" @click="collection">收藏</el-button>
        <a><el-button @click="getFile(data)" size="small">下载</el-button></a>
        <el-button size="small"  @click="share()" >分享</el-button>
      </el-row>
    </div>
    <base-footer></base-footer>
  </div>
</template>

<script>
import BaseHeader from '../layout/header'
import BaseFooter from '../layout/footer'
export default {
  name: 'file-details',
  components: {
    BaseHeader,
    BaseFooter,
    FileList
  },
  data () {
    return {
      data: []
    }
  },
  methods: {
    // handleDownload () {
    //   setTimeout(() => {
    //     this.refreshFileList()
    //   }, 1000)
    // },
    getFile (data) {
      let url = `http://pan-qiniu.imiaoyu.top/${data.file_name}?attname=${data.file_name}`
      window.open(url)
      this.download()
      return url
    },
    share () {
      alert(window.location.href)
    },
    collection () {
      alert('开发中....')
    },
    see (data) {
      // alert('开发中....')
      let url = `http://pan-qiniu.imiaoyu.top/${data.file_name}`
      return url
    },
    download () {
      this.$http
        .get(`/api/download`, {
          params: {
            hash_name: this.data.hash_name
          }
        })
        .then(res => {
          // this.$message.success(res.data.message)
        })
        .catch(err => {
          console.log('Error=>', err)
        })
    }
  },
  mounted () {
    // alert(this.$route.params.hash_name)
    // eslint-disable-next-line camelcase
    const hash_name = this.$route.params
    // console.log(hash_name)
    this.$http
      .get('/api/single-list', {
        // eslint-disable-next-line no-undef
        params: hash_name
      })
      .then(res => {
        // eslint-disable-next-line eqeqeq
        if (res.data.flag == 0) {
          this.$message.error('500错误 稍后重试')
        } else {
          this.data = res.data.data.results[0]
          // console.log(res.data.data.results)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

}
</script>

<style scoped>
.head{
  margin-top: 50px;
  font-size: 18px;
}
.body{
  min-height: 400px;
  padding: 20px 20px;
}
</style>
