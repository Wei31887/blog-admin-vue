<template>
        <div class="footer">
            <p>Copyright © {{year}} by WeiTim. All rights reserved</p>
        </div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
    setup() {
        const year = ref()
        onMounted(() => {
            year.value = new Date().getFullYear()
        })
        return {
            year
        }
    }
}
</script>

<style>
.div.footer {
    padding: 50px;
}
</style>