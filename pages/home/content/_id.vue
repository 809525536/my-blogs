<template>
  <div class="marked-box">
    <h1 class="title">{{title}}</h1>
    <div v-html="essayRes"></div>
  </div>
</template>

<script>
  import marked from 'marked'
  import hljs from "highlight.js";

  export default {
    async asyncData(context) {
      try {
        const _this = context
        const { id } = _this.route.params
        const result = await _this.$axios.get('getaEssay',{
          params: {
            id: id
          }
        })
        const { data } = result
        const { res = {}} = data
        const { content = '',title = '' } = res
        const rendererMD = new marked.Renderer();
            marked.setOptions({
              renderer: rendererMD,
              highlight: function(code) {
                console.log(code)
                return hljs.highlightAuto(code).value;
              },
              gfm: true,
              tables: true,
              breaks: true,
              pedantic: false,
              sanitize: false,
              smartLists: true,
              smartypants: false
            });//基本设置
        const markedEssay = marked(content)
        return {
          essayRes: markedEssay,
          title
        }
      }catch(err) {
        console.log(err)
      }
  },
  data() {
    return {
      essayRes: {},
      title: ''
    }
  },
  async mounted() {
    
  },
  }
</script>

<style lang="less">
  @import "../../../assets/style/makd.less";
  .marked-box {
    padding: 30px;
  }
  .marked-box .title {
    font-weight: bold;
    font-size: 30px;
  }
</style>