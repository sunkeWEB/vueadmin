<template>
  <div :class="{'none':showupload}">
    <el-upload
      name="logo"
      class="uploadlogo"
      action="/upload"
      size="small"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      list-type="picture"
      :on-success="success"
      :on-exceed="exceed"
      :file-list="editcalsouels"
      :disabled="isauth"
    >
      <el-button type="primary"><i class="el-icon-upload"></i> {{btnname}}</el-button>
    </el-upload>
  </div>
</template>

<script>
  export default {
    props: {
      editfile: {
        type: Array,
      },
      isauth: {
        type: Boolean,
        default: false
      },
      btnname: {
        type: String,
        default: '点击上传'
      }
    },
    data() {
      return {
        limit: 1,
        file: this.editfile
      }
    },
    methods: {
      handleRemove(file) {
        this.file = []; // 主要作用就是控制上传按钮显示
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      success(file) {
        this.file = [{name: '', url: ''}];  // 主要作用就是控制上传按钮显示
        this.$emit('uploadsucc', file);
      },
      exceed() {
        this.$message({
          message: '不能再上传了哦 最多只能上传' + this.limit + "张",
          type: 'warning'
        });
      }
    },
    computed: {
      editcalsouels() {
        this.file = this.editfile;
        return this.editfile;
      },
      showupload() {       // 内部的一个上传按钮的状态
        if (this.file) {
          if (this.file.length) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  }
</script>

<style scoped>
  #uploadBtn > div {
    display: none !important;
  }

  .none button {
    display: none !important;
  }
</style>
