<template>
  <div class="notfound">
    <div>
      <img class="err_msg" src="./../assets/notfound.png" alt="">
      <div class="back">
        <el-button @click="back" type="primary">{{msg}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '返回首页'
      }
    },
    methods: {
      back() {
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>
  .notfound {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .back {
    text-align: center;
  }
</style>
