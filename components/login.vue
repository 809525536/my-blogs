<template>
<div>
  <el-dialog title="登录/注册" :visible.sync="dialogFormVisible" width="300px" @close="close">
    <el-form ref="form" :model="form">
      <el-form-item v-if="type !== 'login'">
        <el-input v-model="form.name" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.account" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.passwd" placeholder="密码"></el-input>
      </el-form-item>
    </el-form>
    <el-button v-if="type == 'login'"  class="sub-btn" type="primary" @click="login">登 陆</el-button>
    <el-button v-else  class="sub-btn" type="primary" @click="submit">注 册</el-button>
</el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        account: '',
        passwd: ''
      }
    }
  },
  props: {
    isShow: false,
    type: ''
  },
  watch: {
    isShow(val) {
      this.dialogFormVisible = val
    }
  },
  async mounted() {
    // try {
    //     const res = await this.$axios.get('getName',{
    //       params: {
    //         name: 'gy123'
    //       }
    //     })
    //     console.log(res)
    //   }catch(err) {
    //     console.log(err)
    //   }
  },
  methods:{
    async submit() {
      try {
        const res = await this.$axios.get('signin',{
          params: {
            ...this.form
          }
        })
        console.log(res)
      }catch(err) {
        console.log(err)
      }
    },
    close() {
      this.$emit('close')
    },
    async login() {
      try {
        const res = await this.$axios.post('login',{
          ...this.form
        })
        console.log(res)
      }catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .sub-btn {
    width: 100%;
    color: #fff;
  }
</style>