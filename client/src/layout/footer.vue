<template>
  <div class="footer">
    <a>只提供中转服务 不储存文件 数据定时删除</a> <br><br>
    <a>  by <a href="mailto:1647204078@qq.com">中转盘</a> @{{date}} </a>
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
