<template>
  <div class="show">
    <base-header></base-header>
    <div class="notice">
      新增我的收藏与我的分享
    </div>
    <el-tabs v-model="tabActivedName"
      class="tab"
      @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in componentList"
        class="tab-list"
        :key="index"
        :label="item.tabLabel"
        :name="item.tabName">
        <component :is="item.compoName"
          v-if="tabActivedName===item.tabName"></component>
      </el-tab-pane>
    </el-tabs>
    <base-footer></base-footer>
  </div>
</template>

<script>
import BaseHeader from '../layout/header'
import BaseFooter from '../layout/footer'
import UploadFile from './file-upload'
import FileList from './file-list'
// import userSet from './user-set'
import about from './about-us'
import collection from './collection'
// eslint-disable-next-line camelcase
import my_share from './my-share'

export default {
  name: 'show',
  components: {
    BaseHeader,
    BaseFooter,
    UploadFile,
    FileList,
    collection,
    my_share,
    about
  },
  data () {
    return {
      tabActivedName: 'second',
      componentList: [
        {
          tabName: 'first',
          compoName: 'upload-file',
          tabLabel: '上传'
        },
        {
          tabName: 'second',
          compoName: 'file-list',
          tabLabel: '文件'
        },
        {
          tabName: 'third',
          compoName: 'collection',
          tabLabel: '收藏'
        },
        {
          tabName: 'fourth',
          compoName: 'my_share',
          tabLabel: '分享'
        },
        {
          tabName: 'fifth',
          compoName: 'about',
          tabLabel: '关于'
        }
      ],
      flag: true
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
      // console.log(event.target.getAttribute('id')) // 获取到当前元素的id
    }
  },
  mounted () {
    // const h = this.$createElement

    // this.$notify({
    //   title: '致用户：',
    //   // eslint-disable-next-line standard/object-curly-even-spacing
    //   message: h('a', { style: 'color: #888888'}, '新增文件分享功能')
    // })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab {
  min-height: 400px;
  padding: 5px 20px;
}
.notice{
  margin-top: 20px;
  font-size: 14px;
  height: 20px;
  width: 100%;
}
.tab-list{
  /*padding: 0 40px;*/
  margin-left: 10px;
  /*padding-left: 25px;*/
}
</style>
