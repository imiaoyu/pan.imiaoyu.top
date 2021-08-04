<template>
  <div>
    <el-cascader
      :options="city"
      :props="{ expandTrigger: 'hover', checkStrictly: true }"
      @change="handleChange"
    >
    </el-cascader>
    {{ value }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      city: require("@/assets/city.json"),
    };
  },
  methods:{
      handleChange(data){
          this.$emit('input',data)
        //   console.log(data);
      }
  }
};
</script>