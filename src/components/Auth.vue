<template>
  <div>
    <div class="authlist" style="display: flex">
      <div class="name">轮播图</div>
      <div class="xx">
        <el-checkbox label="添加" v-model="auth.carousel.add"></el-checkbox>
        <el-checkbox label="修改" v-model="auth.carousel.update"></el-checkbox>
        <el-checkbox label="删除" v-model="auth.carousel.del"></el-checkbox>
      </div>
    </div>

    <div class="authlist" style="display: flex">
      <div class="name">新闻管理</div>
      <div class="xx">
        <el-checkbox label="添加" v-model="auth.news.add"></el-checkbox>
        <el-checkbox label="修改" v-model="auth.news.update"></el-checkbox>
        <el-checkbox label="删除" v-model="auth.news.del"></el-checkbox>
      </div>
    </div>

    <div class="authlist" style="display: flex">
      <div class="name">标签管理</div>
      <div class="xx">
        <el-checkbox label="添加" v-model="auth.tabs.add"></el-checkbox>
        <el-checkbox label="修改" v-model="auth.tabs.update"></el-checkbox>
        <el-checkbox label="删除" v-model="auth.tabs.del"></el-checkbox>
      </div>
    </div>

    <div class="authlist" style="display: flex">
      <div class="name">网站设置</div>
      <div class="xx">
        <el-checkbox label="授权" v-model="auth.setting.isauth"></el-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['auth']
  }
</script>

<style scoped>
  .authlist {
    border-bottom: 1px solid #d7d7d7;
    border-left: 1px solid #d7d7d7;
    border-right: 1px solid #d7d7d7;
    padding: 6px;
  }

  .authlist:first-child {
    border-top: 1px solid #d7d7d7;
  }

  .authlist .name {
    width: 100px;
    border-right: 1px solid #d7d7d7;
  }

  .xx {
    margin-left: 15px;
  }
</style>
