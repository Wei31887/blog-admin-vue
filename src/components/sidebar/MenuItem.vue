<template>
    <el-sub-menu v-if="item.child && item.child.length > 0" :index="navIndex" class="subItem">
        <template #title>
            <el-icon>
                <component :is="item.icon"></component>
            </el-icon>
            <span> {{ item.title }} </span>
        </template>
        <menu-item v-for="(subItem, i) in item.child" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem">
        </menu-item>
    </el-sub-menu>
    <el-menu-item  v-else :index="item.path">
        <el-icon>
            <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.title }}</span>
    </el-menu-item>
</template>
  
<script>
export default {
    name: "MenuItem",
    props: ['item', 'navIndex']

}
</script>
  
<style scoped>
.el-menu-item{
    color: rgb(0, 0, 0);

}
.subItem div{
    color: rgb(0, 0, 0)

}
.subItem i{
    color: rgb(0, 0, 0)
}
</style>
  