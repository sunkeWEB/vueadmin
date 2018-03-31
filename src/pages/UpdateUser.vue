<template>
    <div>
      编辑用户信息
    </div>
</template>

<script>
  import request from '@/utils/request'
    export default {
      data () {
        return {

        }
      },
      mounted (){
        this.getUser();
      },
      methods:{
        getUser() {
          if (!this.$route.query.id) {
            this.$message({
              type: 'info',
              message: '缺少参数'
            });
            setTimeout(()=>{
              this.$router.go(-1);
            },1100)
            return false;
          }
          request({
            url:'/users/getUser',
            type:'get',
            params:{
              id:this.$route.query.id
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
