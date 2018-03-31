<template>
  <div>
    <div class="demo-input-suffix">
      <span>网站标题</span>
      <el-input
        placeholder="请输入网站标题"
        prefix-icon="el-icon-tickets"
        v-model="title"
        :disabled="!isauth"
      >
      </el-input>
    </div>

    <div class="demo-input-suffix">
      <span>网站备案</span>
      <el-input
        placeholder="请输入网站备案号"
        prefix-icon="iconfont icon-beian"
        v-model="beian"
        :disabled="!isauth"
      >
      </el-input>
    </div>

    <div class="demo-input-suffix">
      <span>网站地址</span>
      <el-input
        placeholder="请输入网站联系地址"
        prefix-icon="iconfont icon-dizhi"
        v-model="adders"
        :disabled="!isauth"
      >
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>联系电话</span>
      <el-input
        placeholder="请输入网站联系电话"
        prefix-icon="iconfont icon-dianhua"
        v-model="phone"
        :disabled="!isauth"
      >
      </el-input>
    </div>

    <div class="demo-input-suffix">
      <span>管理QQ</span>
      <el-input
        placeholder="请输入网站管理员QQ"
        prefix-icon="iconfont icon-qq"
        v-model="qq"
        :disabled="!isauth"
      >
      </el-input>
    </div>

    <div class="demo-input-suffix xxx">
      <Uploads @uploadsucc="uploadsuccess" :editfile="edit.editfile" :isauth="!isauth" btnname="logo上传"></Uploads>
    </div>
    <div class="btn-save">
      <el-button class="save" type="primary" @click="save" v-show="isauth"><i class="el-icon-upload2"></i> 保存信息
      </el-button>
    </div>

  </div>
</template>

<script>
  import request from '@/utils/request'
  import Uploads from './../components/Uploads'
  import {getDateLists, updateCarouser, addOperate, getDataitem,delOperate} from './../api/users'
  export default {
    components: {Uploads},
    data() {
      return {
        title: '',
        phone: '',
        adders: '',
        qq: '',
        beian: '',
        logo: '',
        edit: {
          editfile: [],  // 修改轮播图的地址[{name:'asa.png',url:''}]格式
        }
      }
    },
    methods: {
      uploadsuccess(file) {
        this.logo = file.filename;
      },
      save() {
        let obj = {
          urls:'/updatewebs',
          data: {
            title: this.title,
            phone: this.phone,
            adders: this.adders,
            qq: this.qq,
            beian: this.beian,
            logo: this.logo,
            name: this.$store.state.users.name
          }
        };
        updateCarouser(obj).then(res => {
        })
      },
      getData() {
        let obj = {
          urls: '/getwebset',
        };
        getDataitem(obj).then(res => {
          this.title = res.result.title;
          this.phone = res.result.phone;
          this.adders = res.result.adders;
          this.qq = res.result.qq;
          this.beian = res.result.beian;
          this.logo = res.result.logo;
          this.edit.editfile.push({name: '网站logo', url: this.logo});
        });
      }
    },
    comments: {
      Uploads
    },
    mounted() {
      this.getData();
    },
    computed: {
      isauth() {
        let a;
        this.$store.state.users.asyncroles.filter(v => {
            if (v.authname === "setting") {
              a = v;
            }
          }
        );
        return a.authsigin.isauth ? true : false
      }
    }
  }
</script>

<style scoped>
  .demo-input-suffix {
    display: flex;
    margin-top: 15px;
  }

  .demo-input-suffix span {
    font-size: 0.3rem;
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #d7d7d7;
    font-weight: 600;
  }

  .demo-input-suffix > div {
    margin-left: 10px;
  }


  .none li {
    margin-top: 0 !important;
  }

  .logo {
    height: 38px;
    width: 108px !important;
  }
  .xxx{
    margin-left: 2.8rem;
  }

  .btn-save {
    margin-top: 15px;
    border-top: 1px dashed #00B7FF;
    display: flex;
    justify-content: center;
  }

  .save {
    margin-top: 15px;
  }

</style>
