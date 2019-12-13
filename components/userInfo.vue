<template>
  <div>
    <span class="user-img" @click="showUpdate"><img :src="info.img"></span>
    <span class="user-name">{{info.name}}</span>
    <update-info
      :isShow="isShowUpdate"
      :userInfo="info"
      @close="closeUpdate"
    ></update-info>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowUpdate: false,
      info: {}
    }
  },
  async mounted() {
    try {
      const res = await this.$axios.get('getUserInfo')
      this.info = res.data
      console.log(res)
    } catch(err) {

    }
  },
  methods: {
    showUpdate() {
      this.isShowUpdate = true
    },
    closeUpdate() {
      this.isShowUpdate = false
    }
  }
}
</script>

<style lang="less" scoped>
  img {
    width: 100%;
  }
  .user-img {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    vertical-align: middle;
  }
  .user-name {
    display: inline-block;
    margin-left: 10px;
  }
</style>