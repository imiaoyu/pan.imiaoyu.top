<template>
  <el-dropdown placement="bottom">
    <span class="el-dropdown-link">
      <i class="el-icon-bell" id="message_icon" />
      <el-badge is-dot class="item"></el-badge>
    </span>
    <el-dropdown-menu slot="dropdown" style="width:450px">
      <div style="margin-left:10px">
        <i class="" />
        <span style="margin-top:10px;font-size:15px;color:#8a8a8a">通知</span>
        <el-button type="info" size="mini" round style="float:right">未读3</el-button>
      </div>
      <el-dropdown-item divided v-for="(msg,index) in message" :key="index">
        <el-row>
          <el-col span="18">
            <span>{{msg.title}}</span>
          </el-col>
          <el-col span="6">
            <el-button-group>
              <el-button
                size="mini"
                round
                type="primary"
                icon="el-icon-edit-outline"
              ></el-button>
              <el-button type="danger" size="mini" round icon="el-icon-delete"></el-button>
            </el-button-group>
          </el-col> </el-row
      ></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
    data(){
        return{
            message:[
                {
                    id:1,
                    title:'这是最新消息',
                    content:'这是这是最新消息内容1',
                    read_status:1
                },
                {
                    id:1,
                    title:'这是最新消息1',
                    content:'这是这是最新消息内容1',
                    read_status:1
                },
                {
                    id:1,
                    title:'这是最新消息2',
                    content:'这是这是最新消息内容1',
                    read_status:0
                },
                {
                    id:1,
                    title:'这是最新消息3',
                    content:'这是这是最新消息内容1',
                    read_status:1
                },
            ]
        }
    }
}
</script>
<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>