<template>
  <div class="app-layout">
    <header class="app-layout__header">
      <Nav-Bar/>
    </header>
    <div class="app-layout__content">
      <aside class="app-layout__aside">
        <Side-Bar @statusChange="changeRatio"></Side-Bar>
      </aside>
      <div class="app-layout__page">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/sidebar/SideBar";
import NavBar from "@/components/navbar/NavBar";
import { ref } from "vue";
import { title } from "process";

export default {
  name: "HomeView",
  emits: [title],
  components: {
    SideBar,
    NavBar,
  },
  setup() {
    const asideRatio = ref(5);
    const changeRatio = (status) => {
      if (status.value) {
        asideRatio.value = 2;
      } else {
        asideRatio.value = 5;
      }
    };

    return {
      asideRatio,
      changeRatio,
    };
  },
};
</script>

<style>
div.app-layout {
  background-color: var(--background-color);
  position: relative;
  height: 100vh;
}

.app-layout__header {
  position: relative;
  z-index: 999;
}

.app-layout__content {
  display: flex;
  flex-direction: row;
  height: calc(100vh - var(--navbar-height));
  z-index: 1;
}

.app-layout__aside {
  position: relative;
  /* z-index: 998; */
}
@media screen and (max-width: 768px) {
  .app-layout__aside {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 99;
  }
}

.app-layout__page {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
</style>
