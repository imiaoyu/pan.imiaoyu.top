<template>
  <div>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      :cell-style="{'text-align':'center'}"
      :header-cell-style="{'text-align':'center'}"
      style="width: 100%">
<!--      <el-table-column type="index"-->
<!--      >-->
<!--      </el-table-column>-->
      <el-table-column prop="file_name"
        label="文件名"
        width="120px">
      </el-table-column>
      <el-table-column prop="size"
        label="文件大小"
        width="100px"
        :formatter="dealSize">
      </el-table-column>
      <el-table-column prop="upload_time"
                       v-if="show"
        label="上传时间"
        width="180px"
        :formatter="dealTime">
      </el-table-column>
      <el-table-column prop="download"
                       v-if="show"
        label="下载次数"
        width="180px">
      </el-table-column>
      <el-table-column prop="type"
                       v-if="show"
        label="类型"
        width="180px">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a :href="getFile(scope.row)">
<!--            <el-button size="mini"-->
<!--              type="primary"-->
<!--              @click="handleDownload">下载</el-button>-->
          </a>
          <el-button size="mini"
                     type="primary"
                     @click="share(scope.row)"
          >详情</el-button>
          <a>
          <el-button size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button></a>
        </template>
      </el-table-column>
    </el-table>
<!--    分页数据-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableData.length">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1, // 初始页
      pagesize: 5, //    每页的数据
      tableData: [],
      show: '',
      screenWidth: ''
    }
  },
  methods: {
    // 删除数据
    handleDelete (index, row) {
      this.$http
        .delete(`/api/articless/${row.hash_name}/${row.id}`)
        .then(res => {
          this.$message.success(res.data.message)
          this.refreshFileList()
        })
        .catch(err => {
          console.log('Error=>', err)
        })
    },
    // 下载数据
    handleDownload () {
      setTimeout(() => {
        this.refreshFileList()
      }, 1000)
    },
    refreshFileList () {
      this.getFileList()
    },
    // 获取数据
    getFileList () {
      // let params = {
      //   uid: sessionStorage.getItem('uid')
      // }
      // let params = 1
      this.$http
        .get('/api/list', {
          params: {
            uid: sessionStorage.getItem('uid')
          }
        })
        .then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.data.code == 0) {
            this.$message.error('500错误 稍后再试')
          } else {
            this.tableData = res.data.data.results
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    share (row) {
      // eslint-disable-next-line no-undef
      // alert(row)
      this.$router.push({
        path: '/file-details/' + row.hash_name
      })
    },
    getFile (data) {
      let url = `http://pan-qiniu.imiaoyu.top/${data.file_name}?attname=${data.file_name}`
      return url
    },
    dealSize (row, column) {
      let fileSize = (row.size / 1024 / 1024).toFixed(2)
      return `${fileSize}MB`
    },
    dealTime (row, column) {
      return this.formatTime(row.upload_time)
    },
    // 计算日期
    formatTime (value) {
      var date = new Date(value)
      var Y = date.getFullYear()
      var M =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      var D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      var h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      var m =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      var s =
        date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
      return `${Y}-${M}-${D} ${h}:${m}:${s}`
    },

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    }
  },
  mounted () {
    // 挂载window.onresize方法
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = window.innerWidth
        that.screenWidth = window.screenWidth
      })()

      // eslint-disable-next-line no-unreachable
      if (this.screenWidth < 1200) {
        this.show = false
        // eslint-disable-next-line eqeqeq
      } else if (this.screenWidth == 1920) {
        this.show = true
      } else {
        this.show = true
      }
    }

    this.getFileList()
  }
  // watch: {
  //   screenWidth (val) {
  //     this.screenWidth = val
  //     console.log(this.screenWidth)
  //     if (this.screenWidth < 1200) {
  //       this.show = false
  //       this.Width = 180 - 60
  //       // eslint-disable-next-line eqeqeq
  //     } else if (this.screenWidth == 1920) {
  //       this.show = true
  //     } else {
  //       this.show = true
  //     }
  //   }
  // }
}
</script>
