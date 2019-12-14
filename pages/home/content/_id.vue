<template>
  <div>
    <div v-html="essayRes"></div>
  </div>
</template>

<script>
  import marked from 'marked'
  export default {
    async asyncData(context) {
      try {
        const _this = context
        const { id } = _this.route.params
        const res = await _this.$axios.get('getaEssay',{
          params: {
            id: id
          }
        })
        const markedEssay = marked(res.data.res.content)
        return {
          essayRes: markedEssay
        }
      }catch(err) {
        console.log(err)
      }
  },
  data() {
    return {
      essayRes: {}
    }
  },
  async mounted() {
    
  },
  }
</script>

<style>

</style>