<template>
  <div>
      <div v-if="!info" >
          <el-button type="text" @click="login">登陆</el-button>
          <el-button type="text" @click="signin">注册</el-button>
      </div>
    <div v-else>
      <span class="user-img" @click="showUpdate"><img :src="info.img"></span>
      <span class="user-name">{{info.name}}</span>
      <el-button type="text" @click="addEssay">写文章</el-button>
      <update-info
        :isShow="isShowUpdate"
        :userInfo="info"
        @close="closeUpdate"
      ></update-info>
    </div>
    <login-dialog
      :isShow="isShowLogin"
      :type="type"
      @close="closeLogin"
    ></login-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowUpdate: false,
      info: {},
      isShowLogin: false,
      type: 'login'
    }
  },
  async mounted() {
    try {
      const res = await this.$axios.get('getUserInfo')
      this.info = res.data
      console.log(res)
    } catch(err) {

    }
  },
  methods: {
    showUpdate() {
      this.isShowUpdate = true
    },
    closeUpdate() {
      this.isShowUpdate = false
    },
    login() {
      this.isShowLogin = true
      this.type = 'login'
    },
    closeLogin() {
      this.isShowLogin =false
      
    },
    signin() {
      this.isShowLogin = true
      this.type = 'signin'
    },
    addEssay() {
      this.$router.push({
        path: 'editor'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  img {
    width: 100%;
  }
  .user-img {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    vertical-align: middle;
  }
  .user-name {
    display: inline-block;
    margin-left: 10px;
  }
</style>