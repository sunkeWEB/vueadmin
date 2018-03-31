import router from './router';
import store from './store'
import axios from 'axios';
import {getToken} from '@/utils/auth' // 验权
import {asyncRouterMap, constantRouterMap} from '@/router'

const whiteList = ['/login']; // 不重定向白名单

router.beforeEach((to, form, next) => {
  if (getToken()) { // 判断token是否存在
    if (to.path === '/login') {
      next();
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          let rolesarr = [];
          res.result.auth.map(v => {
            rolesarr.push(v.authname);
          });
          const roles = rolesarr; // note: roles must be a array! such as: ['editor','develop']  //这里生产路由
          store.dispatch('GenerateRoutes', {roles}).then(() => { // 根据roles权限生成可访问的路由表
            console.log("store.getters.addRouters");
            console.log(store.getters.addRouters);
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({...to, replace: true}) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          });
        }).catch((e) => {
          console.log(e);
        })
      } else {
        next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()  // 当前路由是白名单里面的继续渲染
    } else {
      next('/login') // 当前路由不是白名单里面的 跳转到 /login
    }
  }
});
