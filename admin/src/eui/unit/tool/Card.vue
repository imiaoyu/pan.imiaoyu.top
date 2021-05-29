<template>
    <div class="card" :style="{backgroundColor: color}">
        <div class="icon_background">
            <i :class="icon"/>
        </div>
        <div class="content">
            <p style="font-size: 8px;padding-top:11px">{{title}}</p>
            <p style="font-size: 25px;">{{num}}</p>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
        },
        num:{
            type:Number
        },
        color:{
            type:String,
            default:'#33cabb'
        },
        icon:{
            type:String,
            default:'fa fa-user-o'
        }
    },
}
</script>
<style scoped>
i{
    color: white;
    margin:16px 16px;
}
.card{
    width: 100%;
    min-height: 100px;
}
.icon_background{
    float: left;
    margin: 25px 10px 25px;
    background-color: rgba(255, 255, 255, 0.40);
    width: 50px;
    height: 50px;
    border-radius: 100%;
}
.content{
    color: rgb(245, 245, 245);
    padding-top:10px;
    float: left;
    margin-left: 10px;
}
</style>