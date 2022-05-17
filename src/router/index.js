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
    {
      path: '/RoomInfo',
      name: 'RoomInfo',
      component: () => import('../views/BorrowRoom/RoomInfo.vue')
    }]
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


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
