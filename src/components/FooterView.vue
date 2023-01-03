<template>
    <!-- <el-card width="100%"> -->
        <div>
            <p>copyright {{ time }}WeiTim</p>
        </div>
        <el-steps :active="0" align-center>
            <el-step />
            <el-step />
            <el-step />
        </el-steps>
    <!-- </el-card> -->
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const time = ref()
        return {
            time
        }
    }
}
</script>