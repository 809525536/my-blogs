<template>
  <div>
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible" width="300px" @close="close">
      <el-form ref="form" :model="form" label-width="40px">
        <el-form-item label="账号">
          <el-input v-model="form.account" placeholder="账号" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.name" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="头像">
           <el-upload
              class="upload-demo"
              action="http://47.105.139.85/upload"
              :with-credentials= true
              :on-success="upSuccess"
              
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            
            </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" type="primary" size="mini">保 存</el-button>
          <el-button size="mini" @click="close">取 消</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      imageUrl: '',
      form: {
        name: '',
        account: ''
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user.info 
    }
  },
  props: {
    userInfo: {},
    isShow: false
  },
  watch: {
    userInfo(val) {
      if(val) {
        this.form = val
        this.imageUrl = val.img
      }
    },
    isShow(val) {
      this.dialogFormVisible = val
    }
  },
  methods: {
    upSuccess(res) {
      if(res.code === 2000) {
        this.imageUrl = res.data.url
      }
      console.log(res)
    },
    close() {
      this.$emit('close')
    },
    async submit() {
      try {
        const res = await this.$axios.post('updateInfo',{
          ...this.form,
          img: this.imageUrl
        })
        console.log(res)
      }catch(err) {

      }
    }
  }
}
</script>

<style lang="less" scoped>
  .upload-demo /deep/.el-upload {
    border: 1px dashed #ccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .upload-demo .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
  /deep/.el-dialog__body {
    padding-top: 0;
  }
</style>