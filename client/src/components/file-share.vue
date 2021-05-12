<template>
  <div>
    <base-header></base-header>
    <div class="body" v-if="data != ''">
      <div class="head">
        <span>{{this.data.file_name}}</span>
        <el-divider></el-divider>
        <span>大小：{{Math.round(this.data.size/1024/1024*100)/100 +'MB'}}</span><br>
      </div>
      <div class="download">
<!--        <a :href="see(data)"><el-button size="medium">预览</el-button></a>-->
<!--        <el-button size="medium" @click="load">下载</el-button>-->
        <svg @click="load" t="1620825376308" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4763" width="60" height="60" ><path d="M511.957333 0c282.752 0 512 229.248 512 512s-229.248 512-512 512-512-229.248-512-512 229.248-512 512-512z m0 256a42.666667 42.666667 0 0 0-42.666666 42.666667v337.92l-144-115.2-4.394667-3.114667a42.666667 42.666667 0 0 0-48.938667 69.717333l213.333334 170.666667a42.666667 42.666667 0 0 0 53.333333 0l213.333333-170.666667 3.968-3.626666a42.666667 42.666667 0 0 0-57.301333-63.018667L554.666667 636.501333V298.666667a42.666667 42.666667 0 0 0-37.674667-42.368z" fill="#2499b2" p-id="4764" data-spm-anchor-id="a313x.7781069.0.i0" class=""></path></svg>
      </div>
    </div>
    <div class="err" v-if="data == ''">
      <i class="el-icon-share"></i>
      该分享已被取消
    </div>
    <el-dialog title="输入分享密码"
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
      </el-form>
      <div slot="footer"
           class="dialog-footer"
           style="text-align: center">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="extract()"
        >确 认</el-button>
      </div>
    </el-dialog>
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
      count: 0,
      username: sessionStorage.getItem('username')
    }
  },
  methods: {
    see (data) {
      // alert('开发中....')
      let url = `http://pan-qiniu.imiaoyu.top/${data.file_name}`
      return url
    },
    load () {
      // eslint-disable-next-line eqeqeq
      if (this.data.skey == '') {
        this.getFile()
      } else {
        this.dialogFormVisible = true
      }
    },
    preview () {
      alert('暂时不可用')
    },
    extract () {
      // eslint-disable-next-line eqeqeq
      if (this.data.skey == this.form.skey) {
        this.getFile()
        this.dialogFormVisible = false
      } else {
        this.$message.error('密码错误')
      }
    },
    getFile () {
      let url = `http://pan-qiniu.imiaoyu.top/${this.data.file_name}?attname=${this.data.file_name}`
      window.open(url)
      this.download()
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
    const sid = this.$route.params
    // console.log(hash_name)
    this.$http
      .get('/api/share-list', {
        // eslint-disable-next-line no-undef
        params: sid
      })
      .then(res => {
        // eslint-disable-next-line eqeqeq
        if (res.data.flag == 0) {
          this.$message.error('500错误 稍后重试')
        } else {
          this.data = res.data.data.results[0]
          // console.log(this.data)
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
  color: #888888;
  margin-top: 30px;
  font-size: 16px;
}
.body{
  min-height: 400px;
  padding: 20px 20px;
}
.download{
  text-align: center;
  padding-top: 10rem;
}
.err{
  padding-top: 13rem;
  font-size: 18px;
  color: #888888;
}
</style>
