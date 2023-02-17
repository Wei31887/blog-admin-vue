<template>
    <div class="header">
        <h2>
            Add Blog
        </h2> 
    </div>
    <div class="add-blog-view">
        <div class="add-blog-form">
            <el-form
            ref="addBlogRef"
            :model="BlogForm"
            :rules="rules">
                <el-form-item prop="title" label="Article title">
                    <el-input type="text" v-model="BlogForm.title"/>
                </el-form-item>
                <el-form-item prop="type_id" label="Classification">
                    <el-select
                    v-model="BlogForm.type_id"
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
        <div class="display-blog" v-html="markHTML">
            
        </div>
    </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElNotification } from 'element-plus'
import { saveBlog, blogOne } from '@/api/blog';
import { typeAll } from '@/api/blogType'
import { marked } from 'marked'

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
            type_id: [ 
                {required: true, message: 'Can\'t be empty', trigger: 'blur'} 
            ],
            content: [ 
                {required: true, message: 'Can\'t be empty', trigger: 'blur'} 
            ],
        }
        const state = reactive({
            BlogForm: {
                title: 'Let\'s write a blog!',
                type_id: '',
                content: '',
                summary: '',
                id: 0
            },
            classList: [], 
        })

        const markHTML = computed(() => {
            return marked(state.BlogForm.content)
        })

        const loadBlogType = () => {
            typeAll().then( res => {
                if (res.status == 200) {
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
                if (res.status == 200) {
                    state.BlogForm.title = res.data.data.title
                    state.BlogForm.content = res.data.data.content
                    state.BlogForm.type_id = res.data.data.type_id
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
            console.log(state.BlogForm)
            addBlogRef.value.validate( valid => {
                if (!valid) {
                    return
                }
                console.log(state.BlogForm.type_id)
                saveBlog( state.BlogForm ).then( res => {
                    if (res.status == 200) {
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
            goBack,
            markHTML
        }
    }
}
</script>

<style>
div.add-blog-view {
    /* height: 100%; */
    width: 100%;
    display: flex;
    justify-content: space-around;

}
div.add-blog-form {
    width: 50%;
}
div.display-blog {
    margin: 0 1rem 0 1rem;
    background-color: white;
    border-radius: 6px;
    /* border: 1px solid var(--border-color); */
    overflow: scroll;
    width: 50%;
    display: flex;
    padding: 1rem;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    /* text-align: center; */
    max-height: 50%;
    overflow: scroll;
}
</style>