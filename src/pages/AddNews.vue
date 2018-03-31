<template>
  <div>
    <div class="line">
      <div class="title">新闻标题</div>
      <div class="con">
        <el-input v-model="title" placeholder="请输入标题"></el-input>
      </div>
    </div>
    <div class="line">
      <div class="tab title">新闻标签</div>
      <el-tag
        v-for="tag in tabsList"
        :key="tag.name"
        :type="tag.type"
        :color="tag.color"
        style="color: white"
        class="tabsitem"
        title="点击选择"
      >
        <span @click="handleedit(tag)">{{tag.name}}</span>
        <span v-if="selectTabs.includes(tag.en)" style="position: absolute;top: -10px;right: 0"><i
          class="el-icon-success"></i></span>
      </el-tag>
    </div>
    <div class="line">
      <div class="title">新闻封面</div>
      <div class="con">
        <Uploads @uploadsucc="uploadsuccess" :editfile="editfile"></Uploads>
      </div>
    </div>
    <div class="line">
      <div class="edits">
        <quill-editor :options="editorOption" @change="onEditorChange($event)" :value="body"></quill-editor>
      </div>
    </div>
    <div class="line">
      <div class="btnsave">
        <el-button type="primary" @click="save" v-if="!edit">保存信息</el-button>
        <el-button type="primary" @click="update" v-if="edit">修改信息</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor} from 'vue-quill-editor'
  import Uploads from './../components/Uploads'
  import {getDateLists, updateCarouser, addOperate, getDataitem} from './../api/users'
  export default {
    data() {
      return {
        title: '',
        tabsList: '',
        fenmian: '',
        selectTabs: [],
        body: "",
        edit: false,  // 这里只是对添加和修改按钮做一下文字上的区别
        editorOption: {
          modules: {
            toolbar: [
              [
                'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', {'header': 1}, {'header': 2}, {'list': 'ordered'}, {'list': 'bullet'}, {'script': 'sub'}, {'script': 'super'},
                {'indent': '-1'}, {'indent': '+1'},
                {'direction': 'rtl'},
                {'link': true},
                {'color': []}, {'background': []},
                {'image': true},
                {'video': true},
                {'formula': true},
                {'align': []},
                {'font': []},
                {'size': ['small', false, 'large', 'huge']},
                {'header': [1, 2, 3, 4, 5, 6, false]},
                'clean'
              ],
            ]
          },
          placeholder: '请输入文章的内容'
        },
        editid: '',
        editfile: []
      }
    },
    methods: {
      getData() {
        let obj = {
          urls: '/gettabs',
          params: {}
        };
        getDataitem(obj).then(res => {
          this.tabsList = res.result;
        })
      },
      handleedit(tags) {
        if (this.selectTabs.includes(tags.en)) {
          this.selectTabs = this.selectTabs.filter(v => v != tags.en);
        } else {
          if (this.selectTabs.length > 2) {
            this.$message('最多只能为新闻选择3个标签哦');
            return false;
          }
          this.selectTabs.push(tags.en);
        }
      },
      uploadsuccess(file) {
        this.fenmian = file.filename;
      },
      save() {
        if (!this.title) {
          this.$message({
            message: '新闻标题必须填写',
            type: 'warning'
          });
          return false;
        }
        if (!this.selectTabs.length > 0) {
          this.$message({
            message: '新闻标签至少选择一个',
            type: 'warning'
          });
          return false;
        }
        if (!this.body) {
          this.$message({
            message: '新闻内容不能为空',
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
          urls: '/addnews',
          data: {
            fenmian: this.fenmian,
            title: this.title,
            tabs: JSON.stringify(this.selectTabs),
            body: this.body,
            name: this.$store.state.users.name
          }
        };
        addOperate(obj).then(res => {
          this.$router.push('/home/news');
        });
      },
      onEditorChange(e) {
        this.body = e.html;
      },
      getAritic(id) {
        let obj = {
          urls: '/getaritic',
          params: {
            edit: true,
            id: this.editid
          }
        };
        getDataitem(obj).then(res => {
          this.title = res.titletle;
          let tablists = [];
          this.tabsList.map(v => {
            res.result.tabs.map(t => {
              if (v.en === t) {
                tablists.push(t);
              }
            });
          });
          if (res.result.fenmian != '') {
            let url = 'http://127.0.0.1:8080' + res.result.fenmian;
            this.fenmian = res.result.fenmian;
            this.editfile.push({name: 'carousel.png', url: url});
          }
          this.body = res.result.body;
          this.title = res.result.title;
          this.selectTabs = tablists;
        })
      },
      update() {
        let obj = {
          urls: '/updatearitic',
          data: {
            id: this.editid,
            fenmian: this.fenmian,
            title: this.title,
            tabs: JSON.stringify(this.selectTabs),
            body: this.body,
            name: this.$store.state.users.name
          }
        };
        updateCarouser(obj).then(res => {
          this.$router.push('/home/news');
        });
      }
    },
    mounted() {
      this.getData();
      if (this.$route.query.id) { // id存在就是修改
        this.editid = this.$route.query.id;
        this.edit = true;
        this.getAritic(this.$route.query.id);
      }
    },
    components: {
      quillEditor,
      Uploads
    }
  }
</script>

<style scoped>
  .line {
    display: flex;
    margin-top: 15px;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    font-size: 0.35rem;
  }

  .tabsitem {
    margin-right: 15px;
  }

  .tabsitem > span {
    cursor: pointer;
  }

  .con {
    max-width: 600px;
    width: 100%;
    display: flex;
  }

  .edits {
    margin-left: 120px;
  }

  .tabsitem {
    position: relative;
  }

  .btnsave {
    margin-left: 120px;
  }

</style>
