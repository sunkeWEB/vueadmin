<template>
  <div>
    <!--分页公共组件-->
    <el-pagination
      layout="prev, pager, next"
      :background="background"
      :total="total"
      :page-size="pageSize"
      @current-change="currpagetions"
    >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props:{ //props 验证
      pageSize:{
        type:Number,
        required: true
      },
      total:{
        type:Number,
        required: true
      },
      background:{
        type:Boolean,
        default:true
      }
    },
    methods: {
      currpagetions(index) {  // 点击上一页 或者下一页会执行的回调函数 indnx是一个新的页码
        this.$emit('changePage', index); // 触发父组件的changePage绑定的函数 并把页码传出去
      }
    }
  }
</script>

<style scoped>

</style>
