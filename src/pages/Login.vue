<template>
  <div class="login_back">
    <div class="login_div">
      <div class="login">
        <div>
          <div class="top">
            <img src="./../assets/head-logo.png" alt="">
          </div>
          <div class="content">
            <div>
              <input type="text" placeholder="请输入用户名" v-model="name">
            </div>
            <div>
              <input type="password" placeholder="请输入密码" v-model="pwd" @keyup.enter="login">
            </div>
          </div>
          <div class="footer">
            <el-button type="primary" class="loginbtn" :loading="logining" @click="login" @keyup.enter="login">登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: "",
        logining: false,
        name: '',
        pwd: ''
      }
    },
    methods: {
      login() {
        this.$store.dispatch('Login', {name: this.name, pwd: this.pwd}).then((res)=>{
          this.$router.push('/home');
        });
      },
      init () {
        // location.reload();
      }
    },
    mounted(){
      this.init();
    }
  }
</script>

<style scoped>
  .login_back {
    background-image: url("./../assets/login_back1.jpg");
    background-size: cover;
    height: 100%;
  }

  .login_div {
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login {
    background-color: #fff;
    height: 9rem;
    width: 8rem;
    border-radius: 5px;
    box-shadow: 0 0 30px rgba(0, 0, 0, .1);
    position: relative;
  }

  .top {
    position: absolute;
    top: -1.1rem;
    left: 1.6rem;
  }

  .top img {
    height: 2.2rem;
    width: 5rem;
  }

  .login > div {
    padding: 0.5rem;
  }

  .content {
    margin-top: 1rem;
  }

  input {
    outline: none;
    border: none;
    z-index: 5;
    top: 13px;
    width: 100%;
    background-color: transparent;
    font-size: 20px;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 0.2rem;
  }

  .loginbtn {
    width: 100%;
  }

  .footer {
    margin-top: 0.5rem;
  }

  .msg_err {
    color: red;
    font-size: 0.35rem;
  }

  input:focus {
    border-bottom: 1px solid #00B7FF;
  }
</style>
