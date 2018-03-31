<template>
  <div class="Sliders">
    <!--<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
    <!--<el-radio-button :label="false">展开</el-radio-button>-->
    <!--<el-radio-button :label="true">收起</el-radio-button>-->
    <!--</el-radio-group>-->
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">网站设置</span>
        </template>
        <el-menu-item @click="routerpush(item)" v-for="(item,index) in publicroles" :index="item.path"
                      :key="item.path">
          {{item.name}}
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2" v-if="roles">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">后台管理</span>
        </template>
        <el-menu-item :index="item.path"  v-for="item in roles" @click="routerpush(item)" :key="item.path"
                      :class="">
          {{item.name}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <!--<div style="" class="sk" @click="isCollapse=!isCollapse">-->
      <!--<i class="iconfont icon-xiangzuo" v-if="!isCollapse"></i>-->
      <!--<i class="iconfont icon-touxiangyoufill" v-if="isCollapse"></i>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
      };
    },
    methods: {
      routerpush(key,name) {
        this.$emit('breadtab', key.name);
        this.$router.push(key.path);
      }
    },
    computed: {
      roles() {
        let a = this.$store.state.users.asyncroles.filter(v => !v.publics);
        if (a.length === 0) {
          return false;
        } else {
          return this.$store.state.users.asyncroles.filter(v => !v.publics)
        }
      },
      publicroles() {
        return this.$store.state.users.asyncroles.filter(v => v.publics);
      },
      select() {
        return this.$route.path;
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-menu {
    box-sizing: border-box;
    height: 100%;
  }

  .Sliders {
    height: 100%;
    position: relative;
  }

  .el-menu-item, a {
    color: #303133 !important;
    text-decoration: none;
  }

  a {
    padding: 15px 50px;
  }
</style>
