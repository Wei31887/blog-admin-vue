<template>
    <div class="addBlog">
        <el-form
        ref="addBlogRef"
        :model="BlogForm">
            <el-form-item prop="title" label="Article title">
                <el-input v-model="BlogForm.title"/>
            </el-form-item>
            <el-form-item prop="classId" label="Classification">
                <el-select
                v-model="BlogForm.classId"
                clearable
                placeholder="Select"
                style="width: 240px"
                >
                <el-option
                    v-for="item in classList"
                    :key="item.id.toString()"
                    :label="item.name"
                    :value="item.name"
                />
                </el-select>
            </el-form-item>
            <el-form-item prop="content" label="Content">
                <el-input
                    v-model="BlogForm.content"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    type="textarea"
                    placeholder="Please input"
                />
            </el-form-item>
            <el-form-item label="Operation">
                <el-button type="primary">{{ func }}</el-button>
                <el-button type="default">Go back</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue';
import { typeAll } from '@/api/blogType'

export default {
    name: 'AddBlogView',
    setup() {
        const addBlogRef = ref()
        const func = ref()
        const rules = []
        const state = reactive({
            BlogForm: {
                title: 'Let\'s write a log',
                classId: '',
                addTime: '',
                content: '',
            },
            classList: [], 
        })
        const loadBlogType = () => {
            typeAll().then( res => {
                if (res.data.code === 0) {
                    state.classList = res.data.data  
                }
            })
        }
        onMounted(() => {
            loadBlogType()
        })
        return {
            addBlogRef,
            rules,
            func,
            ...toRefs(state)
        }
    }
}
</script>