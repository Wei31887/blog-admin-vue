<template>
    <div class="blog-type-view">
        <div class="header">
            <h2>
                Blog Type
            </h2> 
        </div>
        <div class="blog-list-container">
                <el-button class="blog-button" type="primary" size="large" @click="handleAdd()">Write a blog</el-button>
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column fixed prop="id" label="ID" width="100" />
                  <el-table-column prop="name" label="Title" width="300" />
                  <el-table-column prop="sort" label="Level" width="150" />
                  <el-table-column fixed="right" label="Operations" width="300">
                    <template #default="scope">
                        <el-button link type="danger" 
                        @click="handleDelete(scope.$index, scope.row)">Delete
                        </el-button>
                        <el-button link type="primary" 
                        @click="handleEdit(scope.$index, scope.row)">Edit
                        </el-button>
                    </template>
                  </el-table-column>
                </el-table>
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
    </div>
  </template>

<script>
import { ref, computed, reactive, toRefs, onMounted } from 'vue'
import { typeDelete, typeList } from '@/api/blogType'
import { ElNotification, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

export default {
    name: 'BlogTypeView',
    setup() {
        const router = useRouter()
        const total = ref(50)
        const state = reactive({
            pageSize: 20,
            currentPage: 1,
            tableData: [],
        })

        const currentTotal = computed(()=>{
            return total.value
        })

        const loading = () => {
            typeList({
                page: state.currentPage,
                size: state.pageSize
            }).then( res => {
                console.log(res)
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

        const handleAdd = () => {
            router.push({name: 'Welcome'})
        }

        const handleEdit = (index, row) => {
            console.log(index, row)
        }
        const handleDelete = (index, row) => {
            ElMessageBox.confirm('Are you sure to delete it?', 'Warning', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'warning'
            }).then(() => {
                typeDelete({
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
            currentTotal,
            ...toRefs(state),
            handleAdd,
            handleDelete,
            handleEdit,
            handleCurrentChange,

        }
    }
}

</script>

<style scoped>

div.blog-type-view {
    width: 100%;
}
div.blog-list-container {
    display: flex;
    flex-direction: column;

}

div.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: relative;
    bottom: 0;
}
  .el-table td, .el-table th{
    text-align: center!important;
  }

.blog-button {
    margin: 1rem 0 1rem 0;
}
</style>