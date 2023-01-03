import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/token'
import Home from '@/views/home/HomeView.vue'
// import Test from '@/views/TestView'

const routes = [
  {
    path: '/admin/home',
    name: 'Home',
    component: Home,
    children: [
      {
        // Welcome 將渲染至 home 中 </router-view>
        path: 'welcome',
        name: 'Welcome',
        component: () => import('@/views/WelcomeView.vue'),
      },
      {
        path: 'changePassword',
        name: 'ChangePassword',
        component: () => import('@/views/system/ChangePassword')
      },
      {
        path: 'myInfo',
        name: 'MyInfo',
        component: () => import('@/views/about/MyInfoView')
      },
      {
        path: 'blogList',
        name: 'BlogList',
        component: () => import('@/views/blog/BlogListView')
      },
      {
        path: 'addBlog',
        name: 'AddBlog',
        component: () => import('@/views/blog/AddBlogView')
      },
      {
        path: 'blogType',
        name: 'BlogType',
        component: () => import('@/views/blog/BlogTypeView')
      }
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/LoginView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach( (to, from, next) => {
  const token = getToken();
  if(token){
    if(to.name == "Login") {
      next({name: "Welcome"})
    }
  } else {
    if(to.name != "Login") {
      next({name: "Login"});
    }
  }
  next();
});

export default router
