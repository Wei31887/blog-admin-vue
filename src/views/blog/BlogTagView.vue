<template>
    <div class="blog-type-view">
        <div class="header">
            <h2>
                標籤管理
            </h2> 
        </div>
        <div class="add-tag">
            <el-form
            ref="addTagRef"
            :model="tagForm"
            :rules="rules"
            :inline="true">
                <el-form-item prop="tag_name" label="標籤">
                    <el-input type="text" v-model="tagForm.tag_name"/>
                </el-form-item>
            
                <el-form-item prop="sort" label="排序">
                    <el-input type="number" v-model="tagForm.sort"/>
                </el-form-item>
                <el-form-item >
                    <el-button class="blog-button" type="primary" size="small" @click="handleAdd()">
                        新增標籤
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed prop="id" label="ID" width="100" />
                <el-table-column prop="tag_name" label="標籤" width="300" />
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
import { tagDelete, tagList, saveTag } from '@/api/blogTag'
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
        const tagState = reactive({
            tagForm:{
                tag_name: '',
                sort: 0,
            }
        })
        const addTagRef = ref()
        const rules = {
            tag_name: [ 
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
            tagList({
                page: listState.currentPage,
                size: listState.pageSize
            }).then( res => {
                if (res.status == 200) {
                    listState.tableData = res.data.data
                    total.value = parseInt(res.data.count) 
                }
            }).catch( e => {
                console.log(e)
            })
        }

        function handleAdd() {
            addTagRef.value.validate( valid => {
                if (!valid) {
                    return
                }
                saveTag({
                    tag_name: tagState.tagForm.tag_name,
                    sort: parseInt(tagState.tagForm.sort)
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

        function handleDelete(index, row) {
            ElMessageBox.confirm('Are you sure to delete it?', 'Warning', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'warning'
            }).then(() => {
                tagDelete({
                    id: row.id
                }).then( res => {
                    if (res.status == 200) {
                        ElNotification({
                            title: 'Success',
                            type: 'success',
                            message: 'Delete successfully'
                        })
                        loading()
                    } 
                })
            }).catch((e) => { 
                console.log(e)
            })
        }

        function handleCurrentChange(newPage) {
            listState.currentPage = newPage
            loading()
        }
        // mounted
        onMounted(() => {
            loading()
        })

        return {
            addTagRef,
            rules,
            currentTotal,
            ...toRefs(listState),
            ...toRefs(tagState),
            handleAdd,
            handleDelete,
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