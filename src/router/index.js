import { createRouter, createWebHistory } from 'vue-router'
import { getAccessToken } from '@/utils/token'
import Home from '@/views/AppLayout.vue'
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
        component: () => import('@/views/welcome/WelcomeView.vue'),
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
        path: 'addBlog/:id?',
        name: 'AddBlog',
        component: () => import('@/views/blog/AddBlogView')
      },
      {
        path: 'blogType',
        name: 'BlogType',
        component: () => import('@/views/blog/BlogTypeView')
      },
      {
        path: 'blogTag',
        name: 'BlogTag',
        component: () => import('@/views/blog/BlogTagView')
      },
      {
        path: 'commentList',
        name: 'Comment',
        component: () => import('@/views/comment/CommentView')
      }
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginLayout.vue')
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
  const token = getAccessToken();
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
