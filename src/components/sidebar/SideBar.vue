<template>
  <div class="app-layout-sidebar">
    <div class="app-layout-sidebar__header" @click="handleExpand">
      <el-button class="collapse-button" link v-model="isCollapse">
        <el-icon size="large">
          <component :is="statusIcon"></component>
        </el-icon>
      </el-button>
    </div>
    <div class="app-layout-sidebar__main">
      <el-menu
        
        :default-active="route.path"
        :collapse="isCollapse"
        :router="true"
        :collapse-transition="false"
        style="padding: 0rem 1.5rem; overflow-y: scroll;"
      >
        <menu-item
          v-for="(item, index) in menus"
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
import MenuItem from "@/components/sidebar/MenuItem";
import NavRoute from "./NavRoute";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
  name: "SideBar",
  components: { MenuItem },
  setup(props, ctx) {
    const isCollapse = ref(false);
    const route = useRoute();
    const menus = ref(NavRoute.routes);
    const statusIcon = ref("Fold");

    const handleExpand = () => {
      isCollapse.value = !isCollapse.value;
      if (isCollapse.value) {
        statusIcon.value = "Expand";
      } else {
        statusIcon.value = "Fold";
      }
      ctx.emit("statusChange", isCollapse);
    };
    return {
      isCollapse,
      menus,
      route,
      handleExpand,
      statusIcon,
    };
  },
};
</script>

<style>
div.app-layout-sidebar {
  height: 100%;
  z-index: 1;
  overflow-y: scroll;
  position: sticky;
  background-color: var(--sidebar-color);
  width: 100%;
  left: 0;
  top: var(--header-height);
  box-shadow: var(--nav-box-shadow);
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

div.app-layout-sidebar__header {
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 2rem 0.5rem 2rem;
  background-color: rgba(227, 238, 217, 0.5);
  border-radius: 6px;
}

div.app-layout-sidebar__header:hover {
  cursor: pointer;
}

div.app-layout-sidebar__main {
  /* padding: rem; */
  height: 100%;
}

.el-menu-item {
  font-size: medium !important;
  /* font-weight: bold; */
}
.el-sub-menu__title {
  font-size: medium !important;
  /* font-weight: bold; */
}
</style>
