<template>
  <div class="show">
    <base-header></base-header>
    <div class="notice">
      请勿上传重要资料
    </div>
    <el-tabs v-model="tabActivedName"
      class="tab"
      @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in componentList"
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
import userSet from './user-set'
import about from './about-us'

export default {
  name: 'show',
  components: {
    BaseHeader,
    BaseFooter,
    UploadFile,
    FileList,
    userSet,
    about
  },
  data () {
    return {
      tabActivedName: 'second',
      componentList: [
        {
          tabName: 'first',
          compoName: 'upload-file',
          tabLabel: '上传文件'
        },
        {
          tabName: 'second',
          compoName: 'file-list',
          tabLabel: '文件列表'
        },
        {
          tabName: 'third',
          compoName: 'user-set',
          tabLabel: '用户设置'
        },
        {
          tabName: 'fourth',
          compoName: 'about',
          tabLabel: '关于'
        }
      ]
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
      // console.log(event.target.getAttribute('id')) // 获取到当前元素的id
    }
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
</style>
