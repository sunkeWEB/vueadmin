import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './../pages/NotFound'
import Home from './../pages/Home'
import Carousel from './../pages/Carousel'
import News from './../pages/News'
import Webset from './../pages/Webset'
import AddNews from './../pages/AddNews'
import NewsLists from './../pages/NewsLists'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: resolve => require(['./../pages/Login.vue'], resolve)
  }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'addusers',
        name: 'addusers',
        meta: {
          title: 'addusers',
          icon: 'el-icon-setting',
          roles: ['admin']
        },
        component: resolve => require(['./../pages/Users.vue'], resolve),
      }
      , {
        path: 'sunke',
        name: 'sunke',
        meta: {
          title: 'setting',
          icon: 'el-icon-setting',
          roles: ['sunke']
        },
        component: resolve => require(['./../pages/Setting.vue'], resolve),
      }
      , {
        path: 'edituser',
        name: 'edituser',
        meta: {
          title: 'setting',
          icon: 'el-icon-setting',
          roles: ['admin']
        },
        component: resolve => require(['./../pages/UpdateUser.vue'], resolve),
      }
      , {
        path: 'tabs',
        name: 'tabs',
        meta: {
          title: 'setting',
          icon: 'el-icon-setting',
          roles: ['tabs']
        },
        component: resolve => require(['./../pages/Tabs.vue'], resolve),
      },
      {
        path: 'carousel',
        name: 'carousel',
        component: resolve => require(['./../pages/Carousel'], resolve),
        meta: {
          title: 'setting',
          icon: 'el-icon-setting',
          roles: ['carousel']
        }
      }, {
        path: 'news',
        name: 'news',
        meta: {
          title: 'setting',
          icon: 'el-icon-setting',
          roles: ['news']
        },
        component: News,
        redirect: '/home/news/newslists',
        redirect: {name: 'newslists'},
        children: [
          {
            path: 'newslists',
            name: 'newslists',
            component: NewsLists,
            meta: {
              title: 'setting',
              icon: 'el-icon-setting',
              roles: ['news']
            },
          },
          {
            path: 'addnews',
            name: 'addnews',
            component: AddNews,
            meta: {
              title: 'setting',
              icon: 'el-icon-setting',
              roles: ['news']
            },
          }]
      }, {
        path: 'setting',
        name: 'setting',
        component: Webset,
        meta: {
          title: 'setting',
          icon: 'el-icon-setting',
          roles: ['setting']
        }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

