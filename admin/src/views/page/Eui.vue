<template>
  <div style="background-color:#fff">
    <iframe :src="src" frameborder="0" style="height:70vh;width:100%"></iframe>
  </div>
</template>
<script>
export default {
  data(){
    return{
      src:'http://euiadmin.com'
    }
  }
}
</script>