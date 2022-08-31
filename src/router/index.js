import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/Login'
  },
  {
    path: '/Home',
    name: 'Home',
    redirect: '/BorrowRoom',
    component: () => import('../views/Home.vue'),
    //---------------------教室借用相关-----------------------------
    children:[{
      path: '/BorrowRoom',
      name: 'BorrowRoom',
      component: () => import('../views/BorrowRoom/BorrowRoom.vue')
    },
    {
      path: '/BorrowInfoList',
      name: 'BorrowInfoList',
      component: () => import('../views/BorrowRoom/BorrowInfoList.vue')
    },
    ]
  },
  {
    path: '/RouterPage',
    name: 'RouterPage',
    component: () => import('../views/RouterPage.vue')
  },
  //---------------------用户/User--------------------------------------------------------------------
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/User/Login.vue')
  },
  {
    path: '/Test',
    name: 'Test',
    component: () => import('../views/Test.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//导航守卫
//开启前先做白名单
/*router.beforeEach((to, from, next) => {
  //页面拦截
  if (to.name !== 'Login') {
    let role = window.sessionStorage.getItem("role");
    // let token = window.sessionStorage.getItem("token");
    if (!role) {
      return next({ name: 'Login' });
    }
    return next();
  } else {
    return next();
  }


})*/

export default router
