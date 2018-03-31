<template>
  <div>
    <div style="color: white">
      <el-tag
        v-for="tag in tabsList"
        :key="tag.name"
        :type="tag.type"
        :color="tag.color"
        style="color: white"
        class="tabsitem"
        title="点击编辑"
      >
        <span @click="handleedit(tag)">{{tag.name}}</span>
      </el-tag>
    </div>
    <div class="addTabs">
      <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="addTabs" v-show="add">添加标签
      </el-button>
    </div>
    <nav-models :mdShow="addModel" @close="closeModal">
      <div slot="content">
        <div class="input">
          <el-input v-model="zh" placeholder="请输入中文标题"></el-input>
        </div>
        <div class="input">
          <el-input v-model="en" placeholder="请输入英文标题" :disabled="editidstats"></el-input>
        </div>
        <div class="input" style="display: flex;justify-content: flex-start;align-items: center;">
          <span style="margin-right: 10px">后台显示背景颜色 </span>
          <el-color-picker v-model="color" show-alpha @change="selececolor"></el-color-picker>
        </div>
        <div style="display: flex;justify-content: flex-start;color: red;font-size: 0.2rem;margin-bottom: 15px">
          *文字颜色默认为白色 尽量不要选择白色或近白色背景
        </div>
      </div>
      <div slot="footer" class="footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="addCreate('add')" v-if="!editid && add">添加</el-button>
        <el-button type="danger" @click="deleteTabs" v-if="editid && del">删除</el-button>
        <el-button type="primary" @click="updateCreate" v-if="editid && update">修改</el-button>
      </div>
    </nav-models>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import NavModels from './../components/Models'
  import {getDateLists, updateCarouser, addOperate, getDataitem,delOperate} from './../api/users'
  export default {
    data() {
      return {
        editidstats: false,
        visible2: false,
        tabsList: [],
        addModel: false,
        zh: '',
        en: '',
        color: 'rgba(19, 206, 102, 0.8)',
        editid: ''
      }
    },
    methods: {
      addTabs() {
        this.addModel = true;
      },
      selececolor(row) {
        this.color = row;
      },
      closeModal() {
        this.addModel = false;
        this.editidstats = false;
        this.editid = '';
        this.zh = '';
        this.en = ''
      },
      handleedit(tags) {
        this.zh = tags.name;
        this.en = tags.en;
        this.editid = tags._id;
        this.color = tags.color;
        this.editidstats = true;
        this.addModel = true;
      },
      addCreate() {
        if (!this.zh) {
          this.$message({
            message: '中文标题必须填写',
            type: 'warning'
          });
          return false;
        }
        if (!this.en) {
          this.$message({
            message: '英文标题必须填写',
            type: 'warning'
          });
          return false;
        }
        let obj = {
          urls:'/addtabs',
          data: {
            zh: this.zh,
            en: this.en,
            name: this.$store.state.users.name,
            color: this.color
          }
        };
        addOperate(obj).then(res => {
            this.addModel = false;
            this.zh = '';
            this.en = '';
            this.getData();
        });
      },
      getData() {
        let obj = {
          urls:'/gettabs',
          params:{}
        };
        getDateLists(obj).then(res => {
          this.tabsList = res.result;
        })
      },
      deleteTabs() {
        let obj = {
          urls:'/deltabs',
          id: this.editid
        };
        delOperate(obj).then(res => {
            this.addModel = false;
            this.zh = '';
            this.en = '';
            this.editid = '';
            this.getData();
        });
      },
      updateCreate() {
        let obj = {
          urls:'/updatetabs',
          data: {
            id: this.editid,
            zh: this.zh,
            color: this.color,
            name: this.$store.state.users.name
          }
        };
        updateCarouser(obj).then(res => {
            this.addModel = false;
            this.zh = '';
            this.en = '';
            this.getData();
        })
      }
    },
    mounted() {
      this.getData();
    },
    components: {
      NavModels
    },
    computed: {
      add() {
        let a;
        this.$store.state.users.asyncroles.filter(v => {
            if (v.authname === "tabs") {
              a = v;
            }
          }
        );
        return a.authsigin.add ? true : false
      },
      del() {
        let a;
        this.$store.state.users.asyncroles.filter(v => {
            if (v.authname === "tabs") {
              a = v;
            }
          }
        );
        return a.authsigin.del ? true : false
      },
      update() {
        let a;
        this.$store.state.users.asyncroles.filter(v => {
            if (v.authname === "tabs") {
              a = v;
            }
          }
        );
        return a.authsigin.update ? true : false
      }
    },
  }
</script>

<style scoped>
  .input {
    margin-bottom: 15px;
  }

  .tabsitem {
    margin-right: 15px;
    cursor: pointer;
  }

  .el-icon-close {
    color: white !important;
  }
</style>
