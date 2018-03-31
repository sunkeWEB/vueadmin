<template>
  <div class="top">
    <div class="left">
      <span class="webname">向日葵系统</span>
    </div>
    <div class="right">
      <div class="welcome">欢迎你,{{name}}</div>
      <div class="" style="display: flex;justify-content: center;align-items: center">
        <el-dropdown :hide-on-click="false" @command="handleCommands">
          <span class="el-dropdown-link">
          <img class="avatar" :src="avatar" alt=""><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="avatar">修改头像</el-dropdown-item>
            <el-dropdown-item divided command="login">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <nav-models :mdShow="updateloginmodel" @close="closeModal">
      <div slot="content">
        <div class="avatarupload">
          <Uploads @uploadsucc="uploadsuccess" :editfile="edit.editfile"></Uploads>
        </div>
        <div slot="footer" class="footer">
          <el-button @click="updateloginmodel = false">取 消</el-button>
          <el-button type="primary" @click="editAvatarfun">修改</el-button>
        </div>
      </div>
    </nav-models>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import Uploads from './../components/Uploads'
  import NavModels from './../components/Models'
  import {getCarouserLists, getDateLists, updateCarouser, delOperate, addOperate} from './../api/users'

  export default {
    data() {
      return {
        msg: '',
        updateloginmodel: false,
        editavatars: '',
        edit: {
          editfile: [],  // 修改轮播图的地址[{name:'asa.png',url:''}]格式
        }
      }
    },
    computed: {
      name() {
        return this.$store.state.users.name
      },
      avatar() {
        return 'http://localhost:8080' + this.$store.state.users.avatar;
      }
    },
    methods: {
      handleCommands(command) {
        if (command === 'login') {
          this.$router.push('/login');
          // location.reload();
        } else if (command === 'pwd') {
          this.$prompt('请输入新密码', '修改密码', {
            confirmButtonText: '修改',
            cancelButtonText: '取消',
            inputType: 'password',
            inputPlaceholder: "新密码",
            // inputPattern: /\d{6,}/,
            // inputErrorMessage: '密码长度大于6位'
          }).then(({value}) => {
            let obj = {
              urls: '/users/updatepwd',
              data: {
                pwd: value
              }
            };
            updateCarouser(obj).then(res => {
              this.$router.push('/login');
            });
          })
        } else if (command === 'avatar') {
          let url = 'http://localhost:8080' + this.$store.state.users.avatar;
          this.edit.editfile.push({name: 'avatar.png', url: url});
          this.updateloginmodel = true;
        }
      },
      closeModal() {
        this.updateloginmodel = false;
      },
      uploadsuccess(file) {
        this.editavatars = file.filename;
      },
      editAvatarfun() {
        if (!this.editavatars) {
          this.$message({
            message: '头像不能为空哦',
            type: 'warning'
          });
          return false;
        }
        let obj = {
          urls: '/users/updateavatar',
          data: {
            avatar: this.editavatars
          }
        };
        updateCarouser(obj).then(res => {
          this.updateloginmodel = false;
          this.$store.dispatch('GetAvatar', '/uploads/' + this.editavatars); // 更新vuex 里面的头像
        });
      }
    },
    components: {
      NavModels,
      Uploads
    },
  }
</script>

<style scoped>
  .top {
    display: flex;
    height: 100%;
  }

  .webname {
    font-size: 23px;
  }

  .left {
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 50px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: white;
  }

  .el-dropdown > span {
    display: flex;
    justify-items: center;
    align-items: center;
  }

  .el-icon-arrow-down {
    font-size: 12px;
    display: none;
  }

  .avatar {
    width: 43px;
    height: 43px;
    border-radius: 50%;
  }

  .welcome {
    font-size: 0.36rem;
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }

  .avatarupload {
    display: flex;
    justify-content: center;
  }
</style>
