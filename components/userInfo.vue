<template>
  <div>
      <div v-if="!isLogin" >
          <el-button type="text" @click="login">登陆</el-button>
          <el-button type="text" @click="signin">注册</el-button>
      </div>
    <div v-else>
      
      <el-dropdown @command="handleCommand">
        <span class="user-img"><img :src="info.img"></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="myHome"><i class="el-icon-tickets"></i>我的主页</el-dropdown-item>
          <el-dropdown-item command="setting"><i class="el-icon-setting"></i>设 置</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
      type: 'login',
      isLogin: false
    }
  },
  async mounted() {
    try {
      const res = await this.$axios.get('getUserInfo')
      if(res.errCode == 2000) {
        this.info = res.data
        this.$store.commit('user/userInfo', res.data)
        this.isLogin = true
      }else {
        this.isLogin = false
      }
      
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
        path: '/home/editor'
      })
    },
    handleCommand(command) {
      console.log(command)
      if(command == 'setting') {
        this.showUpdate()
      } else if(command == 'myHome') {
        this.$router.push({
          path: `/home/my-list`
        })
      }
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
    margin-right: 20px;
  }
  .user-name {
    display: inline-block;
    margin-left: 10px;
  }
</style>