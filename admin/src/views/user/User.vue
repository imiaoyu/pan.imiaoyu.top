<template>
  <div>
    <el-card shadow="never" class="card">
      <div slot="header" class="clearfix">
        <span>用户</span>
        <el-button
          @click="dialog_data.status = true"
          type="primary"
          size="small"
          style="float:right"
        >
          <i class="fa fa-plus-square-o"></i>
        </el-button>
      </div>
      <el-table :data="data" style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.avator"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="user_pet_name" label="用户昵称">
        </el-table-column>
        <el-table-column prop="user_name" label="用户名"> </el-table-column>
        <el-table-column prop="user_role" label="用户角色"> </el-table-column>
        <el-table-column prop="user_email" label="用户邮箱"> </el-table-column>
        <el-table-column prop="user_register_data" label="注册时间">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button type="primary" size="mini">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="edit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button
                    type="warning"
                    size="mini"
                    @click="send_email(scope.$index, scope.row)"
                    >邮件</el-button
                  >
                </el-dropdown-item>
                <el-dropdown-item
                  ><el-button
                    size="mini"
                    type="success"
                    @click="power(scope.$index, scope.row)"
                    >登录查询</el-button
                  ></el-dropdown-item
                >
                <el-dropdown-item
                  ><el-button
                    size="mini"
                    type="danger"
                    @click="remove(scope.$index, scope.row)"
                    >删除</el-button
                  ></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
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
    </el-card>
    <el-dialog
      :title="dialog_data.title"
      :visible.sync="dialog_data.status"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" size="small" label-width="80px">
        <el-form-item label="用户头像">
          <el-input v-model="form.avator"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="form.user_pet_name"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.user_name"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="form.user_email"></el-input>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="form.user_role" placeholder="请选择">
            <el-option label="超级用户" value="super_admin"> </el-option>
            <el-option label="管理员" value="admin"> </el-option>
            <el-option label="普通用户" value="user"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog_data.status = false"
          >取 消</el-button
        >
        <el-button type="primary" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog_data: {
        title: "新增用户",
        status: false
      },
      form: {
        avator: "",
        user_pet_name: "",
        user_name: "",
        user_role: "",
        user_email: "",
      },
      page: {
        pn: 1,
        rn: 10,
        total: 100
      },
      data: [
        {
          avator:
            "https://scpic.chinaz.net/files/pic/pic9/202104/apic32378.jpg",
          user_pet_name: "嘟嘟",
          user_name: "dudu",
          user_role: "超级管理员",
          user_email: "123@qq.com",
          user_register_data: "2020-1-2 12:15:01"
        },
        {
          avator:
            "https://scpic.chinaz.net/files/pic/pic9/202104/apic32378.jpg",
          user_pet_name: "小海",
          user_name: "xiaohai",
          user_role: "管理员",
          user_email: "123@qq.com",
          user_register_data: "2020-1-2 12:15:01"
        },
        {
          avator:
            "https://scpic.chinaz.net/files/pic/pic9/202104/apic32378.jpg",
          user_pet_name: "莉莉",
          user_name: "lili",
          user_role: "普通用户",
          user_email: "3333@qq.com",
          user_register_data: "2020-1-2 12:15:01"
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
    edit(index) {
      this.$message.success("编辑" + this.data[index].user_name);
    },
    send_email(index){
      this.$router.push({
        path:'/notice/email',
        query:{
          user_name:this.data[index].user_name,
          user_email:this.data[index].user_email
        }
      })
    },
    vist(index) {
      this.$message.success("访问" + this.data[index].user_name);
    },
    remove(index) {
      this.$message.error("删除" + this.data[index].user_name);
    }
  }
};
</script>