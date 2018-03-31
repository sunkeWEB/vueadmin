<template>
  <div>
    <el-switch
      v-model="slotScopes.row.status"
      active-color="#13ce66"
      inactive-color="#ff4949"
      @change="changeswitch(slotScopes.row)"
    >
    </el-switch>
  </div>
</template>

<script>
  export default {
    props: {
      slotScopes: {
        type: Object,
        required: true
      }
    },
    methods:{
      changeswitch (flage) {
        this.$emit('change',flage);
      }
    }
  }
</script>

<style scoped>

</style>
