<template>
  <el-card shadow="never">
    <div slot="header">
      <div style="height:20px">
        <p style="float:left"><i class="fa fa-envelope-o" />邮件管理</p>
        <el-button
          type="primary"
          @click="dialog_data.status=true"
          size="small"
          style="float:right"
          icon="fa fa-paper-plane-o"
          >发送邮件</el-button
        >
      </div>
    </div>
    <el-table :data="notice_data" height="55vh" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="user_name" label="收件用户"> </el-table-column>
      <el-table-column prop="user_email" label="收件箱"> </el-table-column>
      <el-table-column prop="email_title" label="邮件标题"> </el-table-column>
      <el-table-column label="发送状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.send_status == 1 ? 'success' : 'danger'">{{
            scope.row.send_status == 1 ? "发送成功" : "发送失败"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="发件时间"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="reply(scope.$index, scope.row)"
            >查看</el-button
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
        <el-form-item label="收件用户">
          <el-input v-model="form.user_name" ></el-input>
        </el-form-item>
        <el-form-item label="收件邮箱">
          <el-input v-model="form.user_email" ></el-input>
        </el-form-item>
        <el-form-item label="邮件标题">
          <el-input v-model="form.email_title"></el-input>
        </el-form-item>
        <el-form-item label="邮件内容">
          <el-input type="textarea" v-model="form.email_content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_data.status = false" type="warning" size="small"
          >存草稿</el-button
        >
        <el-button type="primary" @click="reply_web()" size="small"
          >发送</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      page: {
        pn: 1,
        rn: 10,
        total: 100
      },
      form: {
        user_name: "",
        user_email: "",
        email_title: "",
        email_content: ""
      },
      dialog_data: {
        title: "发送邮件",
        status: false
      },
      notice_data: [
        {
          id: 1,
          user_name: "user_1",
          user_email: "123456@qq.com",
          email_title: "邮件标题",
          email_content: "这是邮件内容",
          send_status: 1,
          date: "2020-1-2 15:15:01"
        },
        {
          id: 1,
          user_name: "user_1",
          user_email: "123456@qq.com",
          email_title: "邮件标题",
          email_content: "这是邮件内容",
          send_status: 1,
          date: "2020-1-2 15:15:01"
        },
        {
          id: 1,
          user_name: "user_1",
          user_email: "123456@qq.com",
          email_title: "邮件标题",
          email_content: "这是邮件内容",
          send_status: 1,
          date: "2020-1-2 15:15:01"
        },
        {
          id: 1,
          user_name: "user_1",
          user_email: "123456@qq.com",
          email_title: "邮件标题",
          email_content: "这是邮件内容",
          send_status: 1,
          date: "2020-1-2 15:15:01"
        },
        {
          id: 1,
          user_name: "user_1",
          user_email: "123456@qq.com",
          email_title: "邮件标题",
          email_content: "这是邮件内容",
          send_status: 1,
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
      this.form=this.notice_data[index]
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
  },
  mounted(){
      if (this.$route.query.user_name!=undefined) {
          this.form.user_name=this.$route.query.user_name
          this.form.user_email=this.$route.query.user_email
          this.dialog_data.status=true
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