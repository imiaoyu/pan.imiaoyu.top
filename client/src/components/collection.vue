<template>
  <div class="body">
    <ul>
      <li v-for="(item,index) in list"
          :key="index"
        :class="{move:candelete.id==item.id}"
        @touchstart="touchStart(item)"
        @touchend="touchEnd(item)"
        @dblclick="deleteItem(index,item)">
        <i class="el-icon-star-on" style="color:#f6f20f;font-size: 18px;"></i>
        <a @click="open(item)">{{item.file_name}}</a><a v-if="item.skey">---密码：{{item.skey}}</a>
        <div class="del" @click="deleteItem(index,item)">删除</div>
      </li>
    </ul>
    <div class="err" v-if="flag == 1 && list == ''">
      <i class="el-icon-folder-opened" style="font-size: 30px"></i>
      <a style="font-size: 20px">空</a>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 数据
      list: [],
      flag: 0,
      clientNum: {}, // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
      candelete: {} // 滑动的item
    }
  },
  methods: {
    /**
     * 删除item
     * index是下标
     */
    deleteItem (index, item) {
      this.list.splice(index, 1)
      console.log(item)
      this.$http
        .delete(`/api/collection_delete/${item.hash_name}/${item.id}`)
        .then(res => {
          this.$message.success(res.data.message)
          this.refreshFileList()
        })
        .catch(err => {
          console.log('Error=>', err)
        })
      // splice方法是删除数组某条数据，或者向某个位置添加数据
    },
    touchStart (item) {
      let touchs = event.changedTouches[0]
      // 记录开始滑动的鼠标位置
      this.clientNum.x1 = touchs.pageX
      this.candelete = {}
    },
    touchEnd (item) {
      let touchs = event.changedTouches[0]
      // 记录结束滑动的鼠标位置
      this.clientNum.x2 = touchs.pageX
      this.candelete = {}
      // 判断滑动距离大于50，判定为滑动成功，否则失败
      if (
        this.clientNum.x2 < this.clientNum.x1 &&
        Math.abs(this.clientNum.x1) - Math.abs(this.clientNum.x2) > 50
      ) {
        event.preventDefault()
        this.candelete = item
      } else if (
        this.clientNum.x2 > this.clientNum.x1 &&
        Math.abs(this.clientNum.x2) - Math.abs(this.clientNum.x1) > 10
      ) {
        event.preventDefault()
        this.candelete = {}
      }
    },
    listitem () {
      this.$http
        .get(`/api/collection_list`, {
          params: {
            uid: sessionStorage.getItem('uid')
          }
        })
        .then(res => {
          this.list = res.data.results
          this.flag = 1
          // console.log(res.data.results)
        })
        .catch(err => {
          console.log('Error=>', err)
        })
    },
    open (item) {
      // let url = `http://pan-qiniu.imiaoyu.top/#/sid=${item.sid}`
      // return url
      // this.$router.push(`/sid/${item.sid}`)

      let routeUrl = this.$router.resolve({
        path: `/sid/${item.sid}`
      })
      window.open(routeUrl.href, '_blank')
    }
  },
  mounted () {
    this.listitem()
  }
}
</script>
<style scoped>
.change-password {
  left: -20px;
  width: 270px;
  margin: 10px auto;
}
.body{
  text-align: center;
  /*align-content: center;*/
  /*align-items: center;*/
}
li{
  background: #fff;
  border-bottom: 1px solid #EAE7E7;
  line-height: 50px;
  position: relative;
  transform: translateX(0);
  transition: all .3s; /*滑动效果更生动*/
  padding-left: 10px;
  /*width: 70%;*/
  text-align: center;
  align-content: center;
  align-items: center;
}
ul{
  color: #606266;
  font-size: 13px;
  overflow-x: hidden; /*隐藏ul x轴的滚动条*/
}
li.move {
  transform: translateX(-60px); /*滑动后x轴位移-60px,使其可见*/
}
.del {
  position: absolute;
  top: 0;
  right: -1px;
  z-index: 3;
  width: 60px;
  height: 100%;
  text-align: center;
  color: #fff;
  background-color: #ff5b45;
  transform: translateX(60px); /*默认x轴位移60px，使其隐藏*/
}
.err{
  padding-top: 9rem;
  font-size: 18px;
  color: #888888;
}
</style>
