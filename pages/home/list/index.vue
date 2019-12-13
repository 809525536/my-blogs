<template>
  <div>
    <ul class="essay-list">
      <li v-for="(item,index) in essayList" :key="index">
        
        <div class="title">
          {{item.title}}
        </div>
        <div class="info">
          <span class="read-num">阅读:{{item.readNum}}</span> ·
          <span class="time">时间:{{item.createTime}}</span>
        </div>
      </li>
    </ul>
    <!-- <login-dialog></login-dialog> -->
    
    <!-- <el-upload
      class="upload-demo"
      action="http://localhost/upload"
      :with-credentials= true
      multiple
      :limit="3">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> -->
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const _this = context
    let parms = {

    }
    const res = await _this.$axios.get('addEssay')
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
  methods:{
    async uploadSectionFile(params) {
       const file = params.file,
       form = new FormData();
        // 文件对象
        form.append("file", file);
        console.log(form)
        const res = await this.$axios.post('upload',form)
    }
  }
}
</script>

<style lang="less" scoped>
  .essay-list {
    li {
      border-bottom: 1px solid #ccc;
      padding: 10px;
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