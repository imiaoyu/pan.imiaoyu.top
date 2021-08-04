<template>
  <div class="footer">
    <a style="font-size: 16px">提供中转服务 不储存文件 数据定时删除</a> <br><br>
    <a style="font-size: 14px"><a href="mailto:1647204078@qq.com">邮箱   </a><a href="http://beian.miit.gov.cn/">蜀ICP备19028135号-1</a> </a>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      date: new Date().getFullYear()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  height: 50px;
  text-align: center;
  font-size: 18px;
}
</style>
