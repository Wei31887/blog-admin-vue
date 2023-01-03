<template>
  <el-card :body-style="{ padding: '0px' }">
    <template #header>
      <div class="NavHeader">
        <el-button link v-model="isCollapse" @click="handleExpand">
          <el-icon size="large" >
              <component :is="statusIcon"></component>
          </el-icon>
        </el-button>
      </div>
    </template>
    <div class="NavMain">
      <el-scrollbar height="400px">
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
      </el-scrollbar>
    </div>
  </el-card>
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
          title: 'Home Page',
          path: '/admin/home/welcome',
          icon: 'home-filled',
          child: []
        },
        {
          id: 2,
          title: 'Blog Management',
          path: '',
          icon: 'setting',
          child: [
            {
              id: 201,
              title: 'List of blog',
              path: '/admin/home/blogList',
              icon: 'messageBox',
            },
            {
              id: 202,
              title: 'Type of blog',
              path: '/admin/home/blogType',
              icon: 'setting',
            },
          ]
        },
        {
          id: 3,
          title: 'Comment Management',
          path: '',
          icon: 'view',
          child: [
            {
              id: 301,
              title: 'List of comment',
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
              title: 'Introduction',
              path: '/admin/home/myInfo',
              icon: 'avatar',
            }
          ]
        },
        {
          id: 5,
          title: 'System Management',
          path: '',
          icon: 'setting',
          child: [
            {
              id: 501,
              title: 'Password change',
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
.el-menu {
  border-right: 0 !important;
}

div.NavHeader {
  display: flex;
  justify-content: center;
  align-items: center;
}

div.NavMain {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>