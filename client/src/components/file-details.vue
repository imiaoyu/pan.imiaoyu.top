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
        <a :href="see(data)"><el-button size="small">预览</el-button></a>
        <el-button size="small" @click="collection">收藏</el-button>
        <a><el-button @click="getFile(data)" size="small">下载</el-button></a>
        <el-button size="small"  @click="dialogFormVisible = true">分享</el-button>
      </el-row>
    </div>
    <el-dialog title="分享"
               :visible.sync="dialogFormVisible"
               width="350px">
      <el-form :model="form">
        <el-form-item label="密码"
                      :label-width="formLabelWidth">
          <el-input v-model="form.skey"
                    maxlength="4"
                    autocomplete="off"
                    type="text"></el-input>
        </el-form-item>
        <a>不输入则无密码分享</a>
      </el-form>
      <div slot="footer"
           class="dialog-footer"
      style="text-align: center">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="share()"
                   >分 享</el-button>
      </div>
    </el-dialog>
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
      dialogFormVisible: false,
      formLabelWidth: '4rem',
      data: [],
      form: {
        skey: ''
      },
      sid: '',
      username: sessionStorage.getItem('username')
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
    // 分享
    share () {
      // eslint-disable-next-line eqeqeq
      if (!this.form.skey) {
        this.upload_share()
        // alert('no')
      } else {
        if (this.form.skey.length === 4) {
          this.upload_share()
        } else {
          this.$message.error('请输入4位数密码')
        }
      }

      // alert(window.location.href)
    },
    // 收藏
    collection () {
      // alert('开发中....')
      // eslint-disable-next-line eqeqeq
      if (!sessionStorage.username) {
        this.$message.error('请先登录')
        this.$router.push({ path: '/' })
      } else {
        this.$http
          .post(`/api/collection`, {
            uid: sessionStorage.getItem('uid'),
            url: window.location.href
          })
          .then(res => {
            this.$message.success(res.data.message)
          })
          .catch(err => {
            console.log('Error=>', err)
          })
      }
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
    },
    // 生成分享内容唯一标识
    randomString (length) {
      var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      var result = ''
      for (var i = length; i > 0; --i) { result += str[Math.floor(Math.random() * str.length)] }
      return result
    },
    upload_share () {
      this.sid = this.randomString(6)
      this.$http
        .post(`/api/uploadshare`, {
          uid: sessionStorage.getItem('uid'),
          skey: this.form.skey,
          url: 'http://pan-qiniu.imiaoyu.top/' + this.data.file_name,
          sid: this.sid,
          file_name: this.data.file_name,
          size: this.data.size,
          hash_name: this.data.hash_name
        })
        .then(res => {
          this.$message.success(res.data.message)
          alert('http://pan.imiaoyu.top/#/sid/' + this.sid)
          this.dialogFormVisible = false
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

          // eslint-disable-next-line camelcase
          const upload_time = new Date(this.data.upload_time).toJSON()

          // eslint-disable-next-line no-undef
          // console.log('time:' + this.getCurrentTime())
          // 日期格式统一
          this.data.upload_time = new Date(new Date(upload_time) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
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
