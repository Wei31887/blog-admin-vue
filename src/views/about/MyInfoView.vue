<template>
    <div class="info-view">
        <div class="header">
            <h2>Introduction</h2>
        </div>
        <el-form
        :model="myInfo"
        ref="myInfoRef"
        :rules="rules">
            <el-form-item label="User Name" prop="userName">
                <el-input type="text" v-model="myInfo.userName"></el-input>
            </el-form-item>
            <el-form-item label="Nickname" prop="nickName">
                <el-input type="text" v-model="myInfo.nickName"></el-input>
            </el-form-item>
            <el-form-item label="Signiture" prop="sign">
                <el-input type="text" v-model="myInfo.sign"></el-input>
            </el-form-item>
            <el-form-item label="Image" prop="img">
                <!-- <el-input type="text" v-model="myInfo.img"></el-input> -->
                <!-- static/upload/20221204 -->
                <el-upload
                    class="avatar-uploader"
                    action=""
                    :auto-upload="false"
                    :show-file-list="false"
                    :limit="1"
                    :on-change="handleChange"
                    :before-upload="beforeUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width: 80px;height: 80px"/>
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>

            <el-form-item label="Profile" prop="profile">
                <el-input type="summary" v-model="myInfo.profile"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitInfo()">Submit</el-button>
                <el-button type="default" @click="resetInfo()">Reset</el-button>
            </el-form-item>
        </el-form>
            
        
    </div>
</template>

<script>
import { toRefs, ref, reactive, onMounted } from 'vue';
import { findBlogger } from '@/api/blogger'
import { ElMessage } from 'element-plus';
export default {
    name: 'MyInfoView',
    setup() {
        const myInfoRef = ref()
        const state = reactive({
            myInfo: {
                id: 0,
                userName: '',
                nickName: '',
                sign: '',
                img: '',
                profile: ''
            },
            imageUrl: ''
        })
        const rules = {
            userName: [ 
                {required: true, message: 'Username can\'t be empty', trigger: 'blur'} 
            ],
            nickName: [
                {required: true, message: 'Nickname can\'t be empty', trigger: 'blur'}
            ],
            sign: [
                {required: true, message: 'Signiture can\'t be empty', trigger: 'blur'}
            ],
            img: [
                {required: true, message: 'Profile image can\'t be empty', trigger: 'blur'}
            ],
            profile: [
                {required: true, message: 'Self intro can\'t be empty', trigger: 'blur'}
            ],
        }

        const findInfo = () => {
            findBlogger().then( res => {
                if (res.data.code === 0) {
                    state.myInfo.userName = res.data.data.username
                    state.myInfo.nickName = res.data.data.nickname
                    state.myInfo.sign = res.data.data.sign
                    state.myInfo.img = res.data.data.img
                    state.myInfo.profile = res.data.data.profile
                } else {
                    ElMessage({
                        type: 'warning',
                        message: res.data.msg,
                        duration: 3000
                    })
                }
            })
        }

        // Mounted
        onMounted(() => {
            findInfo()
        })

        // methods
        const handleChange = () => {
            return
        }

        const beforeUpload = (rawFile) => {
            if (rawFile.size / 1024 / 1024 > 2) {
                ElMessage.error('Avatar picture size can not exceed 2MB!')
                return false
            }
            return true
        }
        const submitInfo = () => {
            return
        }
        const resetInfo = () => {
            findInfo()
            return
        }

        return {
            ...toRefs(state),
            myInfoRef,
            rules,
            handleChange,
            beforeUpload,
            submitInfo,
            resetInfo,
        }
    }
}

</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

div.info-view {
    width: 100%;
}
</style>