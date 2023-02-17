<template>
  <div class="container">
    <el-row>
      <!-- aside -->
      <el-col class="main-aside" :span="asideRatio">
        <aside class="aside">
          <menu-nav @statusChange="changeRatio"></menu-nav>
        </aside>
      </el-col>
      <el-col :span="24-asideRatio"> 
        <div class="system-main-container">
          <!-- header -->
          <header class="header">
            <header-view>Header</header-view>
          </header>
          <main class="main-container">
            <!-- content -->
            <!-- <el-scrollbar height="300px"> -->
              <div class="content">
                <router-view></router-view>
              </div>
            <!-- </el-scrollbar> -->
          </main>
        </div>
      </el-col>
      <!-- footer
      <footer class="footer">
        <footer-view></footer-view>
      </footer> -->
    </el-row>
  </div>
</template>
  
<script>
import MenuNav from '@/components/MenuNav'
import HeaderView from '@/components/HeaderView'
import { ref } from 'vue'
import { title } from 'process'

export default {
    name: "HomeView",
    emits: [title],
    components: {
        MenuNav,
        HeaderView,
        // FooterView
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
  min-height: 100vh;
  height: 100%;
}

aside.aside {
  position: sticky;
  right: 0;
  top: 0;
  /* height: 100vh; */
}

div.system-main-container {
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100vh;
}

header.header{
  z-index: 4;
  top: 0px;
  margin: 1rem 1rem 0rem 0;
  background-color:  var(--header-color);
  border-radius: 6px;
}

main.main-container {
  z-index: 10;
  padding: 0.5rem;
  height: 85%;
  overflow: scroll;
  margin: 1rem 1rem 1rem 0;
  background-color:  var(--div-color);
  border-radius: 6px;
  height: 100%;
}

div.content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* height: 100%; */
}


footer.footer {
  z-index: 3;
  position: relative;
  bottom: 0px;
  width: 100%;
}

</style>
