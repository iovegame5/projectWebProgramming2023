import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
},
  {
    path: '/products',
    name: 'ProductsView',
    component: () => import('../views/ProductsView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/Add.vue')
  },
  {
    path: '/products/detail/:id',
    name: 'productDetail',
    component: () => import('../views/Products_detail.vue')
  },
  {
    path: '/:userid/chat',
    name: 'Chat',
    component: () => import('../views/ChatView.vue')
  },
  
  
]

const router = new VueRouter({
  routes
})

export default router
