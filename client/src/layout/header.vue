<template>
  <div>
  <div style="background-color: #2499b2;width: 100%;height: 10px"></div>
    <div style="background-color: #7ac7cf;width: 100%;height: 6px"></div>
    <div style="background-color: #e3ad9b;width: 100%;height: 5px"></div>
  <div class="header">
    <div class="title">
         <a @click="home()">中转盘</a>
<!--      <span class="label">Cloud Drive</span>-->
    </div>
    <div class="user">
      <img src="http://up.woozooo.com/images/u.gif"/>
      {{username}}&nbsp;&nbsp;<a href="#"
        @click="signOut">退出</a>
    </div>
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
    },
    home () {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: '/tab-list'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
  box-shadow: 0 5px 15px -10px #ccc;
  padding: 10px;
  display: flex;
  /*flex-direction: row;*/
  /*flex-wrap: wrap;*/
}
.title {
  width: 30%;
  font-size: 30px;
  text-align: left;
  bottom: 0px;
  height: 50px;
  /* margin-left: 40px; */
}
.label {
  font-size: 20px;
}
.user {
  width: 70%;
  /* margin-right: 40px;
  text-align: right; */
  /*position: absolute;*/
  margin-top: 10px;
  text-align: right;
  /*right: 0px;*/
  /*margin-right: auto;*/
}
</style>
