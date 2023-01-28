<template>
  <div class="container">
    <el-row>
      <el-col class="main-aside" :span="asideRatio">
        <!-- aside -->
        <aside class="aside">
          <menu-nav @statusChange="changeRatio"></menu-nav>
        </aside>
      </el-col>
      <el-col :span="23-asideRatio"> 
        <div class="system-main-container">
          <!-- header -->
          <header class="header">
            <header-view>Header</header-view>
          </header>
          <main class="main-container">
            <!-- content -->
            <el-scrollbar height="300px">
              <div class="content">
                <router-view></router-view>
              </div>
            </el-scrollbar>
          </main>
        </div>
      </el-col>
    </el-row>
    <!-- footer -->
    <footer class="footer">
      <footer-view></footer-view>
    </footer>
  </div>
</template>
  
<script>
import MenuNav from '@/components/MenuNav'
import FooterView from '@/components/FooterView'
import HeaderView from '@/components/HeaderView'
import { onMounted, ref } from 'vue'
import { title } from 'process'

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
            // let navHeight = document.documentElement.clientHeight
            // let nav = document.getElementsByClassName('el-aside')
            // for (let item of nav) {
            //     item.style.minHeight = (navHeight) + 'px';
            // }
            // document.getElementById('main-content').style.minHeight = (navHeight) + 'px';
          })
        return {
          asideRatio,
          changeRatio
        }
      }
}
</script>

<style>
div.container {
  position: relative;
}

aside.aside {
  position: sticky;
  right: 0;
  top: 0;
  height: 100vh;
}

div.system-main-container {
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

main.main-container {
  z-index: 1;
  margin: 0.7rem;
  padding: 0.5rem;
  background-color:  var(--div-color);
  box-shadow: 0 1px 1px 0 rgba(150, 150, 150, 0.2), 0 3px 3px 0 rgba(150, 150, 150, 0.1);
  border-radius: 6px;
  height: 80%;
}

header.header{
  z-index: 4;
  min-width: 100%;
  top: 0px;
  /* min-height: 20%; */
}

footer.footer {
  z-index: 3;
  position: relative;
  bottom: 0px;
  width: 100%;
}

</style>
