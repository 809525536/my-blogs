<template>
  <div class="my-list">
      <el-container>
        <el-header class="header" style="height: 100px">
          <div class="user-img">
            <img :src="user.img">
          </div>
          <div class="user-name">
            {{user.name}}
          </div>
        </el-header>
        <el-main class="main">
          <div class="list-title">文章</div>
          <ul class="essay-list">
            <li v-for="(item,index) in essayList" :key="index" @click="goContent(item)">
              
              <div class="title">
                {{item.title}}
              </div>
              <div class="info">
                <span class="read-num">阅读:{{item.readNum}}</span> ·
                <span class="time">时间:{{item.createTime}}</span>
              </div>
            </li>
          </ul>
        </el-main>
      </el-container>
</div>
</template>

<script>
  export default {
    async asyncData(context) {
      const _this = context
      let parms = {

      }
      const res = await _this.$axios.get('getMyEssay')
      return {
        essayList: res.data.list
      }
      console.log(res)
    },
    data() {
      return {
        essayList: []
      }
    },
    computed: {
      user () { return this.$store.state.user.info }
    },
    methods: {
      goContent(val) {
        this.$router.push({
          path: `/home/content/${val.id}`
        })
      }
    },
  }
</script>

<style lang="less" scoped>
  
  .my-list,.my-list /deep/.el-container {
    height: 100%;
  }
  .my-list {
    background: #f4f5f5;
  }
  .header {
    margin-bottom: 20px;
    background: #fff;
    display: -webkit-box;
  }
  .main {
    background: #fff;
  }
  .user-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .user-name {
    line-height: 100px;
    padding-left: 20px;
  }
  
  .list-title{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid hsla(0,0%,59.2%,.1);
  }

  .essay-list {
    li {
      border-bottom: 1px solid #ccc;
      padding: 20px;
      cursor: pointer;
      &>div {
        margin-bottom: 8px;
      }
      &:hover {
        background: #fafcfc;
      }
    }
  }
  .info {
    font-size: 12px;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
  }
  .btns {
    font-size: 12px;
  }

</style>