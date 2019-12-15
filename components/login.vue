<template>
<div>
  <el-dialog title="登录/注册" :visible.sync="dialogFormVisible" width="300px" @close="close">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item v-if="type !== 'login'" prop="name">
        <el-input v-model="form.name" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="account">
        <el-input v-model="form.account" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="passwd">
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
      },
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, message: '长度至少 3 个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, message: '长度至少 3  个字符', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
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
        let isValid = false
        this.$refs['form'].validate((valid) => {
          isValid = valid
        })
        if(!isValid) return

        const res = await this.$axios.get('signin',{
          params: {
            ...this.form
          }
        })
        if(res.errCode == 2000) {
          location.reload()
        } else if(res.errCode == 4000) {
          this.$message.error('该账号已被注册');
        }
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
        let isValid = false
        this.$refs['form'].validate((valid) => {
          isValid = valid
        })
        if(!isValid) return
        const res = await this.$axios.post('login',{
          ...this.form
        })
        console.log(res)
        if(res.errCode == 2000) {
          location.reload()
        }
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
  /deep/.el-dialog__body {
    padding-top: 0;
  }
</style>