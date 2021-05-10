<template>
  <div>
    <base-header></base-header>
    <div class="body">
      <div class="head">
        <div style="text-align: left">当前账号：</div> <div style="text-align: right">{{ this.username }}</div>
        <el-divider></el-divider>
        <div style="text-align: left">账号等级：</div> <div style="text-align: right">手动满级</div>
        <el-divider></el-divider>
        <div style="text-align: left">下载速度：</div> <div style="text-align: right">无限制</div>
        <el-divider></el-divider>
        <div style="text-align: left">储存容量：</div> <div style="text-align: right">无限制</div>
        <el-divider></el-divider>
        <div style="text-align: left">手机绑定：</div> <div style="text-align: right">待开发</div>
      </div>
    </div>
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
      count: 0,
      username: sessionStorage.getItem('username')
    }
  },
  methods: {
    load () {
      this.count += 2
    }
  },
  mounted () {
  }

}
</script>

<style scoped>
.head{
  color: #888888;
  margin-top: 30px;
  font-size: 14px;
}
.body{
  min-height: 400px;
  padding: 20px 20px;
}
</style>
