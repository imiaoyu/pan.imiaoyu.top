<template>
  <div class="header">
    <div class="title">
      中转盘 <span class="label">Cloud Drive</span>
    </div>
    <div class="user">
      用户:{{username}}&nbsp;&nbsp;<a href="#"
        @click="signOut">退出</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-header',
  data () {
    return {
      username: sessionStorage.getItem('username')
    }
  },
  methods: {
    signOut () {
      this.$router.push({ path: '/' })
      sessionStorage.clear()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  box-shadow: 0 5px 15px -10px #ccc;
  padding: 20px;
  /*display: flex;*/
  /*flex-direction: row;*/
  /*flex-wrap: wrap;*/
}
.title {
  font-size: 30px;
  text-align: left;
  /* margin-left: 40px; */
}
.label {
  font-size: 20px;
}
.user {
  top: 20px;
  /* margin-right: 40px;
  text-align: right; */
  /*position: absolute;*/
  margin-top: 2rem;
  text-align: right;
  /*right: 0px;*/
}
</style>
