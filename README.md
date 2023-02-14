# blog-admin-vue
使用Gin + Vue3 + Element Plus 的前後端分離部落格 Blog 專案。
前端採用 Vue3 + Element Plus框架架設簡約風格部落格架構，支援Markdwon語法展示部落格文章內容，實現文章分類、文章標籤tags、文章目錄等功能。

- 目標：個人網站blog製作
- 功能：後台admin管理員功能

- **[Blog Server Project](https://github.com/Wei31887/blog-server-golang)**
- **[Blog Front-end Project](https://github.com/Wei31887/blog-front-vue)**

## Features

- RESTful API 特色
- 使用 Gin 框架，提供 middleware 功能，如 admin用戶認證、日誌、跨域等
- 基於 JWT 認證的 Admin 用戶登入功能
- 基於 GORM 存取資料庫
- TODO: Dockerfile
- TODO: API unit test
- TODO: 系統上線

## 技術

1. [Vue](https://github.com/vuejs/vue) 採用 vue3 框架實現
2. [vue-router](https://github.com/vuejs/vue-router)
3. [vuex](https://github.com/vuejs/vuex) 
4. [axios](https://github.com/axios/axios) 管理http requests
2. [element-plus](https://github.com/element-plus/element-plus) 

## 環境

需要在local 安装 [go] [gin] [node](http://nodejs.org/) 和 [git](https://git-scm.com/) 

## Local Development

### 目錄創建

```bash
# 新建目錄
mkdir blog_golang_vue
cd blog_golang_vue
```

### Git clone

```bash
# clone server 程式碼
git clone https://github.com/Wei31887/blog-server-golang.git

# clone blog front-end 程式碼
git clone https://github.com/Wei31887/blog-front-vue.git

# clone admin front-end 程式碼
git clone https://github.com/Wei31887/blog-admin-vue.git
```

### 開始運行

#### 初始化運行

```bash
# 進入 blog-server-glang 專案後端 front-end 部分
cd ./blog-admin-vue

```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
