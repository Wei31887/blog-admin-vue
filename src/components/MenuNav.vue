<template>
  <div class="aside-view">
    <div class="nav-header" @click="handleExpand">
      <el-button class="collapse-button" link v-model="isCollapse" >
        <el-icon size="large" >
            <component :is="statusIcon"></component>
        </el-icon>
      </el-button>
    </div>
    <div class="nav-main">
        <el-menu 
          :default-active="route.path"
          :collapse="isCollapse"
          :router="true"
          :collapse-transition="false"
          >
          <menu-item v-for="(item, index) in menus" 
            :item="item" 
            :navIndex="String(index)" 
            :key="item.id"
          >
          </menu-item>
        </el-menu>
    </div>
  </div>
</template>

<script>
import MenuItem from '@/components/MenuItem';
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
    name: "MeunNav",
    components: { MenuItem },
    setup(props, ctx) {
      const isCollapse = ref(false)
      const route = useRoute()
      const menus = [
        {
          id: 1,
          title: '首頁',
          path: '/admin/home/welcome',
          icon: 'home-filled',
          child: []
        },
        {
          id: 2,
          title: '文章管理',
          path: '',
          icon: 'setting',
          child: [
            {
              id: 201,
              title: '文章列表',
              path: '/admin/home/blogList',
              icon: 'messageBox',
            },
            {
              id: 202,
              title: '文章分類',
              path: '/admin/home/blogType',
              icon: 'setting',
            },
            {
              id: 203,
              title: '文章標籤',
              path: '/admin/home/blogTag',
              icon: 'setting',
            },
          ]
        },
        {
          id: 3,
          title: '留言管理',
          path: '',
          icon: 'view',
          child: [
            {
              id: 301,
              title: '留言列表',
              path: '/admin/home/commentList',
              icon: 'messageBox',
            }
          ]
        },
        {
          id: 4,
          title: 'About',
          path: '',
          icon: 'avatar',
          child: [
            {
              id: 401,
              title: '個人訊息',
              path: '/admin/home/myInfo',
              icon: 'avatar',
            }
          ]
        },
        {
          id: 5,
          title: '系統',
          path: '',
          icon: 'setting',
          child: [
            {
              id: 501,
              title: '修改密碼',
              path: '/admin/home/changePassword',
              icon: 'setting',
            }

          ]
        }
      ]
      const statusIcon = ref('Fold')

        const handleExpand = () => {
          isCollapse.value = !isCollapse.value
          if (isCollapse.value) {
            statusIcon.value = 'Expand'
          } else {
            statusIcon.value = 'Fold'
          }
          ctx.emit('statusChange', isCollapse)
        } 
      return {
          isCollapse,
          menus,
          route,
          handleExpand,
          statusIcon
      }
  }
  
}
</script>

<style>

div.aside-view {
  padding-top: 1rem;
  height: 100%;
}

.el-menu {
  border-right: 0 !important;
}
.el-menu-item {
  border-radius: 10px;
}
.el-sub-menu__title {
  border-radius: 10px;
}

div.nav-header {
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 2rem 0.5rem 2rem;
  background-color: rgba(227, 238, 217, 0.5);
  border-radius: 6px;
}

div.nav-header:hover {
  cursor: pointer;
}

div.nav-main {
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}

.el-menu-item {
  font-size: medium !important;
  /* font-weight: bold; */
}
.el-sub-menu__title{
  font-size: medium !important;
  /* font-weight: bold; */
}

</style>