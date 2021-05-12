<template>
  <div>
  <div style="background-color: #2499b2;width: 100%;height: 10px"></div>
    <div style="background-color: #7ac7cf;width: 100%;height: 6px"></div>
    <div style="background-color: #e3ad9b;width: 100%;height: 5px"></div>
  <div class="header">
    <div class="title">
      <svg t="1620829391674" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9452" data-spm-anchor-id="a313x.7781069.0.i1" width="50" height="50"><path d="M813.4 387.1H212.92c-24.81 0-45-20.19-45-45V218.49c0-24.81 20.19-45 45-45H813.4c24.81 0 45 20.19 45 45V342.1c0 24.82-20.18 45-45 45zM212.92 203.49c-8.27 0-15 6.73-15 15V342.1c0 8.27 6.73 15 15 15H813.4c8.27 0 15-6.73 15-15V218.49c0-8.27-6.73-15-15-15H212.92z" fill="#3E3A39" p-id="9453" data-spm-anchor-id="a313x.7781069.0.i2" class="selected"></path><path d="M276.92 331.26c-5.52 0-10-4.48-10-10v-81.92c0-5.52 4.48-10 10-10s10 4.48 10 10v81.92c0 5.52-4.47 10-10 10zM790.08 291.17h-20c-5.52 0-10-4.48-10-10s4.48-10 10-10h20c5.52 0 10 4.48 10 10s-4.48 10-10 10z m-56 0h-20c-5.52 0-10-4.48-10-10s4.48-10 10-10h20c5.52 0 10 4.48 10 10s-4.48 10-10 10z m-56 0h-20c-5.52 0-10-4.48-10-10s4.48-10 10-10h20c5.52 0 10 4.48 10 10s-4.48 10-10 10z" fill="#3E3A39" p-id="9454"></path><path d="M813.4 622.1H212.92c-24.81 0-45-20.19-45-45V453.49c0-24.81 20.19-45 45-45H813.4c24.81 0 45 20.19 45 45V577.1c0 24.82-20.18 45-45 45zM212.92 438.49c-8.27 0-15 6.73-15 15V577.1c0 8.27 6.73 15 15 15H813.4c8.27 0 15-6.73 15-15V453.49c0-8.27-6.73-15-15-15H212.92z" fill="#3E3A39" p-id="9455" data-spm-anchor-id="a313x.7781069.0.i3" class="selected"></path><path d="M276.92 566.26c-5.52 0-10-4.48-10-10v-81.92c0-5.52 4.48-10 10-10s10 4.48 10 10v81.92c0 5.52-4.47 10-10 10zM790.08 526.17h-20c-5.52 0-10-4.48-10-10s4.48-10 10-10h20c5.52 0 10 4.48 10 10 0 5.53-4.48 10-10 10z m-56 0h-20c-5.52 0-10-4.48-10-10s4.48-10 10-10h20c5.52 0 10 4.48 10 10 0 5.53-4.48 10-10 10z m-56 0h-20c-5.52 0-10-4.48-10-10s4.48-10 10-10h20c5.52 0 10 4.48 10 10 0 5.53-4.48 10-10 10z" fill="#3E3A39" p-id="9456"></path><path d="M813.4 857.1H212.92c-24.81 0-45-20.19-45-45V688.49c0-24.81 20.19-45 45-45H813.4c24.81 0 45 20.19 45 45V812.1c0 24.82-20.18 45-45 45zM212.92 673.49c-8.27 0-15 6.73-15 15V812.1c0 8.27 6.73 15 15 15H813.4c8.27 0 15-6.73 15-15V688.49c0-8.27-6.73-15-15-15H212.92z" fill="#3E3A39" p-id="9457" data-spm-anchor-id="a313x.7781069.0.i4" class="selected"></path><path d="M276.92 801.26c-5.52 0-10-4.48-10-10v-81.92c0-5.52 4.48-10 10-10s10 4.48 10 10v81.92c0 5.52-4.47 10-10 10zM790.08 761.17h-20c-5.52 0-10-4.48-10-10s4.48-10 10-10h20c5.52 0 10 4.48 10 10s-4.48 10-10 10z m-56 0h-20c-5.52 0-10-4.48-10-10s4.48-10 10-10h20c5.52 0 10 4.48 10 10s-4.48 10-10 10z m-56 0h-20c-5.52 0-10-4.48-10-10s4.48-10 10-10h20c5.52 0 10 4.48 10 10s-4.48 10-10 10z" fill="#3E3A39" p-id="9458"></path></svg>
      <a @click="home()">中转盘</a>
      <!--      <span class="label">Cloud Drive</span>-->
    </div>
    <div class="user">
<!--      <img src="http://up.woozooo.com/images/u.gif"/>-->
      <i class="el-icon-user-solid"></i>
      <a @click="information">{{username}}</a>
      <a href="#" @click="signOut" v-if="username">退出</a>
      <a href="#" @click="sign" v-if="!username">登陆</a>
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
    },
    information () {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: '/user-information'})
    },
    sign () {
      this.$router.push({ path: '/' })
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
  display: flex;
  align-items: center;
  width: 50%;
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
  width: 50%;
  /* margin-right: 40px;
  text-align: right; */
  /*position: absolute;*/
  margin-top: 10px;
  text-align: right;
  /*right: 0px;*/
  /*margin-right: auto;*/
}
</style>
