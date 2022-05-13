import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/RouterPage'
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home.vue')
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
  //--------------------------------------------------------

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
