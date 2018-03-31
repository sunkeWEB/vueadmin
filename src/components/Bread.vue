<template>
  <div class="bread">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><slot name="two"></slot></el-breadcrumb-item>
      <slot name="item">
      </slot>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "bread"
  }
</script>

<style scoped>
  .bread {
    padding-bottom: 0.3rem;
    border-bottom: 2px solid #d7d7d7;
  }
</style>
