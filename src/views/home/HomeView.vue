<template>
    <div class="container">
      <!-- header part -->
        <el-row class="header">
          <el-col :span="23">
                <header-view>Header</header-view>
          </el-col>
        </el-row>
        
        <!-- main content -->
        <el-row class="main" justify="center" :gutter="12">
          <el-col class="main-aside" :span="asideRatio">
            <el-aside width="auto">
                <menu-nav @statusChange="changeRatio">Aside</menu-nav>
            </el-aside>
          </el-col>

          <el-col class="main" :span="23-asideRatio">
            <el-row>
              <el-col :span="24">
                  <el-card id="main-content" >
                    <!-- <template #header>
                      <div class="content-title">
                        <span>{{ title }}</span>
                      </div>
                    </template> -->
                    <router-view></router-view>
                  </el-card>
              </el-col>
            </el-row>
            
            
            
          </el-col>
        </el-row>
        <!-- footer -->
        <el-row class="footer">
          <el-col :span="24">
              <footer-view></footer-view>
          </el-col>
        </el-row>
        <template>
          Scroll down to see the bottom-right button.
          <el-backtop :right="100" :bottom="100" />
        </template>
    </div>
</template>
  
<script>
import MenuNav from '@/components/MenuNav'
import FooterView from '@/components/FooterView'
import HeaderView from '@/components/HeaderView'
import { onMounted, ref } from 'vue'
import { title } from 'process'
// import { findBlogger } from '@/api/blogger';

export default {
    name: "HomeView",
    emits: [title],
    components: {
        MenuNav,
        HeaderView,
        FooterView
    },
    setup() {
        const asideRatio = ref(6)

        const changeRatio = (status) => {
          if (status.value) {
            asideRatio.value = 2
          } else {
            asideRatio.value = 6
          }
        }
        onMounted(() => {
            let navHeight = document.documentElement.clientHeight
            let nav = document.getElementsByClassName('el-aside')
            for (let item of nav) {
                item.style.minHeight = (navHeight) + 'px';
            }
            document.getElementById('main-content').style.minHeight = (navHeight) + 'px';
          })
        return {
          asideRatio,
          changeRatio
        }
      }
}
</script>

<style>
.el-row.header{
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.el-card{
  padding: 1.2%;
}       

.el-aside {
  color: var(--el-text-color-primary);
  padding-bottom: 1.2%;
}

.el-row.footer{
  padding: 30px;
}

</style>
