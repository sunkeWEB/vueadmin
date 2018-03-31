<template>
  <div>
    <div style="display: flex;margin-bottom: 10px;margin-top: 10px">
      <el-button type="primary" size="small" @click="add" id="add" v-show="create"><i
        class="el-icon-circle-plus-outline"></i> 添加新闻
      </el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        border
        :highlight-current-row="true"
      >
        <el-table-column
          prop="fenmian"
          label="封面图"
          header-align="center"
        >
          <template slot-scope="scope18">
            <div v-if="scope18.row.fenmian"><img :src="scope18.row.fenmian" alt="" class="avatar"></div>
            <div v-else></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="tabs"
          label="标签"
          width="200"
          header-align="center">
          <template slot-scope="scope19">
            <el-tag
              v-for="tag in scope19.row.tabs"
              :key="tag"
              style="margin-right: 2px"
            >
              <span>{{tag}}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态(是否显示)"
          header-align="center">
          <div slot-scope="scope121">
            <switchs :slotScopes="scope121" @change="changestatus"></switchs>
          </div>
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作人"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="time"
          label="操作时间"
          :formatter="formatime"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="操作ip"
          header-align="center">
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
              v-show="del"
            ><i class="el-icon-delete"></i> 删除
            </el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
              v-show="update"
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
  </div>
</template>

<script>
  import request from '@/utils/request'
  import {formateTime} from '@/utils/util'
  import paginations from './../components/Paginations'
  import switchs from './../components/Switchs'
  import {getDateLists, updateCarouser, delOperate, addOperate} from './../api/users'

  export default {
    data() {
      return {
        tableData: [],
        pagetions: {
          background: true,
          total: 0,
          page: 1,
          limit: 3
        }
      }
    },
    methods: {
      add() {
        this.$router.push('/home/news/addnews');
      },
      getData() {
        let obj = {
          urls: '/getaritic',
          params: {
            page: this.pagetions.page,
            limit: this.pagetions.limit
          }
        };
        getDateLists(obj).then(res => {
          this.pagetions.total = res.total;
          this.tableData = res.result;
        });
      },
      formatime(row, column) {
        if (!row.time) {
          return ""
        } else {
          return formateTime(row.time);
        }
      },
      handleDelete(row) {
        let title = row.title;
        this.$confirm(`删除 ${title} 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let obj = {
            urls: '/delAritic',
            id: row._id
          };
          delOperate(obj).then(res => {
            this.getData();
          })
        })
      },
      handleEdit(row) {
        this.$router.push({name: 'addnews', query: {id: row._id}});
      },
      currpagetions(e) { // 接收从paginations组件获取的值
        this.pagetions.page = e;
        this.getData();
      },
      changestatus(row) {
        let obj = {
          urls: '/statusaritic',
          data: {
            status: row.status,
            id: row._id,
            name: this.$store.state.users.name
          }
        };
        updateCarouser(obj).then(res => {
          this.getData();
        })
      },
    },
    mounted() {
      this.getData();
    },
    computed: {
      create() {
        let a;
        this.$store.state.users.asyncroles.filter(v => {
            if (v.authname === "news") {
              a = v;
            }
          }
        );
        return a.authsigin.add ? true : false
      },
      del() {
        let a;
        this.$store.state.users.asyncroles.filter(v => {
            if (v.authname === "news") {
              a = v;
            }
          }
        );
        return a.authsigin.del ? true : false
      },
      update() {
        let a;
        this.$store.state.users.asyncroles.filter(v => {
            if (v.authname === "news") {
              a = v;
            }
          }
        );
        return a.authsigin.update ? true : false
      }
    },
    components: {
      paginations,
      switchs
    }
  }
</script>

<style scoped>
  .avatar {
    width: 80px;
    height: 40px;
  }

  tbody {
    text-align: center !important;
  }

  .paginations {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
  }

</style>
