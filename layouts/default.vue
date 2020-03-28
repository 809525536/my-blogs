<template>
  <div>
    <el-container class="home-container">
      <el-header class="header">
        <div class="header-container">
          <div class="left">
            <router-link class="home-name" :to="{path: '/home/list'}">My-Blogs</router-link>
          </div>
          <div class="right">
            <user-info></user-info>
          </div>
        </div>
      </el-header>
      <el-container class="main-container">
        <el-main class="main-box"><nuxt/></el-main>
        <el-aside class="nav" width="200px">
          <info></info>
        </el-aside>
      </el-container>
    </el-container>
    
  </div>
</template>

<style lang="less" scoped>
  html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.home-container {
  background: #f4f5f5;
}

.header {
  background: #fff;
  width: 100%;
  height: 60px;
  line-height: 60px;
}

.header-container {
  width: 70%;
  margin: 0 auto;
  height: 60px;
  line-height: 60px;
  .left {
    float: left;
  }
  .right {
    float: right;
  }
}
.main-container {
  width: 70%;
  margin: 0 auto;
  margin-top: 20px;
}
.main-box {
  background: #fff;
  padding: 0;
  height: 100%;
  overflow-y: auto;
}
.nav {
  background: #fff;
  width: 200px;
  margin-left: 20px;
}
.home-name {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
}
</style>

<style>
  * {
    margin: 0;
    padding: 0;
  }
</style>

