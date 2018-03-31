<template>
  <div>
    <el-container>
      <el-header>
        <nav-header/>
      </el-header>
      <el-container>
        <el-aside style="width: 200px">
          <nav-slider @breadtab="breadtabs"/>
        </el-aside>
        <el-main>
          <nav-bread>
            <span slot="two">{{breadtwo}}</span>
          </nav-bread>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import NavHeader from './../components/Header'
  import NavSlider from './../components/Slider'
  import NavBread from './../components/Bread'

  export default {
    data() {
      return {
        two: '',
      }
    },
    components: {
      NavHeader,
      NavSlider,
      NavBread
    },
    methods: {
      breadtabs(e) {
        this.two = e;
      },
      initBread() {
        let a = this.$route.path;
        if (a === '/home/setting') {
          this.two = "基本设置";
        } else if (a.startsWith('/home/news')) {
          this.two = "新闻列表";
        } else if (a.startsWith('/home/tabs')) {
          this.two = "标签管理";
        } else if (a.startsWith('/home/carousel')) {
          this.two = "轮播图";
        } else if (a.startsWith('/home/addUsers')) {
          this.two = "管理员管理";
        }
      }
    },
    mounted() {
      this.initBread();
    },
    computed: {
      breadtwo() {
        return this.two;
      }
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #00d1b2 !important;
    color: white;
    height: 70px;
    line-height: 70px;
    padding: 0 !important;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-main {
    background-color: white;
  }
</style>
