<template>
  <div>
    <el-dialog :title="show.title" :visible.sync="show.status" width="500px">
     <div>{{JSON.stringify(menu_data)}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="menu_item.status = false" size="small"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <el-card shadow="never">
      <div slot="header">
        <span style="flaot: right">菜单编辑器</span>
      </div>
      <div style="height: 50vh; overflow-x: hidden; overflow-y: auto">
        <div v-for="(menu, index) in menu_data" :key="index">
          <el-tag><i :class="menu.icon"/>{{menu.label }}</el-tag>
          <el-button size="mini" @click="add_menu(index)" style="float:right"
            ><i class="fa fa-plus-square-o"
          /></el-button>
          <br />
          <div style="margin-left: 20px;margin-top:20px;min-height:20px">
            <span
              v-for="(children, i) in menu.children"
              :key="i"
              style="margin-left:20px"
            >
              <el-tag type="success"><i :class="children.icon"/>{{ children.label }}</el-tag>
              <i
                class="fa fa-edit"
                @click="edit_item(index, i)"
                style="margin-left:10px;color:#faa64b;cursor: pointer;"
              />
              <i
                class="fa fa-trash-o"
                @click="remove(index, i)"
                style="margin-left:10px;color:#f96868;cursor: pointer;"
              />
            </span>
            <el-button
              size="mini"
              style="float:right"
              @click="add_menu_item(index)"
              ><i class="fa fa-plus-square-o"
            /></el-button>
          </div>
          <el-divider />
        </div>
      </div>
      <el-button
        type="success"
        size="small"
        @click="show.status=true"
        align="right"
        style="margin:10px 0px"
        >生成菜单json</el-button
      >
    </el-card>
    <el-dialog title="新增一级菜单" :visible.sync="menu.status" width="500px">
      <el-form ref="form" :model="form" size="small" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="菜单值">
          <el-input v-model="form.value"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标">
          <vEicon v-model="form.icon" />
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="form.show"
          ></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="menu.status = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="add()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="menu_item.title"
      :visible.sync="menu_item.status"
      width="500px"
    >
      <el-form ref="form" :model="item_form" size="small" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="item_form.label"></el-input>
        </el-form-item>
        <el-form-item label="菜单值">
          <el-input v-model="item_form.value"></el-input>
        </el-form-item>
        <el-form-item label="路由地址">
          <el-input v-model="item_form.path"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标">
          <vEicon v-model="item_form.icon" />
        </el-form-item>
        <el-form-item label="添加位置">
          <el-select
            v-model="item_site.name"
            clearable
            @change="get_site"
            placeholder="在该位置之后"
          >
            <el-option
              v-for="item in item_site.data"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="item_form.show"
          ></el-switch>
        </el-form-item>
        <el-form-item label="访问">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="item_form.vist"
          ></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="menu_item.status = false" size="small"
          >取 消</el-button
        >
        <el-button
          type="primary"
          size="small"
          v-show="menu_item.label == 'add'"
          @click="add_item()"
          >添加</el-button
        >
        <el-button
          type="primary"
          size="small"
          v-show="menu_item.label == 'edit'"
          @click="menu_item.status = false"
          >修改</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: {
        title: "菜单Json",
        status: false
      },
      menu: {
        index: "",
        status: false
      },
      menu_item: {
        index: "",
        status: false,
        title: "",
        label: "add"
      },
      item_form: {
        label: "",
        value: "",
        path: "",
        icon: "",
        show: 1,
        vist: 1
      },
      item_site: {
        data: [],
        name: "",
        index: ""
      },
      form: {
        label: "",
        value: "",
        icon: "",
        show: 1,
        children: []
      },
      menu_label: "show",
      menu_data: JSON.parse(localStorage.getItem("aslide_menu"))
    };
  },
  methods: {
    add_menu(index) {
      this.menu.index = index;
      this.menu.status = true;
    },
    add() {
      this.menu_data.splice(this.menu.index, 0, this.form);
      this.menu.status = false;
      //console.log(this.menu_data);
    },
    add_menu_item(index) {
      this.item_form = {
        label: "",
        value: "",
        path: "",
        icon: "",
        show: 1,
        vist: 1
      };
      this.menu_item.label = "add";
      this.menu_item.status = true;
      this.menu_item.index = index;
      this.menu_item.title = this.menu_data[index].label + "（二级菜单添加)";
      this.item_site.data = this.menu_data[index].children;
      //console.log(this.item_site.data);
    },
    get_site(value) {
      for (let index = 0; index < this.item_site.data.length; index++) {
        if (this.item_site.data[index].value == value) {
          this.item_site.index = index;
        }
      }
      //console.log(this.item_site.index);
    },
    add_item() {
      if (this.item_site.index == "") {
        this.menu_data[this.menu_item.index].children.splice(
          0,
          0,
          this.item_form
        );
      } else {
        this.menu_data[this.menu_item.index].children.splice(
          this.item_site.index + 1,
          0,
          this.item_form
        );
      }
      this.menu_item.status = false;
    },
    edit_item(index, i) {
      this.item_form = this.menu_data[index].children[i];
      this.menu_item.label = "edit";
      this.menu_item.status = true;
    },
    remove(index, i) {
      this.menu_data[index].children.splice(i, 1);
    },
    save_menu_show() {
      localStorage.setItem("aslide_menu", JSON.stringify(this.menu_data));
      this.$router.go(0);
    },
    save_menu_vist() {
      localStorage.setItem("aslide_menu", JSON.stringify(this.menu_data));
      this.$router.go(0);
    }
  },
  mounted() {
    //console.log(this.menu_data);
  }
};
</script>