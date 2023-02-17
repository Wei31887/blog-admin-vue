<template>
    <h2>Change Password</h2>
    
    <el-row>
        <el-form
        ref="formRef"
        :rules="rules"
        :model="userInfo">
            <el-form-item label="Username" prop="userName">
                <el-input 
                placeholder="Please type the user name"
                v-model="userInfo.userName"
                type="text"></el-input>
            </el-form-item>
            <el-form-item label="New Password" prop="newPassword">
                <el-input placeholder="Enter the new password"
                v-model="userInfo.newPassword"
                type="password"></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password" prop="confirmedPassword">
                <el-input placeholder="Enter the new password again"
                v-model="userInfo.confirmedPassword"
                type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitChange()">Submit</el-button>
                <el-button type="default" @click="resetInput()">Reset</el-button>
            </el-form-item>
        </el-form>

    </el-row>
</template>

<script>
import { toRefs, reactive, ref, onMounted } from 'vue';
import { findBlogger, updatePassword } from '@/api/blogger';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';

export default {
    name: 'ChangePasswordView',
    setup() {
        const router = useRouter()
        const title = 'Change Password'
        const formRef = ref()
        const state = reactive({
            userInfo: {
                id: '',
                userName: '',
                newPassword: '',
                confirmedPassword: ''
            }
        })
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Password can\'t be empty'))
            } else if (value !== state.userInfo.newPassword) {
                callback(new Error('Two passwords don\'t match'))
            } else {
                callback()
            }
        }
        const rules = reactive({
            userName: [
                {required: true, message: 'Username can\'t be empty', trigger: 'blur'}
            ],
            newPassword: [
                {required: true, message: 'Password can\'t be empty', trigger: 'blur'}
            ],
            confirmedPassword: [
                { required: true, validator: validatePass, trigger: 'blur' }
            ],
        })

        const loadForm = () => {
            findBlogger().then( res => {
                if (res.status == 200) {
                    state.userInfo.id = res.data.data.id
                    state.userInfo.userName = res.data.data.username
                }
            })
        }

        // mounted
        onMounted(() => {
            loadForm()
        })

        // methods 
        const submitChange = () => {
            formRef.value.validate( valid => { 
                if (!valid) {
                    return false
                }
                console.log(formRef.value)
                updatePassword({
                    id: state.userInfo.id,
                    username: state.userInfo.userName,
                    password: state.userInfo.newPassword
                }).then( res => {
                    if (res.status == 200) {
                        ElNotification({
                            title: 'Success',
                            type: 'success',
                            message: 'Successfully change!'
                        })
                        router.push({name: 'ChangePassword'})
                    } else {
                        ElNotification({
                            title: 'Error',
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })

            })
        }

        const resetInput = () => {
            state.userInfo.newPassword = ''
            state.userInfo.confirmedPassword = ''
        }

        return {
            title,
            ...toRefs(state),
            formRef,
            rules,
            submitChange,
            resetInput,
        }
    }
}

</script>