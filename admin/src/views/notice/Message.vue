<template>
  <el-card shadow="never">
    <div slot="header">
      <div style="height:20px">
        <p style="float:left">
          <i class="fa fa-commenting-o" /> {{ title_data.title }}
        </p>
        <el-radio-group
          v-model="title_data.value"
          style="float:right;padding:10px"
        >
          <el-radio :label="1">已读</el-radio>
          <el-radio :label="0">未读</el-radio>
        </el-radio-group>
      </div>
    </div>
    <el-table :data="notice_data" height="55vh" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="user_name" label="留言者"> </el-table-column>
      <el-table-column prop="title" label="留言标题"> </el-table-column>
      <el-table-column label="阅读状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.read_status == 1 ? 'success' : 'danger'">{{
            scope.row.read_status == 1 ? "未读" : "已读"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="时间"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="reply(scope.$index, scope.row)"
            >回复</el-button
          ><el-button
            size="mini"
            type="danger"
            @click="remove(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :current-page="page.pn"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.rn"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      style="padding:10px 0px"
    >
    </el-pagination>
    <el-dialog
      :title="dialog_data.title"
      :visible.sync="dialog_data.status"
      width="500px"
    >
      <el-form ref="form" :model="form" label-width="80px" size="small">
        <el-form-item label="留言者">
          <el-input v-model="form.user_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="留言内容">
          <el-input
            type="textarea"
            v-model="form.notice_content"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="回复信息">
          <el-input type="textarea" v-model="form.reply_content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_data.status = false" size="small"
          >取 消</el-button
        >
        <el-button type="primary" @click="reply_web()" size="small"
          >回复</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
        page:{
            pn:1,
            rn:10,
            total:100,
        },
      form: {
        user_name: "",
        notice_content: "",
        reply_content: ""
      },
      title_data: {
        title: "留言",
        value: ""
      },
      dialog_data: {
        title: "",
        status: false
      },
      notice_data: [
        {
          id: 1,
          user_name: "user_1",
          title: "留言1",
          content: "这是留言内容",
          read_status: 1,
          date: "2020-1-2 15:15:01"
        },
        {
          id: 2,
          user_name: "user_2",
          title: "留言2",
          content: "这是留言内容",
          read_status: 0,
          date: "2020-1-2 15:15:01"
        },
        {
          id: 3,
          user_name: "user_3",
          title: "留言3",
          content: "这是留言内容",
          read_status: 1,
          date: "2020-1-2 15:15:01"
        },
        {
          id: 4,
          user_name: "user_4",
          title: "留言4",
          content: "这是留言内容",
          read_status: 0,
          date: "2020-1-2 15:15:01"
        },
        {
          id: 5,
          user_name: "user_5",
          title: "留言5",
          content: "这是留言内容",
          read_status: 1,
          date: "2020-1-2 15:15:01"
        },
        {
          id: 6,
          user_name: "user_6",
          title: "留言6",
          content: "这是留言内容",
          read_status: 1,
          date: "2020-1-2 15:15:01"
        },
        {
          id: 7,
          user_name: "user_7",
          title: "留言7",
          content: "这是留言内容",
          read_status: 1,
          date: "2020-1-2 15:15:01"
        },
        {
          id: 8,
          user_name: "user_8",
          title: "留言8",
          content: "这是留言内容",
          read_status: 1,
          date: "2020-1-2 15:15:01"
        }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    reply(index) {
      this.dialog_data.title = this.notice_data[index].title;
      this.dialog_data.status = true;
      this.form.user_name = this.notice_data[index].user_name;
      this.form.notice_content = this.notice_data[index].content;
    },
    reply_web() {
      setTimeout(() => {
        this.dialog_data.status = false;
        this.$message.success("回复成功");
      }, 1500);
    },
    remove(index) {
      this.$message.error("删除" + this.notice_data[index].title + "成功");
    }
  }
};
</script>
<style scoped>
p {
  cursor: pointer;
  margin-top: 10px;
  color: rgb(124, 124, 124);
}
</style>