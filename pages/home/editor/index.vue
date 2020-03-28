<template>
  <div class="editor-box">
    <div class="title">
      <el-input v-model="title" placeholder="请填写标题"></el-input>
    </div>
    <mavon-editor class="editor" v-model="value" ref=md @imgAdd="imgAdd" />
    <div class="switch-box">
      <el-switch v-model="isOpen" active-text="公开发布" inactive-text="仅自己可见">
      </el-switch>
    </div>
    <div class="submit">
      <el-button @click="submit" type="primary">发 布</el-button>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        title: '',
        isOpen: true
      }
    },
    methods: {
      async imgAdd(pos, file) {
        // let bob = new Blob([file,{name:123}],{name:file.name})
        let formData = new FormData()
        const processedFile = new File([file], file.name, {
          type: file.type
        })
        formData.append("file", processedFile)
        const res = await this.$axios.post('upload', formData)
        this.$refs.md.$img2Url(pos, res.data.url)
        console.log(res)
      },
      async submit() {
        try {
          if (this.title == '' || this.value == '') {
            this.$message.error('请填写标题及文章内容');
            return
          }
          const res = await this.$axios.post('createEssay', {
            content: this.value,
            title: this.title,
            isOpen: this.isOpen ? 1 : 0
          })
          if (res.errCode == 2000) {
            const {
              id
            } = res.data
            this.$router.push({
              path: `/home/content/${id}`
            })
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
  }

</script>

<style lang="less" scoped>
  .editor-box {
    height: 100%;
  }

  .editor {
    height: 80%;
  }

  .title {
    margin-bottom: 20px;
  }

  .switch-box {
    text-align: center;
    margin-top: 20px;
  }

  .submit {
    text-align: center;
    margin-top: 20px;
  }

</style>
