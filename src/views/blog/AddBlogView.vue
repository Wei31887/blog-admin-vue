<template>
  <div class="page-blog-addblog">

    <div class="header">
      <h2>Blog 文章管理</h2>
    </div>
    <div class="add-blog-view">
      <div class="add-blog-form">
        <el-form ref="addBlogRef" :model="BlogForm" :rules="rules">
          <el-form-item prop="title" label="文章標題">
            <el-input type="text" v-model="BlogForm.title" />
          </el-form-item>
          <el-form-item prop="type_id" label="文章分類">
            <el-select
              v-model="BlogForm.type_id"
              clearable
              placeholder="Select"
              style="width: 240px"
            >
              <el-option
                v-for="item in typeList"
                :key="item.id.toString()"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
  
          <el-form-item prop="content" label="文章內容">
            <el-input
              v-model="BlogForm.content"
              :autosize="{ minRows: 4, maxRows: 4 }"
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
  
          <el-form-item prop="tag" label="文章標籤">
            <el-select
              v-model="tagSelect"
              multiple
              placeholder="Tags"
              style="width: 240px"
            >
              <el-option
                v-for="item in tagList"
                :key="item.id"
                :label="item.tag_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="操作">
            <el-button type="primary" @click="submit">{{ func }}</el-button>
            <el-button type="default" @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="display-blog" v-html="markHTML"></div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { saveBlog, blogOne } from "@/api/blog";
import { typeAll } from "@/api/blogType";
import { tagAll } from "@/api/blogTag";
import { marked } from "marked";

export default {
  name: "AddBlogView",
  components: {  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const addBlogRef = ref();
    const func = ref();
    const rules = {
      title: [{ required: true, message: "Can't be empty", trigger: "blur" }],
      type_id: [{ required: true, message: "Can't be empty", trigger: "blur" }],
      content: [{ required: true, message: "Can't be empty", trigger: "blur" }],
    };
    const state = reactive({
      BlogForm: {
        title: "Let's write a blog!",
        type_id: "",
        content: "",
        summary: "",
        id: 0,
        tags: [],
      },
      typeList: [],
      tagList: [],
      tagSelect: [],
      BlogTagId: 0,
    });

    const markHTML = computed(() => {
      return marked(state.BlogForm.content);
    });

    // methods
    function submit() {
      addBlogRef.value.validate((valid) => {
        if (!valid) {
          return;
        }
        state.tagSelect.forEach((item) => {
          state.BlogForm.tags.push({
            id: state.BlogTagId,
            blog_id: state.BlogForm.id,
            tag_id: item,
          });
        });
        saveBlog(state.BlogForm)
          .then((res) => {
            if (res.status == 200) {
              router.push({ name: "BlogList" });
              ElNotification({
                title: "Success",
                type: "success",
                message: "Successfully save!",
              });
            } else {
              ElNotification({
                title: "Error",
                type: "error",
                message: res.data.msg,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }

    function goBack() {
      router.push({ name: "BlogList" });
    }

    function loadBlogType() {
      typeAll().then((res) => {
        if (res.status == 200) {
          state.typeList = res.data.data;
        }
      });
    }

    function loadBlogTag() {
      tagAll().then((res) => {
        if (res.status == 200) {
          state.tagList = res.data.data;
        }
      });
    }

    function loadOneBlog() {
      blogOne({
        id: state.BlogForm.id,
      }).then((res) => {
        if (res.status == 200) {
          console.log(res.data.data);
          state.BlogForm.title = res.data.data.title;
          state.BlogForm.content = res.data.data.content;
          state.BlogForm.type_id = res.data.data.type_id;
          res.data.data.tags.forEach((item) => {
            state.tagSelect.push(item.tag_id);
          });
          state.BlogTagId = res.data.data.tags.id;
        } else {
          ElNotification({
            title: "Error",
            type: "error",
            message: res.data.msg,
          });
        }
      });
    }

    // mounted
    onMounted(() => {
      state.BlogForm.id =
        route.params.id == undefined ? 0 : parseInt(route.params.id);
      loadBlogType();
      loadBlogTag();
      if (state.BlogForm.id == 0) {
        func.value = "新增文章";
      } else if (state.BlogForm.id > 0) {
        func.value = "修改文章";
        loadOneBlog();
      }
    });

    return {
      addBlogRef,
      rules,
      func,
      ...toRefs(state),
      submit,
      goBack,
      markHTML,
    };
  },
};
</script>

<style>
.page-blog-addblog {
  padding: 1rem;
}

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
