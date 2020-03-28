<template>
  <div>
    <div class="info-box">
      <div><span>昵称：</span><span>{{name}}</span></div>
      <div><span>园龄：</span><span>{{diff}}</span></div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        name: '',
        diff: ''
      }
    },
    methods: {
      UserInfo() {

        this.$axios.get('getUserInfo').then((result) => {
          const {
            data
          } = result
          const {
            name,
            create_time
          } = data
          this.name = name
          const time = new Date(create_time).getTime()
          const nowTime = new Date().getTime()
          var dateDiff = nowTime - time; //时间差的毫秒数
          var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
          var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
          var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
          //计算相差分钟数
          var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
          var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
          //计算相差秒数
          var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
          var seconds = Math.round(leave3 / 1000);
          this.diff = "" + "" + dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒" + "";


        }).catch((err) => {

        });


      },
      sendEmail() {

      }
    },
    mounted() {
      this.UserInfo();
    },
  }

</script>
<style lang="less" scoped>
  .info-box {
    margin: 10px 10px;

    span {
      display: inline-block;
      font-size: 14px;
      line-height: 24px;

    }

    span:nth-of-type(2) {
      width: 135px;
    }

  }

</style>
