<template>
    <div class="header">
        <h2>
            Comment List
        </h2> 
    </div>
        <div class="pagination">
                <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    background
                    layout="prev, pager, next, jumper"
                    :total="currentTotal"
                    @current-change="handleCurrentChange"
                    />
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column fixed prop="id" label="ID" width="70" />
          <el-table-column prop="ip" label="IP" width="120" />
          <el-table-column prop="blog_id" label="Blog ID" width="80" />
          <el-table-column prop="blog_title" label="Blog Title" width="120" />
          <el-table-column prop="content" label="Content" width="180" />
          <el-table-column prop="status" label="Status" width="80" />
          <el-table-column prop="add_time" label="Add time" width="180" />
          <el-table-column fixed="right" label="Operations" width="150">
            <template #default="scope">
                <el-button link type="danger" 
                @click="handleDelete(scope.$index, scope.row)">Delete
                </el-button>
                <div class="function">
                    <el-button link type="info"  
                    @click="handleBlock(scope.$index, scope.row)"
                    v-if="scope.row.status==0">
                    Block</el-button>
                    <el-button link type="info"  
                    @click="handleBlock(scope.$index, scope.row)"
                    v-else>
                    Unblock</el-button>
                </div>
            </template>
          </el-table-column>
        </el-table>
        
  </template>

<script>
import { ref, computed, reactive, toRefs, onMounted } from 'vue'
import { commentList, commentDelete, CommentStatus } from '@/api/comment'
import { ElNotification, ElMessageBox } from 'element-plus'
// import { useRouter } from 'vue-router'

export default {
    name: 'CommentListView',
    setup() {
        // const router = useRouter()
        const func = ref()
        const total = ref(50)
        const state = reactive({
            pageSize: 10,
            currentPage: 1,
            tableData: [],
        })

        const currentTotal = computed(()=>{
            return total.value
        })

        const loading = () => {
            commentList({
                page: state.currentPage,
                size: state.pageSize
            }).then( res => {
                if (res.status == 200) {
                    state.tableData = res.data.data
                    total.value = parseInt(res.data.count) 
                } else {
                    ElNotification({
                        title: 'Error',
                        type: 'error',
                        message: res.data.msg
                    })
                }
            }).catch( e => {
                console.log(e)
            })
        }

        const handleBlock = (index, row) => {
            let update = {
                id: row.id,
                status: 0
            }
            if (row.status == 0) {
                update.status = 1
            } else {
                update.status = 0
            }

            CommentStatus(update).then( res => {
                if (res.status == 200) {
                    let msg = update.status == 1 ? 'Block successfully!' : 'Unblock successfully!'
                    ElNotification({
                        title: 'Success',
                        type: 'success',
                        message: msg
                    })
                    row.status = update.status
                    // router.go()
                    return
                } else {
                    ElNotification({
                        title: 'Error',
                        type: 'error',
                        message: res.data.msg
                    })
                }
            })
        }

        const handleDelete = (index, row) => {
            ElMessageBox.confirm('Are you sure to delete it?', 'Warning', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'warning'
            }).then(() => {
                commentDelete({
                    id: row.id
                }).then( res => {
                    if (res.status == 200) {
                        ElNotification({
                            title: 'Success',
                            type: 'success',
                            message: 'Delete successfully'
                        })
                        loading()
                    } else {
                        ElNotification({
                            title: 'Error',
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            }).catch((e) => { 
                console.log(e)
            })
        }

        const handleCurrentChange = (newPage) => {
            state.currentPage = newPage
            loading()
        }

        // mounted
        onMounted(() => {
            loading()
        })

        return {
            func,
            currentTotal,
            ...toRefs(state),
            handleDelete,
            handleBlock,
            handleCurrentChange,
        }
    }
}

</script>

<style scoped>
div.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
  .el-table td, .el-table th{
    text-align: center!important;
  }
</style>