<template>
  <div>
    <div style="display: flex;margin-bottom: 10px;margin-top: 10px">
      <el-button type="primary" size="small" @click="addUserModel=true"><i class="el-icon-circle-plus-outline"></i>
        添加管理员
      </el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        stripe
        border
        :highlight-current-row="true"
      >
        <el-table-column
          prop="name"
          label="姓名"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="上次登录时间"
          :formatter="formatime"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="ip"
          label="上次登录ip"
          header-align="center"
        >
        </el-table-column>
        <el-table-column prop="status" label="状态(是否可以登录)" header-align="center">
          <div slot-scope="scope1">
            <switchs :slotScopes="scope1" @change="changestatus"></switchs>
          </div>
        </el-table-column>
        <el-table-column label="操作" header-align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i> 删除
            </el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit-outline"></i> 编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginations">
        <paginations :pageSize="pagetions.limit" :total="pagetions.total" :background="pagetions.background"
                     @changePage="currpagetions"></paginations>
      </div>
      <nav-models :mdShow="editmodel" @close="closeModal">
        <div slot="content">
          <nav-auth :auth="auth"/>
        </div>
        <div slot="footer" class="footer">
          <el-button @click="editmodel = false">取 消</el-button>
          <el-button type="primary" @click="updateauth">修改</el-button>
        </div>
      </nav-models>

      <nav-models :mdShow="addUserModel" @close="closeModal">
        <div slot="content">
          <div>
            <el-input v-model="addname" placeholder="请输入用户名" prefix-icon="el-icon-tickets"></el-input>
          </div>
          <div>
            <el-input v-model="addpwd" placeholder="请输入密码" type="password" prefix-icon="el-icon-goods"></el-input>
          </div>
          <div>
            <el-input v-model="addphone" placeholder="请输入手机号码" type="phone"
                      prefix-icon="el-icon-mobile-phone"></el-input>
          </div>
          <nav-auth :auth="auth"/>
        </div>
        <div slot="footer" class="footer">
          <el-button @click="addUserModel = false">取 消</el-button>
          <el-button type="primary" @click="addUser">添加</el-button>
        </div>
      </nav-models>

    </div>
  </div>
</template>

<script>
  import NavBread from './../components/Bread'
  import {formateTime} from '@/utils/util'
  import NavModels from './../components/Models'
  import NavAuth from './../components/Auth'
  import paginations from './../components/Paginations'
  import switchs from './../components/Switchs'
  import {getCarouserLists, getDateLists, updateCarouser, delOperate, addOperate} from './../api/users'

  export default {
    data() {
      return {
        ss: true,
        tableData: [],
        addUserModel: false,
        editmodel: false,
        pagetions: {
          page: 1,
          total: 0,
          limit: 10
        },
        currencypage: 1,
        auth: {
          carousel: {
            update: false,
            del: false,
            add: false
          },
          news: {
            add: false,
            update: false,
            del: false
          },
          setting: {
            isauth: false
          },
          tabs: {
            add: false,
            update: false,
            del: false
          }
        },
        publicPath: [
          {
            authname: "carousel",
            name: '轮播图',
            path: "/home/carousel",
            publics: true,
            authsigin: {}
          },
          {
            authname: "news",
            name: '新闻列表',
            path: "/home/news",
            publics: true,
            authsigin: {}
          },
          {
            authname: "setting",
            name: '基本设置',
            path: "/home/setting",
            publics: true,
            authsigin: {}
          },
          {
            authname: "tabs",
            name: '便签管理',
            path: "/home/tabs",
            publics: true,
            authsigin: {}
          }
        ],
        addname: '',
        addpwd: '',
        addphone: '',
        editid: ''
      }
    },
    components: {
      NavBread,
      NavModels,
      NavAuth,
      paginations,
      switchs
    },
    mounted() {
      this.datas()
    },
    methods: {
      datas() {
        let obj = {
          urls: '/users/getUserLists',
          params: {
            page: this.pagetions.page,
            limit: this.pagetions.limit
          }
        };
        getDateLists(obj).then(res => {
          this.tableData = res.result;
          this.pagetions.total = res.total;
        })
      },
      formatime(row, column) {
        if (!row.time) {
          return ""
        } else {
          return formateTime(row.time);
        }
      },
      currpagetions(e) {
        this.pagetions.page = e;
        this.datas();
      },
      handleDelete(index, row) {
        this.$confirm(`删除管理员 ${row.name}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let obj = {
            urls: '/users/delUser',
            id: row._id
          };
          delOperate(obj).then(res => {
            this.datas();
          })
        })
      },
      handleEdit(index, row) {
        this.editid = row._id;
        row.auth.map(v => {
          if (v.authname === 'carousel') { // 轮播图
            this.auth.carousel.add = v.authsigin.add ? true : false;
            this.auth.carousel.del = v.authsigin.del ? true : false;
            this.auth.carousel.update = v.authsigin.update ? true : false;
          } else if (v.authname === 'news') {
            this.auth.news.add = v.authsigin.add ? true : false;
            this.auth.news.del = v.authsigin.del ? true : false;
            this.auth.news.update = v.authsigin.update ? true : false;
          } else if (v.authname === 'setting') {
            this.auth.setting.isauth = v.authsigin.isauth ? true : false;
          } else if (v.authname === 'tabs') {
            this.auth.tabs.add = v.authsigin.add ? true : false;
            this.auth.tabs.del = v.authsigin.del ? true : false;
            this.auth.tabs.update = v.authsigin.update ? true : false;
          }
        })
        this.editmodel = true;
      },
      closeModal() {
        this.editmodel = false;
        this.addUserModel = false;
      },
      changestatus(row) {
        let {status, _id} = row;
        let obj = {
          urls: '/users/changeStatus',
          data: {
            status: status,
            id: _id
          }
        };
        updateCarouser(obj).then(res => {
          this.datas(this.currencypage);
          this.closeModal();
        })
      },
      addUser() {
        if (!this.addname) {
          this.$message({
            message: '登录名必须填写',
            type: 'warning'
          });
          return false;
        }
        let en = /^[A-Za-z]+$/;
        if (!en.test(this.addname)) {
          this.$message({
            message: '登录名必须是字母',
            type: 'warning'
          });
          return false;
        }
        if (!this.addpwd) {
          this.$message({
            message: '登录密码必须填写',
            type: 'warning'
          });
          return false;
        }
        let auth = [];
        this.publicPath.map(v => {
          if (v.authname === 'carousel') {  // 跑马灯
            v.authsigin = {...v.authsigin, ...this.auth.carousel};
          } else if (v.authname === 'news') {
            v.authsigin = {...v.authsigin, ...this.auth.news};
          } else if (v.authname === 'setting') {
            v.authsigin = {...v.authsigin, ...this.auth.setting};
          } else if (v.authname === 'tabs') {
            v.authsigin = {...v.tabs, ...this.auth.tabs};
          }
          auth.push(v);
        });
        let obj = {
          urls: '/users/addUsers',
          data: {
            name: this.addname,
            pwd: this.addpwd,
            auth: JSON.stringify(auth)
          }
        };
        addOperate(obj).then(res => {
          this.addname = '';
          this.addpwd = '';
          this.addphone = '';
          this.datas();
          this.addUserModel = false;
        });
      },
      updateauth() {
        let auth = [];
        this.publicPath.map(v => {
          if (v.authname === 'carousel') {  // 跑马灯
            v.authsigin = {...v.authsigin, ...this.auth.carousel};
          } else if (v.authname === 'news') {
            v.authsigin = {...v.authsigin, ...this.auth.news};
          } else if (v.authname === 'setting') {
            v.authsigin = {...v.authsigin, ...this.auth.setting};
          } else if (v.authname === 'tabs') {
            v.authsigin = {...v.tabs, ...this.auth.tabs};
          }
          auth.push(v);
        });
        request({
          url: '/users/updateauth',
          method: 'post',
          data: {
            id: this.editid,
            auth: JSON.stringify(auth)
          }
        }).then(res => {
          this.datas();
          this.closeModal();
        });
      }
    }
  }
</script>

<style scoped>
  .paginations {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
  }

  .footer {
    margin-top: 30px;
  }

  .el-input {
    margin-bottom: 10px;
  }

</style>
