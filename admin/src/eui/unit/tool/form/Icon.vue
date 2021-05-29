<template>
  <div>
    <span><i :class="icon" /></span>
    <el-cascader
      :options="icon_data"
      :props="{ expandTrigger: 'hover' }"
      clearable
      filterable
      @change="get_icon"
    >
      <template slot-scope="{ node, data }">
        <span
          ><i :class="data.label" style="margin-right: 10px" />{{
            data.label
          }}</span
        >
        <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
      </template>
    </el-cascader>
  </div>
</template>
<script>
export default {
  data() {
    return {
      icon: "",
      icon_data: require("@/assets/icon.json"),
    };
  },
  methods: {
    get_icon(icon) {
      this.icon='fa fa-'+icon[icon.length-1]
      this.$emit('input',this.icon)
      // console.log(this.icon);
    },
  },
};
</script>
<style scoped>
#icon {
  cursor: pointer;
}
</style>