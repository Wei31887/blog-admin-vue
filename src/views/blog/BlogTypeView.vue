<template>
    <div class="page-blog-blogcategory">
        <div class="header">
            <h2>
                Blog Type
            </h2> 
        </div>
        <div class="add-type">
            <el-form
            ref="addTypeRef"
            :model="typeForm"
            :rules="rules"
            :inline="true">
                <el-form-item prop="type_name" label="分類">
                    <el-input type="text" v-model="typeForm.type_name"/>
                </el-form-item>
            
                <el-form-item prop="sort" label="排序">
                    <el-input type="number" v-model="typeForm.sort"/>
                </el-form-item>
                <el-form-item >
                    <el-button class="blog-button" type="primary" size="small" @click="handleAdd()">
                        新增分類
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="blog-list-container">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column fixed prop="id" label="ID" width="100" />
                  <el-table-column prop="name" label="文章分類" width="300" />
                  <el-table-column prop="sort" label="排序" width="150" />
                  <el-table-column fixed="right" label="操作" width="300">
                    <template #default="scope">
                        <el-button link type="danger" 
                        @click="handleDelete(scope.$index, scope.row)">Delete
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
import { typeDelete, typeList, saveType } from '@/api/blogType'
import { ElNotification, ElMessageBox } from 'element-plus'

export default {
    name: 'BlogTypeView',
    setup() {
        const total = ref(50)
        const listState = reactive({
            pageSize: 20,
            currentPage: 1,
            tableData: [],
        })
        const typeState = reactive({
            typeForm: {
                type_name: '',
                sort: 0,
            }
        })
        const addTypeRef = ref()
        const rules = {
            type_name: [ 
                {required: true, message: 'Can\'t be empty', trigger: 'blur'} 
            ],
            sort: [ 
                {required: true, message: 'Can\'t be empty', trigger: 'blur'} 
            ],
        }

        const currentTotal = computed(()=>{
            return total.value
        })

        function loading() {
            typeList({
                page: listState.currentPage,
                size: listState.pageSize
            }).then( res => {
                console.log(res.data.data)
                if (res.status == 200) {
                    listState.tableData = res.data.data
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
            addTypeRef.value.validate( valid => {
                if (!valid) {
                    return
                }
                console.log(typeState.typeForm)
                saveType({
                    name: typeState.typeForm.type_name,
                    sort: parseInt(typeState.typeForm.sort)
                }).then( res => {
                    if (res.status == 200) {
                        ElNotification({
                            title: 'Success',
                            type: 'success',
                            message: 'Successfully save!' 
                        })
                        loading()
                    }
                }).catch( err => {
                    console.log(err)
                })

            })
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
            listState.currentPage = newPage
            loading()
        }
        // mounted
        onMounted(() => {
            loading()
        })

        return {
            currentTotal,
            ...toRefs(listState),
            ...toRefs(typeState),
            addTypeRef,
            rules,
            handleAdd,
            handleDelete,
            handleCurrentChange,

        }
    }
}

</script>

<style scoped>

div.page-blog-blogcategory {
    padding: 1rem;
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