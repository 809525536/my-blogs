<template>
  <div>
    <ul class="essay-list">
      <li v-for="(item,index) in essayList" :key="index" @click="goContent(item)">

        <div class="title">
          {{item.title}}
        </div>
        <div class="info">
          <span class="nuth-name">作者: {{item.authName}}</span>
          <span class="read-num">阅读量: {{item.readNum}}</span>
          <span class="time">发布于: {{formatDate(item.createTime)}}</span>
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
      console.log(res)
      return {
        essayList: res.data.list
      }

    },
    data() {
      return {
        essayList: []
      }
    },
    methods: {
      async uploadSectionFile(params) {
        const file = params.file,
          form = new FormData();
        // 文件对象
        form.append("file", file);
        console.log(form)
        const res = await this.$axios.post('upload', form)
      },
      goContent(val) {
        this.$router.push({
          path: `content/${val.id}`
        })
      },
      formatDate(now) {
        now = new Date(+now)
        const year = now.getFullYear(); //取得4位数的年份
        const month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
        const date = now.getDate(); //返回日期月份中的天数（1到31）
        const hour = now.getHours(); //返回日期中的小时数（0到23）
        const minute = now.getMinutes(); //返回日期中的分钟数（0到59）
        const second = now.getSeconds(); //返回日期中的秒数（0到59）
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
      }
    }
  }

</script>

<style lang="less" scoped>
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

  .time {
    margin-left: 20px;
  }

  .nuth-name {
    margin-right: 10px;
  }

</style>
