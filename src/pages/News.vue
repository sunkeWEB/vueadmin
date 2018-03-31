<template>
  <div>
    <!--这里啥也没有-->
    <!--这里分三级路由 展示新闻列表和添加新闻的一个容器而已 路由文件里面重点向默认展示新闻列表-->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      addNews() {
        this.$router.push('/home/news/addnews');
      }
    }
  }
</script>

<style scoped>

</style>
