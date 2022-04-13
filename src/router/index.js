import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pedidos',
    name: 'PedidosView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PedidosView.vue')
  },
  {
    path:'/cancelados',
    name: 'CanceladosView',
    component:()=> import('../views/CanceladosView.vue')
  },
  {
    path: '/concluidos',
    name: 'ConcluidosView',
    component: ()=> import ('../views/ConcluidosView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
