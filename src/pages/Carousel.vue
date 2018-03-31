<template>
  <div>
    <div style="display: flex;margin-bottom: 10px;margin-top: 10px">
      <el-button type="primary" size="small" @click="addCalsouelModel=true" v-show="add"><i
        class="el-icon-circle-plus-outline"></i> 添加轮播图
      </el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        stripe
        border
        :highlight-current-row="true"
        style="width: 100%">
        <el-table-column
          prop="avatar"
          label="小图预览"
          width="180"
          header-align="center"
        >
          <template slot-scope="scope11">
            <img :src="scope11.row.avatar" alt="" class="avatar">
          </template>
        </el-table-column>
        <el-table-column
          prop="describe"
          label="描述"
          width="180"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="url"
          label="url"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="time"
          label="上次操作时间"
          :formatter="formatime"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="ip"
          label="上次操作ip"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="上次操作人"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          header-align="center"
        >
          <div slot-scope="scope12">
            <switchs :slotScopes="scope12" @change="changestatus"></switchs>
          </div>
        </el-table-column>
        <el-table-column
          label="操作"
          header-align="center"
          v-if="del || update"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              v-if="del"
            ><i class="el-icon-delete"></i> 删除
            </el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              v-if="update"
            ><i class="el-icon-edit-outline"></i> 编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginations">
      <paginations :pageSize="pagetions.limit" :total="pagetions.total" :background="pagetions.background"
                   @changePage="currpagetions"></paginations>
    </div>
    <nav-models :mdShow="addCalsouelModel" @close="closeModal">
      <div slot="content">
        <div>
          <Uploads @uploadsucc="uploadsuccess" :edit.editfile="edit.editfile"></Uploads>
        </div>
        <div class="xx">
          <el-input v-model="describe" placeholder="请输入描述" prefix-icon="el-icon-tickets"></el-input>
        </div>
        <div class="xx">
          <el-input v-model="url" placeholder="请输入链接地址" prefix-icon="el-icon-goods"></el-input>
        </div>
      </div>
      <div slot="footer" class="footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="addCalsouer">添加</el-button>
      </div>
    </nav-models>
    <nav-models :mdShow="editCalsouelModel" @close="closeModal">
      <div slot="content">
        <div style="margin-top: 20px" class="top">
          <Uploads @uploadsucc="uploadsuccess" ref="child" :editfile="edit.editfile"></Uploads>
        </div>
        <div class="xx">
          <el-input v-model="edit.editdescribe" placeholder="请输入描述" prefix-icon="el-icon-tickets"></el-input>
        </div>
        <div class="xx">
          <el-input v-model="edit.editurl" placeholder="请输入链接地址" prefix-icon="el-icon-goods"></el-input>
        </div>
      </div>
      <div slot="footer" class="footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="editCalsouer">修改</el-button>
      </div>
    </nav-models>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import {formateTime} from '@/utils/util'
  import NavModels from './../components/Models'
  import Uploads from './../components/Uploads'
  import paginations from './../components/Paginations'
  import switchs from './../components/Switchs'
  import {getCarouserLists, updateCarouser, delOperate, addOperate} from './../api/users'

  export default {
    data() {
      return {
        tableData: [],
        editCalsouelModel: false,
        addCalsouelModel: false,
        describe: '',
        url: '',
        avatar: '',
        pagetions: {   // 分页的state
          total: 0,
          page: 1,
          limit: 8
        },
        edit: {
          editfile: [],  // 修改轮播图的地址[{name:'asa.png',url:''}]格式
          editid: '', // 修改轮播图的id
          editdescribe: '',// 修改轮播图的描述
          editavatar: '', // 修改轮播图的图片重新上传的图片地址
          editurl: '', // 修改轮播图的url
        }
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        // let obj = {
        //   urls:'/getaritic',
        //   params: {
        //     page: this.pagetions.page,
        //     limit: this.pagetions.limit
        //   }
        // };
        getCarouserLists(this.pagetions.page,this.pagetions.limit).then(res => {
          console.log(res);
          this.tableData = res.result;
          this.pagetions.total = res.total
        });
      },
      formatime(row, column) {
        if (!row.time) {
          return ""
        } else {
          return formateTime(row.time);
        }
      },
      changestatus(row) {
        let obj = {
          urls: '/changeStatus',
          data: {
            status: !row.status,
            id: row._id,
            name: this.$store.state.users.name
          }
        };
        updateCarouser(obj).then(res => {
          this.getData();
        })
      },
      handleDelete(row) {
        this.$confirm(`删除操作, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let obj = {
            urls: '/delCalsouel',
            id: row._id
          };
          delOperate(obj).then(res => {
            this.getData(this.currencypage);
          })
        })
      },
      closeModal() {
        this.addCalsouelModel = false;
        this.editCalsouelModel = false;
        this.edit.editfile = [];
      },
      uploadsuccess(file) {
        this.avatar = file.filename;
      },
      addCalsouer() {
        if (!this.avatar) {
          this.$message({
            message: '图片必须上传',
            type: 'warning'
          });
          return false;
        }
        if (!this.describe) {
          this.$message({
            message: '给一个描述呗',
            type: 'warning'
          });
          return false;
        }
        if (!this.$store.state.users.name) {
          this.$message({
            message: '请重新登录 name不存在',
            type: 'warning'
          });
          return false;
        }
        let obj = {
          urls: '/addCalsouer',
          data: {
            name: this.$store.state.users.name,
            avatar: this.avatar,
            url: this.url,
            describe: this.describe
          }
        };
        addOperate(obj).then(res => {
          this.url = '';
          this.describe = '';
          this.addCalsouelModel = false;
          this.edit.editfile = [];
          this.getData();
        });
      },
      currpagetions(e) {
        this.pagetions.page = e;
        this.getData();
      },
      handleEdit(index, rows) {
        this.edit.editid = rows._id;
        this.edit.editavatar = rows.avatar;
        this.edit.editdescribe = rows.describe;
        this.edit.editurl = rows.url;
        let url = 'http://127.0.0.1:8080' + rows.avatar;
        this.edit.editfile.push({name: 'carousel.png', url: url});
        this.editCalsouelModel = true;
      },
      editCalsouer() {
        let avatar = '';
        if (this.avatar) {
          avatar = '/uploads/' + this.avatar
        }
        let obj = {
          urls: '/updateCalsouel',
          data: {
            id: this.edit.editid,
            name: this.$store.state.users.name,
            avatar: avatar ? avatar : this.edit.editavatar,
            url: this.edit.editurl,
            describe: this.edit.editdescribe
          }
        };
        updateCarouser(obj).then(res => {
          this.getData();
          this.editCalsouelModel = false;
          this.avatar = '';
          this.url = '';
          this.describe = '';
          this.edit.editfile = [];
        })
      },
    },
    computed: {
      token() {
        console.log(this.$store);
        return {authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiNWFiMzNiOThmNGU1NDc0NGU3Mzg3ZTJlIiwiaWF0IjoxNTIyMDQ4MDUxLCJleHAiOjE1MjIwOTEyNTF9.3Azbt8cL0H-4bqNeftZ4OP0MF5XET_x0sQj-WzSWjg4'}
      },
      add() {
        let a;
        this.$store.state.users.asyncroles.filter(v => {
            if (v.authname === "carousel") {
              a = v;
            }
          }
        );
        return a.authsigin.add ? true : false
      },
      del() {
        let a;
        this.$store.state.users.asyncroles.filter(v => {
            if (v.authname === "carousel") {
              a = v;
            }
          }
        );
        return a.authsigin.del ? true : false
      },
      update() {
        let a;
        this.$store.state.users.asyncroles.filter(v => {
            if (v.authname === "carousel") {
              a = v;
            }
          }
        );
        return a.authsigin.update ? true : false
      }
    },
    components: {
      NavModels,
      Uploads,
      paginations,
      switchs
    }
  }
</script>

<style scoped>
  .avatar {
    width: 40px;
    height: 40px;
  }

  .xx {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .paginations {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
  }
</style>
