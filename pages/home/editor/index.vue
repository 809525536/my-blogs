<template>
  <div class="editor-box">
    <div class="title">
      <el-input v-model="title" placeholder="请填写标题"></el-input>
    </div>
      <mavon-editor
        class="editor"
        v-model="value"
        ref=md @imgAdd="imgAdd"
      />
      <div>
        <el-button @click="submit">保存</el-button>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        title: ''
      }
    },
    methods: {
      async imgAdd(pos, file) {
        // let bob = new Blob([file,{name:123}],{name:file.name})
        let formData = new FormData()
        const processedFile = new File([file], file.name, {
          type: file.type
        })
        formData.append("file",processedFile)
        const res = await this.$axios.post('upload',formData)
        this.$refs.md.$img2Url(pos, res.data.url)
         console.log(res)
      },
      async submit() {
        try {
          const res = await this.$axios.post('createEssay',{
            content: this.value,
            title: this.title
          })
          console.log(res)
        } catch(err) {
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
</style>