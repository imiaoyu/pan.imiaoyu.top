<template>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="8" :lg="6" v-for="(card,index) in card_data" :key="index" style="margin-top:10px">
        <vCard :title="card.title" :num="card.num" :color="card.color" :icon="card.icon"/></el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      card_data: [
        {
          title: "下载",
          num: 15481,
          color:"#33cabb",
          icon:"fa fa-download"
        },
        {
          title: "用户",
          num: 8852,
          color:"#15c377",
          icon:"fa fa-user-o"
        },
        {
          title: "文件",
          num: 2886,
          color:"#48b0f7",
          icon:"fa fa-file-o"
        },
        {
          title: "访问",
          num: 777855,
          color:"#faa64b",
          icon:"fa fa-link"
        },
        {
          title: "阅读",
          num: 7776,
          color:"#f96868",
          icon:"fa fa-book"
        },
        {
          title: "发送",
          num: 7622,
          color:"#57c7d4",
          icon:"fa fa-send-o"
        },
        {
          title: "邮件",
          num: 776,
          color:"#7ec7f8",
          icon:"fa fa-envelope-o"
        },
        {
          title: "通知",
          num: 65883,
          color:"#fcc525",
          icon:"fa fa-bullhorn"
        },
      ]
    };
  }
};
</script>