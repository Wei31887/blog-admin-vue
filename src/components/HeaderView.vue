<template>
    <div class="header-view">
      <div class="logo">
        <router-link to="/" style="text-decoration: none;">
          <h3>Blog Admin</h3>  
        </router-link>
      </div>
      <div class="blogger">
        <h3>
          Hello: {{ getBlogger }}
        </h3>
        <el-dropdown size="large">
          <el-icon style="margin-right: 10px; padding: 10px" size="large">
            <setting/>
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-on:click="Logout()">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      </div>
</template>

<script>
import { findBlogger, logout } from '@/api/blogger'
import { removeAccessToken } from '@/utils/token'
import { useRouter } from 'vue-router'
import { onMounted, computed, ref } from 'vue'
import { ElMessageBox } from 'element-plus'

export default {
    name: 'HeaderView',
    setup() {
        const router = useRouter()
        const blogger = ref('blogger')
        const getBlogger = computed(() => {
          return blogger.value
        })

        const loading = () => {
          findBlogger().then(res => {
            blogger.value = res.data.data.nickname 
          })
        }
        // mounted
        onMounted(() => {
          loading()
        })

        // methods
        const Logout = () => {
            ElMessageBox.confirm('You\'re leaving right now, continue?', 'Warning', {
                confirmButtonText: 'Sure',
                cancelButtonText: 'Not yet',
                type: 'warning'
            }).then(() => {
                logout().then( res => {
                  if (res.status == 200) {
                    removeAccessToken()
                    router.push({name: 'Login'})
                  }
                })
            }).catch(() => { })
        }
        return {
            Logout,
            getBlogger,
        }
    }
}
</script>

<style scoped>
div.header-view {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  right: 20px;
}
.header {
  background-color: rgb(252, 252, 252);
}
div.logo {
  text-decoration: none;
  padding-left: 40px;
}
div.blogger {
  display: flex;
  align-items: center;
}


</style>