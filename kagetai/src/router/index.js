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
    {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register_view.vue')
  },
  {
    path: '/favourite/:id',
    name: 'FavouriteView',
    component: () => import('../views/FavoriteView.vue')
  }
  
]

const router = new VueRouter({
  routes
})

export default router
