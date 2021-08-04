<template>
  <div>
    <el-card shadow="never" class="card">
      <div slot="header" class="clearfix">
        <span>角色权限</span>
        <el-button
          type="primary"
          size="small"
          @click="dialog_data.status = true"
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
        <el-table-column prop="user_role" label="角色类型"> </el-table-column>
        <el-table-column prop="user_role_name" label="角色"> </el-table-column>
        <el-table-column prop="add_date" label="添加时间"> </el-table-column>
        <el-table-column prop="update_date" label="修改时间"> </el-table-column>
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
                <el-dropdown-item
                  ><el-button
                    size="mini"
                    type="success"
                    @click="power(scope.$index, scope.row)"
                    >权限管理</el-button
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
        <el-form-item label="角色头像">
          <el-input v-model="form.avator"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="form.user_role"></el-input>
        </el-form-item>
        <el-form-item label="角色识别">
          <el-input v-model="form.user_role_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog_data.status = false">取 消</el-button>
        <el-button type="primary" size="small">确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog_data: {
        title: "新增角色",
        status: false
      },
      form: {
        avator:'',
        user_role:'',
        user_role_name:''
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
          user_role: "super_admin",
          user_role_name: "超级管理员",
          add_date: "2020-1-2 12:15:01",
          update_date: "2020-10-2 12:15:01"
        },
        {
          avator:
            "https://scpic1.chinaz.net/Files/pic/pic9/202104/apic32300_s.jpg",
          user_role: "admin",
          user_role_name: "管理员",
          add_date: "2020-1-2 12:15:01",
          update_date: "2020-10-2 12:15:01"
        },
        {
          avator:
            "https://scpic3.chinaz.net/Files/pic/pic9/202104/bpic23046_s.jpg",
          user_role: "user",
          user_role_name: "用户",
          add_date: "2020-1-2 12:15:01",
          update_date: "2020-10-2 12:15:01"
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
      this.$message.success("编辑" + this.data[index].user_role_name);
    },
    power(index) {
      this.$message.success("编辑" + this.data[index].user_role_name);
      this.$router.push({
        path: "/user/power",
        query: {
          user_role: this.data[index].user_role,
          user_role_name: this.data[index].user_role_name
        }
      });
    },
    remove(index) {
      this.$message.error("删除" + this.data[index].user_role_name);
    }
  }
};
</script>