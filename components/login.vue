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
        <el-form-item v-if="type !== 'login'">
          <el-input class="code-inp" v-model="form.email" placeholder="邮箱"></el-input>
          <el-button @click="getCode">获取验证码</el-button>
        </el-form-item>
        <el-form-item v-if="type !== 'login'">
          <el-input v-model="form.code" placeholder="验证码"></el-input>
        </el-form-item>
      </el-form>
      <el-button v-if="type == 'login'" class="sub-btn" type="primary" @click="login">登 陆</el-button>
      <el-button v-else class="sub-btn" type="primary" @click="submit">注 册</el-button>
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
          passwd: '',
          email: '',
          code: ''
        },
        rules: {
          name: [{
              required: true,
              message: '请输入昵称',
              trigger: 'blur'
            },
            {
              min: 3,
              message: '长度至少 3 个字符',
              trigger: 'blur'
            }
          ],
          account: [{
              required: true,
              message: '请输入账号',
              trigger: 'blur'
            },
            {
              min: 3,
              message: '长度至少 3  个字符',
              trigger: 'blur'
            }
          ],
          passwd: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
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
    methods: {
      async submit() {
        try {
          let isValid = false
          this.$refs['form'].validate((valid) => {
            isValid = valid
          })
          if (!isValid) return
          if (!this.form.code) {
            return this.$message.error('请输入验证码');
          }

          const res = await this.$axios.get('signin', {
            params: {
              ...this.form
            }
          })
          if (res.errCode == 2000) {
            location.reload()
          } else if (res.errCode == 4000) {
            this.$message.error('该账号已被注册');
          } else if (res.errCode == 4002) {
            this.$message.error('验证码错误');
          }
          console.log(res)
        } catch (err) {
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
          if (!isValid) return
          const res = await this.$axios.post('login', {
            ...this.form
          })
          console.log(res)
          if (res.errCode == 2000) {
            location.reload()
          } else if (res.errCode == 2300) {
            this.$message.error('账号错误');
          } else if (res.errCode == 2400) {
            this.$message.error('密码错误');
          } else {
            this.$message.error('登陆失败');
          }
        } catch (err) {
          console.log(err)
        }
      },
      getCode() {
        const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!reg.test(this.form.email)) {
          return this.$message.error('请输入正确的邮箱地址');
        }
        this.$axios.post('sendEmail', {
            email: this.form.email
          })
          .then(res => {
            console.log(res)
            if (res.errCode == 2101) {
              return this.$message.error('请输入正确的邮箱地址');
            }
            this.$message.success('验证码已发送至邮箱，请注意查收');
          })
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

  .code-inp {
    width: 140px;
  }

</style>
