<template>
  <div>
    <el-dialog
      :visible.sync="mdShow"
      width="30%"
      :before-close="handleClose">
      <div>
        <slot name="content"></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['mdShow'],
    name: 'sda',
    data() {
      return {
        dialogVisible: true
      };
    },
    methods: {
      handleClose(done) {
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>

</style>
