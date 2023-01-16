<template>
    <div class="addBlog">
        <el-form
        ref="addBlogRef"
        :model="BlogForm"
        :rules="rules">
            <el-form-item prop="title" label="Article title">
                <el-input type="text" v-model="BlogForm.title"/>
            </el-form-item>
            <el-form-item prop="typeId" label="Classification">
                <el-select
                v-model="BlogForm.typeId"
                clearable
                placeholder="Select"
                style="width: 240px"
                >
                <el-option
                    v-for="item in classList"
                    :key="item.id.toString()"
                    :label="item.name"
                    :value="item.id"
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
                <el-button type="primary" @click="submit">{{ func }}</el-button>
                <el-button type="default" @click="goBack">Go back</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElNotification } from 'element-plus'
import { saveBlog, blogOne } from '@/api/blog';
import { typeAll } from '@/api/blogType'

export default {
    name: 'AddBlogView',
    setup() {
        const router = useRouter()
        const route = useRoute()
        const addBlogRef = ref()
        const func = ref()
        const rules = {
            title: [ 
                {required: true, message: 'Can\'t be empty', trigger: 'blur'} 
            ],
            typeId: [ 
                {required: true, message: 'Can\'t be empty', trigger: 'blur'} 
            ],
            content: [ 
                {required: true, message: 'Can\'t be empty', trigger: 'blur'} 
            ],
        }
        const state = reactive({
            BlogForm: {
                title: 'Let\'s write a blog!',
                typeId: '',
                addTime: '',
                content: '',
                summary: '',
                id: 0
            },
            classList: [], 
        })

        const loadBlogType = () => {
            typeAll().then( res => {
                if (res.data.code === 0) {
                    state.classList = res.data.data 
                } else {
                    ElNotification({
                        title: 'Error',
                        type: 'error',
                        message: res.data.msg
                    }) 
                }
            })
        }
        const loadOneBlog = () => {
            blogOne({
                id: state.BlogForm.id
            }).then ( res => {
                if (res.data.code === 0) {
                    state.BlogForm.title = res.data.data.title
                    state.BlogForm.content = res.data.data.content
                    state.BlogForm.typeId = res.data.data.typeId
                } else {
                    ElNotification({
                        title: 'Error',
                        type: 'error',
                        message: res.data.msg
                    }) 
                }
            })
        }

        // mounted
        onMounted(() => {
            state.BlogForm.id = route.params.id == undefined ? 0 : parseInt(route.params.id)
            if (state.BlogForm.id == 0) {
                func.value = 'Add Blog'
            } else if (state.BlogForm.id > 0) {
                func.value = 'Edit Blog'
                loadOneBlog()
            }
            loadBlogType()
        })

        // methods
        const submit = () => {
            addBlogRef.value.validate( valid => {
                if (!valid) {
                    return
                }
                console.log(state.BlogForm.typeId)
                saveBlog( state.BlogForm ).then( res => {
                    if (res.data.code === 0) {
                        ElNotification({
                            title: 'Success',
                            type: 'success',
                            message: 'Successfully save!' 
                        })
                        return
                    } else {
                        ElNotification({
                            title: 'Error',
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                }).catch( err => {
                    console.log(err)
                })

            })
        }
        const goBack = () => {
            router.push({name: 'BlogList'})
        }

        return {
            addBlogRef,
            rules,
            func,
            ...toRefs(state),
            submit,
            goBack
        }
    }
}
</script>